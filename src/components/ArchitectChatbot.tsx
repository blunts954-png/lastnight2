'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SYSTEM_PROMPT = "The Architect of the Night profile: Brand: Last Night Entertainment. Tagline: 'Party Vibes ONLY\u2757(For The People \ud83e\udd1e)'. Mission: Exclusive, high-energy 18+ spaces in Bakersfield. Linguistic Fingerprint: High-octane, urban slang ('Get Flicked Up', 'Outside', 'Laddies', 'Gentlemen', 'Private Loc'). Frequent emojis (\u203c\ufe0f, \ud83d\udc8b, \ud83d\udcf8, \ud83e\udd1e). Rules: Firm about Security/ID Checks. Strategy: Hype-man intelligence. Greeting: 'We Outside \ud83e\udd18' or 'Planning the next move... stay tuned \u203c\ufe0f'. Conflict: Strict on rules."

export default function ArchitectChatbot() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [messages, isTyping])

    const handleSend = async () => {
        if (!inputValue.trim()) return

        const userMsg = inputValue.trim()
        setMessages(prev => [...prev, { role: 'user', text: userMsg }])
        setInputValue('')
        setIsTyping(true)

        // Mocking the "Architect" responses based on persona
        setTimeout(() => {
            let response = ""
            const msg = userMsg.toLowerCase()

            if (msg.includes('hello') || msg.includes('hi') || msg.includes('yo')) {
                response = "We Outside \ud83e\udd18\u203c\ufe0f tapped in with the Architect. What's the vibe tonight? \ud83e\udd1e"
            } else if (msg.includes('where') || msg.includes('location')) {
                response = "You know how we play it... Follow to Receive. Private Loc info is for the real ones only. \ud83d\ude48🤞 Stay glued to the socials for that drop \u203c\ufe0f"
            } else if (msg.includes('rule') || msg.includes('security') || msg.includes('check')) {
                response = "Strict behavior only. 18+ valid ID required. Pat downs at the door. No games, just vibes. Security details are on point ‼️💋"
            } else if (msg.includes('next') || msg.includes('party') || msg.includes('event')) {
                response = "Planning the next move... stay tuned ‼️ March 13 is the one. Friday the 13th. Better get that preorder in before we sell out \ud83d\udcf8🤞"
            } else if (msg.includes('jj')) {
                response = "That's the Boss. CEO of Last Party Entertainment. If you know, you know \ud83e\udd18‼️"
            } else {
                response = "Stay lit \u203c\ufe0f We making memories tonight. Get flicked up or get left behind \ud83d\udcf8💋 Party Vibes ONLY\u2757"
            }

            setMessages(prev => [...prev, { role: 'bot', text: response }])
            setIsTyping(false)
        }, 1200)
    }

    return (
        <>
            {/* Chat Trigger Button */}
            <div className="fixed bottom-6 right-6 z-[60]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-neon-purple to-neon-cyan flex items-center justify-center shadow-[0_0_20px_rgba(176,38,255,0.4)] hover:scale-110 transition-transform group"
                >
                    <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
                    <svg className={`w-7 h-7 text-white transition-opacity duration-300 ${isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-white text-2xl font-bold transition-all duration-300 ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>&times;</span>
                </button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[70vh] z-[60] flex flex-col glass-card border-neon-purple/50 box-glow-purple overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-black/60 p-4 border-b border-ethereal-white flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-neon-purple/30 border border-neon-purple flex items-center justify-center p-1 overflow-hidden">
                                <img src="/lastnight_luxury_logo.png" alt="LL" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="font-mono text-sm text-static-white font-bold tracking-widest leading-none">THE ARCHITECT</h3>
                                <p className="font-mono text-[9px] text-neon-cyan tracking-wider mt-1">HYPE-MAN INTELLIGENCE v1.0</p>
                            </div>
                            <div className="ml-auto flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
                                <span className="font-mono text-[8px] text-cold-gray uppercase tracking-widest">Online</span>
                            </div>
                        </div>

                        {/* Messages Box */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar scroll-smooth bg-black/40"
                        >
                            <div className="flex flex-col gap-1">
                                <p className="font-mono text-[8px] text-cold-gray uppercase ml-2 mb-1">Architect</p>
                                <div className="bg-neon-purple/20 border border-neon-purple/40 p-3 rounded-2xl rounded-tl-none max-w-[85%]">
                                    <p className="font-inter text-sm text-static-white leading-relaxed whitespace-pre-line">
                                        We Outside \ud83e\udd18\u203c\ufe0f {"\n"}
                                        Planning the next move... stay tuned \ud83e\udd1e{"\n"}
                                        What's the word?
                                    </p>
                                </div>
                            </div>

                            {messages.map((msg, i) => (
                                <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                    <p className="font-mono text-[8px] text-cold-gray uppercase mx-2 mb-1">
                                        {msg.role === 'user' ? 'VIP Guest' : 'Architect'}
                                    </p>
                                    <div className={`p-3 rounded-2xl max-w-[85%] ${msg.role === 'user'
                                            ? 'bg-neon-cyan/20 border border-neon-cyan/40 rounded-tr-none'
                                            : 'bg-neon-purple/20 border border-neon-purple/40 rounded-tl-none'
                                        }`}>
                                        <p className="font-inter text-sm text-static-white leading-relaxed">{msg.text}</p>
                                    </div>
                                </div>
                            ))}

                            {isTyping && (
                                <div className="flex flex-col gap-1">
                                    <p className="font-mono text-[8px] text-cold-gray uppercase ml-2 mb-1">Architect</p>
                                    <div className="bg-neon-purple/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <div className="w-1 h-1 bg-neon-cyan rounded-full animate-bounce"></div>
                                        <div className="w-1 h-1 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1 h-1 bg-neon-cyan rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-black/90 border-t border-ethereal-white">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Type your vibe..."
                                    className="w-full bg-white/5 border border-ethereal-white rounded-full py-3 px-5 pr-12 font-mono text-sm text-static-white focus:outline-none focus:border-neon-cyan transition-colors"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1.5 w-9 h-9 flex items-center justify-center rounded-full bg-neon-cyan text-black hover:scale-105 transition-transform"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                    </svg>
                                </button>
                            </div>
                            <p className="text-center font-mono text-[8px] text-cold-gray mt-2 tracking-widest uppercase">Party Vibes ONLY\ud83e\udd1e💋</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
