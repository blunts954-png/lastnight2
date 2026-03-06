'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '@/components/Starfield'

type ScanResult = 'idle' | 'success' | 'error' | 'banned' | 'not-found'

export default function ScannerPage() {
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [scanResult, setScanResult] = useState<ScanResult>('idle')
    const [memberName, setMemberName] = useState('')
    const [memberTier, setMemberTier] = useState('')
    const [lastScan, setLastScan] = useState('')
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Handle password submission
    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // In production, verify against a secure endpoint
        if (password === 'LASTNIGHT2026') {
            setIsAuthenticated(true)
            startCamera()
        } else {
            alert('Invalid password')
        }
    }

    // Start camera for QR scanning
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            })
            if (videoRef.current) {
                videoRef.current.srcObject = stream
            }
        } catch (err) {
            console.error('Error accessing camera:', err)
        }
    }

    // Simulate QR code scan (in production, use a proper QR library)
    const simulateScan = () => {
        const memberIds = [
            { id: 'LN-A8K3M2', name: 'ALEX', tier: 'Blacklist' },
            { id: 'LN-B2N9P5', name: 'JORDAN', tier: 'Inner Circle' },
            { id: 'LN-C4Q1R8', name: 'TAYLOR', tier: 'Founder' },
        ]

        // Randomly select a member or simulate not found
        const random = Math.random()
        if (random < 0.7) {
            const member = memberIds[Math.floor(Math.random() * memberIds.length)]
            setMemberName(member.name)
            setMemberTier(member.tier)
            setScanResult('success')
        } else if (random < 0.85) {
            setScanResult('not-found')
            setMemberName('')
            setMemberTier('')
        } else {
            setMemberName('BANNED USER')
            setMemberTier('BANNED')
            setScanResult('banned')
        }

        setLastScan(new Date().toLocaleTimeString())
    }

    // Reset scanner
    const resetScanner = () => {
        setScanResult('idle')
        setMemberName('')
        setMemberTier('')
    }

    // Get result display properties
    const getResultDisplay = () => {
        switch (scanResult) {
            case 'success':
                return {
                    color: 'text-matrix-green',
                    bgColor: 'bg-matrix-green/20',
                    borderColor: 'border-matrix-green',
                    icon: '✓',
                    message: memberName
                }
            case 'error':
                return {
                    color: 'text-alert-red',
                    bgColor: 'bg-alert-red/20',
                    borderColor: 'border-alert-red',
                    icon: '✗',
                    message: 'INVALID'
                }
            case 'banned':
                return {
                    color: 'text-alert-red',
                    bgColor: 'bg-alert-red/20',
                    borderColor: 'border-alert-red',
                    icon: '✗',
                    message: 'GET LOST'
                }
            case 'not-found':
                return {
                    color: 'text-yellow-400',
                    bgColor: 'bg-yellow-400/20',
                    borderColor: 'border-yellow-400',
                    icon: '?',
                    message: 'NOT ON LIST'
                }
            default:
                return null
        }
    }

    // Password entry screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-pitch-black relative flex items-center justify-center">
                <Starfield />
                <div className="relative z-10 w-full max-w-md p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card p-8"
                    >
                        <h1 className="font-monument text-2xl text-center mb-2 text-static-white">
                            DOOR STAFF ACCESS
                        </h1>
                        <p className="font-inter text-cold-gray text-center text-sm mb-6">
                            Enter password to access scanner
                        </p>
                        <form onSubmit={handlePasswordSubmit}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-pitch-black border border-ethereal-white rounded-lg text-static-white font-inter focus:border-electric-indigo focus:outline-none text-center text-2xl tracking-widest"
                                placeholder="••••••••"
                            />
                            <button
                                type="submit"
                                className="w-full btn-primary mt-6"
                            >
                                Enter
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-pitch-black relative">
            <Starfield />

            {/* Header */}
            <div className="relative z-10 flex justify-between items-center p-4">
                <h1 className="font-monument text-xl text-static-white">SCANNER</h1>
                <button
                    onClick={() => setIsAuthenticated(false)}
                    className="font-inter text-cold-gray text-sm hover:text-static-white"
                >
                    Logout
                </button>
            </div>

            {/* Main Scanner Area */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4">
                <AnimatePresence mode="wait">
                    {scanResult === 'idle' ? (
                        <motion.div
                            key="scanner"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full max-w-md"
                        >
                            {/* Camera View */}
                            <div className="relative aspect-square bg-pitch-black rounded-2xl overflow-hidden border-2 border-ethereal-white mb-6">
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                                <canvas ref={canvasRef} className="hidden" />

                                {/* Scanning Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-64 h-64 border-2 border-electric-indigo rounded-lg animate-pulse" />
                                </div>

                                {/* Corner Markers */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-electric-indigo" />
                                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-electric-indigo" />
                                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-electric-indigo" />
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-electric-indigo" />
                            </div>

                            {/* Scan Button */}
                            <button
                                onClick={simulateScan}
                                className="w-full btn-primary neon-glow text-lg"
                            >
                                SCAN QR CODE
                            </button>

                            {/* Manual Entry */}
                            <p className="text-center font-inter text-cold-gray text-xs mt-4">
                                Point camera at member's QR code
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className={`w-full max-w-md p-8 rounded-2xl border-2 ${getResultDisplay()?.bgColor} ${getResultDisplay()?.borderColor}`}
                        >
                            {/* Result Icon */}
                            <div className="text-center mb-6">
                                <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${getResultDisplay()?.bgColor} border-4 ${getResultDisplay()?.borderColor}`}>
                                    <span className={`font-monument text-5xl ${getResultDisplay()?.color}`}>
                                        {getResultDisplay()?.icon}
                                    </span>
                                </div>
                            </div>

                            {/* Result Message */}
                            <h2 className={`font-monument text-4xl text-center mb-2 ${getResultDisplay()?.color}`}>
                                {getResultDisplay()?.message}
                            </h2>

                            {/* Member Details */}
                            {memberName && (
                                <div className="text-center mb-6">
                                    <p className="font-inter text-cold-gray text-sm uppercase tracking-widest mb-1">
                                        Member ID
                                    </p>
                                    <p className="font-monument text-2xl text-static-white">
                                        {memberTier}
                                    </p>
                                </div>
                            )}

                            {/* Timestamp */}
                            <p className="text-center font-inter text-cold-gray text-xs">
                                Scanned at {lastScan}
                            </p>

                            {/* Reset Button */}
                            <button
                                onClick={resetScanner}
                                className="w-full btn-secondary mt-6"
                            >
                                Scan Next
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
