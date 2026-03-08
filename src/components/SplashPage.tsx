'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

export default function SplashPage({ onFinish }: { onFinish: () => void }) {
    const { t } = useLanguage()
    const [status, setStatus] = useState(t.splash.statuses[0])
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            onFinish()
        }, 10000)

        const statusInterval = setInterval(() => {
            const statuses = t.splash.statuses
            const index = Math.floor((Date.now() / 2000) % statuses.length)
            setStatus(statuses[index])
            setProgress(prev => Math.min(prev + 1, 100))
        }, 100)

        return () => {
            clearTimeout(timer)
            clearInterval(statusInterval)
        }
    }, [onFinish, t.splash.statuses])

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[100] bg-pitch-black flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    <source src="/IMG_7024.MOV" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-pitch-black via-transparent to-pitch-black"></div>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col items-center max-w-xl w-full px-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-12 w-32 h-32"
                >
                    <img src="/logo.png" alt="LL" className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(176,38,255,0.5)]" />
                </motion.div>

                <motion.h1
                    className="font-monument text-3xl md:text-5xl text-static-white text-center tracking-widest mb-12 uppercase"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    {status}
                </motion.h1>

                {/* Loading Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-4 border border-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-neon-purple via-neon-cyan to-neon-purple shadow-[0_0_15px_rgba(0,240,255,0.8)]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 10, ease: "linear" }}
                    />
                </div>

                <div className="flex justify-between w-full font-mono text-[10px] text-cold-gray tracking-[0.3em] uppercase">
                    <span>{t.splash.systemReload}</span>
                    <span className="text-neon-cyan font-bold">{t.splash.secure}</span>
                </div>
            </div>

            {/* Scanning Effect */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-neon-cyan/30 shadow-[0_0_20px_rgba(0,240,255,1)]"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    )
}
