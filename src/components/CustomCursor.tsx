'use client'

import React, { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
    const [isPressed, setIsPressed] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 30, stiffness: 450, mass: 0.5 }
    const springX = useSpring(cursorX, springConfig)
    const springY = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseDown = () => setIsPressed(true)
        const handleMouseUp = () => setIsPressed(false)
        const handleMouseEnter = () => setIsVisible(true)
        const handleMouseLeave = () => setIsVisible(false)

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('mouseenter', handleMouseEnter)
        document.addEventListener('mouseleave', handleMouseLeave)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mouseup', handleMouseUp)
            document.removeEventListener('mouseenter', handleMouseEnter)
            document.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [cursorX, cursorY])

    return (
        <div className="fixed inset-0 z-[10001] pointer-events-none hidden lg:block">
            {/* Center Dot - Zero Latency */}
            <motion.div
                className="w-1.5 h-1.5 bg-neon-cyan shadow-[0_0_12px_#00f0ff] rounded-full fixed top-0 left-0"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%',
                    scale: isPressed ? 0.7 : 1,
                    opacity: isVisible ? 1 : 0
                }}
            />

            {/* Tactical Target Ring */}
            <motion.div
                className="w-7 h-7 border-[1.5px] border-neon-purple/50 rounded-full fixed top-0 left-0"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isVisible ? 1 : 0,
                    scale: isPressed ? 1.4 : 1, // Feedback on click
                    rotate: isPressed ? 45 : 0
                }}
            />

            {/* Tactical Crosshair Notches */}
            {[0, 90, 180, 270].map((rotation) => (
                <motion.div
                    key={rotation}
                    className="w-2.5 h-[1px] bg-neon-cyan/50 fixed top-0 left-0"
                    style={{
                        x: springX,
                        y: springY,
                        rotate: rotation,
                        translateX: rotation === 0 || rotation === 180 ? (rotation === 0 ? '160%' : '-260%') : '-50%',
                        translateY: rotation === 90 || rotation === 270 ? (rotation === 270 ? '160%' : '-250%') : '-50%',
                        opacity: isVisible ? 0.7 : 0,
                        scale: isPressed ? 0.4 : 1
                    }}
                />
            ))}
        </div>
    )
}
