'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TicketTiersProps {
    isAuthenticated: boolean
    onLoginClick: () => void
}

const ticketOptions = [
    {
        id: 'preorder',
        name: 'Friday the 13th Preorder',
        price: 10,
        badge: 'Best Value',
        highlight: true,
        features: [
            'Guaranteed entry',
            'Limited online preorder allocation',
            '$15 at the door if not preordered'
        ]
    },
    {
        id: 'black-card',
        name: 'Black Card Reward Program',
        price: 5,
        badge: '50% Off',
        highlight: false,
        features: [
            'Only $5 ticket after Black Card signup',
            '50% off preorder pricing locked in',
            'Member-only offers and updates'
        ]
    }
]

export default function TicketTiers({ isAuthenticated, onLoginClick }: TicketTiersProps) {
    const [ticketsLeft, setTicketsLeft] = useState(14)
    const [cardsIssued, setCardsIssued] = useState(3)

    // Simulate real-time scarcity
    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7 && ticketsLeft > 3) {
                setTicketsLeft(prev => prev - 1)
            }
            if (Math.random() > 0.6) {
                setCardsIssued(prev => prev + 1)
            }
        }, 12000)
        return () => clearInterval(interval)
    }, [ticketsLeft])

    return (
        <section id="tickets" className="section-padding relative">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-14 flex flex-col items-center"
                >
                    <div className="border border-neon-cyan px-4 py-1 mb-8">
                        <span className="font-mono text-neon-cyan text-xs md:text-sm tracking-[0.2em] font-bold">
                            TICKETS
                        </span>
                    </div>
                    <h2 className="font-serif font-normal text-4xl md:text-5xl lg:text-6xl text-static-white tracking-widest">
                        PICK YOUR ACCESS
                    </h2>
                    <p className="font-inter text-cold-gray mt-5 max-w-2xl text-sm md:text-base">
                        Two ways in for Friday the 13th. Preorder at $10, or unlock the $5 Black Card member ticket.
                    </p>

                    {/* SCARCITY ENGINE */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center w-full max-w-lg"
                    >
                        <div className="bg-alert-red/10 border border-alert-red px-4 py-2 rounded-sm shadow-[0_0_15px_rgba(255,51,51,0.15)] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-alert-red/5 mix-blend-overlay animate-pulse"></div>
                            <span className="w-2 h-2 rounded-full bg-alert-red animate-pulse mr-2 shadow-[0_0_8px_rgba(255,51,51,1)]"></span>
                            <span className="font-mono text-alert-red text-xs tracking-widest uppercase font-bold relative z-10 transition-all">
                                ONLY {ticketsLeft} PREORDERS REMAINING
                            </span>
                        </div>
                        <div className="bg-neon-purple/10 border border-neon-purple px-4 py-2 rounded-sm shadow-[0_0_15px_rgba(176,38,255,0.15)] flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse mr-2 shadow-[0_0_8px_rgba(176,38,255,1)]"></span>
                            <span className="font-mono text-neon-purple text-xs tracking-widest uppercase font-bold transition-all">
                                {cardsIssued} CARDS ISSUED LAST HOUR
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-7 max-w-4xl mx-auto">
                    {ticketOptions.map((ticket, index) => {
                        const isBlackCard = ticket.id === 'black-card'
                        const buttonLabel = isBlackCard
                            ? (isAuthenticated ? 'Claim $5 Ticket' : 'Sign Up for Black Card')
                            : 'Preorder for $10'

                        return (
                            <motion.div
                                key={ticket.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                viewport={{ once: true }}
                            >
                                <div className={`glass-card p-7 md:p-8 h-full flex flex-col border ${ticket.highlight ? 'border-neon-cyan shadow-[0_0_30px_rgba(0,240,255,0.18)]' : 'border-neon-purple/50 shadow-[0_0_30px_rgba(176,38,255,0.18)]'}`}>
                                    <div className={`inline-flex self-start mb-5 px-3 py-1 rounded-sm text-[10px] font-mono uppercase tracking-[0.2em] font-bold ${ticket.highlight ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/70' : 'bg-neon-purple/20 text-neon-purple border border-neon-purple/70'}`}>
                                        {ticket.badge}
                                    </div>

                                    <h3 className="font-mono font-bold tracking-wider text-base md:text-lg text-static-white uppercase mb-4">
                                        {ticket.name}
                                    </h3>

                                    <div className="mb-6 border-b border-ethereal-white pb-6">
                                        <span className={`font-serif text-5xl ${ticket.highlight ? 'text-neon-cyan text-glow-cyan' : 'text-neon-purple text-glow-purple'}`}>
                                            ${ticket.price}
                                        </span>
                                        <span className="font-mono text-cold-gray text-xs ml-2 tracking-widest uppercase">
                                            / Ticket
                                        </span>
                                    </div>

                                    <ul className="flex-grow space-y-4 mb-8">
                                        {ticket.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="font-mono text-cold-gray text-xs tracking-wider flex items-start uppercase leading-relaxed"
                                            >
                                                <svg
                                                    className={`w-4 h-4 mr-3 mt-0.5 flex-shrink-0 ${ticket.highlight ? 'text-neon-cyan' : 'text-neon-purple'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={isBlackCard && !isAuthenticated ? onLoginClick : undefined}
                                        className={`w-full py-4 font-mono text-sm font-bold tracking-[0.2em] uppercase transition-all duration-300 border rounded-sm ${ticket.highlight
                                            ? 'bg-neon-cyan/20 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black'
                                            : 'bg-neon-purple/20 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white'
                                            }`}
                                    >
                                        {buttonLabel}
                                    </button>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.35 }}
                    viewport={{ once: true }}
                    className="text-center font-mono text-cold-gray text-[11px] tracking-[0.15em] mt-10 uppercase leading-relaxed"
                >
                    Black Card pricing requires registration and digital card activation.
                </motion.p>
            </div>
        </section>
    )
}
