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
import dynamic from 'next/dynamic'

const MemberPortal = dynamic(() => import('@/components/MemberPortal'), {
    ssr: false,
})
import ArchitectChatbot from '@/components/ArchitectChatbot'
import SplashPage from '@/components/SplashPage'
import SiteOverlay from '@/components/SiteOverlay'
import CustomCursor from '@/components/CustomCursor'

export default function Home() {
    const [showPortal, setShowPortal] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [showSplash, setShowSplash] = useState(true)

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
                    onBlacklistClick={() => setShowPortal(true)}
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
                        onLoginClick={() => setShowPortal(true)}
                    />
                    <BlacklistSection onJoinClick={() => setShowPortal(true)} />
                    <Footer />
                </div>

                {/* Chatbot Interface */}
                <ArchitectChatbot />

                {/* Member Portal Modal */}
                {showPortal && (
                    <MemberPortal
                        onClose={() => setShowPortal(false)}
                        onLogin={() => setIsAuthenticated(true)}
                    />
                )}
            </main>
        </>
    )
}
