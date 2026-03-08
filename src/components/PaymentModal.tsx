'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk'

interface PaymentModalProps {
    onClose: () => void
    amount: number
    ticketName: string
    onSuccess: (details: any) => void
}

export default function PaymentModal({ onClose, amount, ticketName, onSuccess }: PaymentModalProps) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // REPLACE THESE WITH YOUR SQUARE IDs in .env.local
    const applicationId = process.env.NEXT_PUBLIC_SQUARE_APPLICATION_ID || 'sandbox-sq0idb-YOUR_ID'
    const locationId = process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID || 'main'

    const handlePayment = async (token: any) => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('/api/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sourceId: token.token,
                    amount: amount * 100, // Square takes cents
                    idempotencyKey: window.crypto.randomUUID()
                })
            })

            const result = await response.json()

            if (response.ok) {
                onSuccess(result)
            } else {
                setError(result.error || 'Payment failed')
            }
        } catch (err) {
            setError('System link failed. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-pitch-black/95 backdrop-blur-2xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="glass-card border-neon-cyan/50 box-glow-cyan p-8 w-full max-w-md relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-cold-gray hover:text-neon-cyan transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h2 className="font-mono text-xl text-center mb-2 font-bold tracking-widest text-static-white">
                        SECURE CHECKOUT
                    </h2>
                    <p className="font-mono text-cold-gray text-center text-[10px] tracking-widest mb-8 uppercase">
                        {ticketName} - <span className="text-neon-cyan text-lg">${amount}</span>
                    </p>

                    <div className="square-payment-container min-h-[120px]">
                        <PaymentForm
                            applicationId={applicationId}
                            locationId={locationId}
                            cardTokenizeResponseReceived={handlePayment}
                        >
                            <div className="mb-4">
                                <CreditCard
                                    buttonProps={{
                                        className: "w-full btn-primary mt-6 py-4 font-mono text-sm tracking-[0.2em] font-bold uppercase disabled:opacity-50",
                                        children: loading ? 'PROCESSING...' : `PAY $${amount}`
                                    }}
                                />
                            </div>
                        </PaymentForm>
                    </div>

                    {error && (
                        <div className="mt-4 p-3 bg-alert-red/10 border border-alert-red text-alert-red font-mono text-[10px] text-center tracking-widest uppercase animate-shake">
                            {error}
                        </div>
                    )}

                    <p className="mt-8 font-mono text-[8px] text-cold-gray text-center tracking-widest leading-relaxed uppercase">
                        All transactions are encrypted. Tickets are non-refundable.
                        Digital delivery via email and portal.
                    </p>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
