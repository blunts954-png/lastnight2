'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 150 }
    const springX = useSpring(cursorX, springConfig)
    const springY = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        window.addEventListener('mousemove', moveCursor)
        document.body.addEventListener('mouseenter', handleMouseEnter)
        document.body.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            document.body.removeEventListener('mouseenter', handleMouseEnter)
            document.body.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [cursorX, cursorY])

    return (
        <div className="fixed inset-0 z-[10001] pointer-events-none hidden lg:block">
            {/* Main Crosshair dot */}
            <motion.div
                className="w-2 h-2 bg-neon-cyan/80 rounded-full fixed top-0 left-0"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0
                }}
            />

            {/* Expanding Circle Glow */}
            <motion.div
                className="w-10 h-10 border border-neon-purple/40 rounded-full fixed top-0 left-0"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Tactical Crosshair Lines (Subtle) */}
            <motion.div
                className="w-[1px] h-3 bg-neon-cyan/20 fixed top-0 left-0"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-200%',
                    opacity: isVisible ? 0.3 : 0
                }}
            />
            <motion.div
                className="w-[1px] h-3 bg-neon-cyan/20 fixed top-0 left-0"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '100%',
                    opacity: isVisible ? 0.3 : 0
                }}
            />
            <motion.div
                className="w-3 h-[1px] bg-neon-cyan/20 fixed top-0 left-0"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-200%',
                    translateY: '-50%',
                    opacity: isVisible ? 0.3 : 0
                }}
            />
            <motion.div
                className="w-3 h-[1px] bg-neon-cyan/20 fixed top-0 left-0"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '100%',
                    translateY: '-50%',
                    opacity: isVisible ? 0.3 : 0
                }}
            />
        </div>
    )
}
