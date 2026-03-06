'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function SiteOverlay() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <>
            {/* Real-time Scroll Progress */}
            <motion.div
                className="scroll-progress"
                style={{ scaleX, originX: 0 }}
            />

            {/* Cinematic Scanlines */}
            <div className="scanline-overlay" />

            {/* Grain/Noise for Texture */}
            <div className="noise-overlay" />

            {/* Corner Status Indicators (Fixed Aesthetics) */}
            <div className="fixed top-24 left-6 z-[60] hidden lg:flex flex-col gap-1 pointer-events-none">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse"></div>
                    <span className="font-mono text-[8px] text-neon-cyan tracking-[0.2em] uppercase">Server: v2.0_Active</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span className="font-mono text-[8px] text-neon-purple tracking-[0.2em] uppercase">Encryption: Enabled</span>
                </div>
            </div>

            <div className="fixed bottom-6 left-6 z-[60] hidden lg:block pointer-events-none">
                <span className="font-mono text-[8px] text-white/20 tracking-[0.5em] uppercase">
                    Unauthorized access will be logged // {new Date().getFullYear()}
                </span>
            </div>
        </>
    )
}
