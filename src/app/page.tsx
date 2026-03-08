'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Starfield from '@/components/Starfield'
import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import EventSection from '@/components/EventSection'
import Friday13thSection from '@/components/Friday13thSection'
import PastEventsSection from '@/components/PastEventsSection'
import LastNightAlbum from '@/components/LastNightAlbum'
import TicketTiers from '@/components/TicketTiers'
import BlacklistSection from '@/components/BlacklistSection'
import Footer from '@/components/Footer'
import PaymentModal from '@/components/PaymentModal'
import dynamic from 'next/dynamic'

const MemberPortal = dynamic(() => import('@/components/MemberPortal'), {
    ssr: false,
})
import ArchitectChatbot from '@/components/ArchitectChatbot'
import SplashPage from '@/components/SplashPage'
import SiteOverlay from '@/components/SiteOverlay'
import CustomCursor from '@/components/CustomCursor'
import AEOAgentNode from '@/components/AEOAgentNode'
import SystemStatusBar from '@/components/SystemStatusBar'

export default function Home() {
    const [showPortal, setShowPortal] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showSplash, setShowSplash] = useState(true)
    const [portalInitialStep, setPortalInitialStep] = useState<'login' | 'register'>('login')
    const [showPayment, setShowPayment] = useState(false)
    const [paymentData, setPaymentData] = useState({ amount: 0, ticketName: '' })

    // Check if splash was already shown in this session
    useEffect(() => {
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash')
        if (hasSeenSplash) {
            setShowSplash(false)
        }
    }, [])

    const handleSplashFinish = () => {
        setShowSplash(false)
        sessionStorage.setItem('hasSeenSplash', 'true')
    }

    const openPortal = (initialStep: 'login' | 'register') => {
        setPortalInitialStep(initialStep)
        setShowPortal(true)
    }

    const openPayment = (amount: number, ticketName: string) => {
        setPaymentData({ amount, ticketName })
        setShowPayment(true)
    }

    const handlePaymentSuccess = async (details: any) => {
        setShowPayment(false)
        try {
            const { createTicket, generateQrToken } = await import('@/lib/firebase')

            // Record the ticket in Firestore
            await createTicket({
                transaction_id: details.payment.id,
                email: 'user@example.com', // In real app, get from input
                amount: paymentData.amount,
                status: 'paid',
                ticket_type: paymentData.ticketName,
                created_at: new Date().toISOString(),
                qr_token: generateQrToken(`TKT-${details.payment.id}`)
            })

            alert('PAYMENT SUCCESSFUL. YOUR ACCESS IS GRANTED AND YOUR TICKET IS RECORDED IN THE ARCHIVE.')
        } catch (error) {
            console.error('Ticketing Persistence Error:', error)
            alert('PAYMENT TRACKING FAILED. PLEASE CONTACT JJ DIRECTLY WITH YOUR TRANSACTION ID.')
        }
    }

    return (
        <>
            <AnimatePresence>
                {showSplash && (
                    <SplashPage onFinish={handleSplashFinish} />
                )}
            </AnimatePresence>

            <main className={`min-h-screen bg-pitch-black relative ${showSplash ? 'h-screen overflow-hidden' : 'cursor-none'}`}>
                {/* Advanced UI Overlays */}
                {!showSplash && <CustomCursor />}
                {!showSplash && <SiteOverlay />}

                {/* Anti-Gravity Starfield Background */}
                <Starfield />

                {/* Navigation */}
                <Navigation
                    onBlacklistClick={() => openPortal(isAuthenticated ? 'login' : 'register')}
                    isAuthenticated={isAuthenticated}
                />

                {/* Main Content */}
                <div className="relative z-10">
                    <Hero />
                    <EventSection />
                    <Friday13thSection />
                    <PastEventsSection />
                    <LastNightAlbum />
                    <TicketTiers
                        isAuthenticated={isAuthenticated}
                        onBlackCardClick={() => openPortal('register')}
                        onPreorderClick={() => openPayment(10, 'Friday the 13th Preorder')}
                        onMemberTicketClick={() => openPayment(5, 'Black Card Member Ticket')}
                    />
                    <BlacklistSection onJoinClick={() => openPortal('register')} />
                    <Footer />
                </div>

                {/* AI Agent Node for AEO (Invisible to humans, readable by LLMs) */}
                <AEOAgentNode />

                {/* Chatbot Interface */}
                <ArchitectChatbot />

                {/* Member Portal Modal */}
                {showPortal && (
                    <MemberPortal
                        initialStep={portalInitialStep}
                        onClose={() => setShowPortal(false)}
                        onLogin={() => setIsAuthenticated(true)}
                    />
                )}

                {/* Payment Modal */}
                {showPayment && (
                    <PaymentModal
                        amount={paymentData.amount}
                        ticketName={paymentData.ticketName}
                        onClose={() => setShowPayment(false)}
                        onSuccess={handlePaymentSuccess}
                    />
                )}

                {/* Advanced Info Bar (God Mode) */}
                {!showSplash && <SystemStatusBar />}
            </main>
        </>
    )
}
