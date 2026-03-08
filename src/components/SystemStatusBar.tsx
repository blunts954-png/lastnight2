'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function SystemStatusBar() {
    const [stats, setStats] = useState({
        uplink: 'CONNECTED',
        latency: '12ms',
        aiNode: 'SYNCED',
        ticketsIssued: 'READING...',
        members: 'READING...'
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                latency: `${Math.floor(Math.random() * 20) + 5}ms`,
                ticketsIssued: `${Math.floor(Math.random() * 50) + 120}`,
                members: `${Math.floor(Math.random() * 300) + 850}`
            }))
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed bottom-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-md border-t border-white/10 px-4 py-1 flex justify-between items-center font-mono text-[8px] md:text-[10px] text-cold-gray tracking-widest hidden md:flex">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-matrix-green animate-pulse"></span>
                    <span className="text-matrix-green uppercase">UPLINK: {stats.uplink}</span>
                </div>
                <div>LATENCY: {stats.latency}</div>
                <div className="text-neon-cyan uppercase">AI NODE: {stats.aiNode} [MARCH_13_READY]</div>
            </div>

            <div className="flex items-center gap-6">
                <div>ARCHIVE_HITS: {stats.ticketsIssued}</div>
                <div>BLACK_CARDS_ACTIVE: {stats.members}</div>
                <div className="text-static-white/30 hidden lg:block">LOCAL_TIME: {new Date().toLocaleTimeString()}</div>
            </div>

            <style jsx>{`
                div {
                    text-shadow: 0 0 5px rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </div>
    )
}
