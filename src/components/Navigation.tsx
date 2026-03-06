'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavigationProps {
    onBlacklistClick: () => void
    isAuthenticated: boolean
}

export default function Navigation({ onBlacklistClick, isAuthenticated }: NavigationProps) {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-pitch-black/95 backdrop-blur-xl border-neon-purple/20' : 'bg-transparent border-transparent'
                }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="/" className="flex items-center group">
                        <div className="relative w-12 h-12 md:w-14 md:h-14 mr-3">
                            <motion.div
                                className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            />
                            <img
                                src="/lastnight_luxury_logo.png"
                                alt="LAST NIGHT ENTERTAINMENT"
                                className="w-full h-full object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                        <span className="font-serif italic text-lg md:text-xl tracking-[0.3em] text-static-white hidden sm:block">
                            LAST NIGHT <span className="text-neon-cyan">ENTERTAINMENT</span>
                        </span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-12">
                        <a
                            href="#friday-13th"
                            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-cold-gray hover:text-neon-cyan transition-colors font-bold"
                        >
                            FRIDAY 13TH
                        </a>
                        <a
                            href="#tickets"
                            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-cold-gray hover:text-neon-cyan transition-colors font-bold"
                        >
                            TICKETS
                        </a>
                        <button
                            onClick={onBlacklistClick}
                            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-neon-purple hover:text-neon-cyan transition-colors font-bold flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple box-glow-purple"></span>
                            {isAuthenticated ? 'MY CARD' : 'BLACK CARD'}
                        </button>
                        <a
                            href="#past-events"
                            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-cold-gray hover:text-neon-cyan transition-colors font-bold"
                        >
                            PAST EVENTS
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 text-static-white hover:text-neon-cyan transition-colors"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {mobileMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-pitch-black/95 backdrop-blur-xl border-t border-neon-purple/20"
                    >
                        <div className="py-6 px-4 flex flex-col items-center space-y-8">
                            <a
                                href="#friday-13th"
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-mono text-sm uppercase tracking-[0.3em] text-cold-gray hover:text-neon-cyan transition-colors"
                            >
                                FRIDAY 13TH
                            </a>
                            <a
                                href="#tickets"
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-mono text-sm uppercase tracking-[0.3em] text-cold-gray hover:text-neon-cyan transition-colors"
                            >
                                TICKETS
                            </a>
                            <button
                                onClick={() => {
                                    onBlacklistClick()
                                    setMobileMenuOpen(false)
                                }}
                                className="font-mono text-sm uppercase tracking-[0.3em] text-neon-purple hover:text-neon-cyan transition-colors flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-purple box-glow-purple"></span>
                                {isAuthenticated ? 'MY CARD' : 'BLACK CARD'}
                            </button>
                            <a
                                href="#past-events"
                                onClick={() => setMobileMenuOpen(false)}
                                className="font-mono text-sm uppercase tracking-[0.3em] text-cold-gray hover:text-neon-cyan transition-colors"
                            >
                                PAST EVENTS
                            </a>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}
