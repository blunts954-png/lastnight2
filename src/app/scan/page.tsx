'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Starfield from '@/components/Starfield'
import { validateScan, recordScan } from '@/lib/firebase'
import { Html5Qrcode } from 'html5-qrcode'

type ScanResultState = {
    status: 'idle' | 'scanning' | 'success' | 'warning' | 'error' | 'banned'
    data?: any
    message?: string
}

export default function ScannerPage() {
    const [password, setPassword] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [scanState, setScanState] = useState<ScanResultState>({ status: 'idle' })
    const [manualInput, setManualInput] = useState('')
    const [lastScanTime, setLastScanTime] = useState('')
    const [scannerActive, setScannerActive] = useState(false)

    const qrRegionRef = useRef<HTMLDivElement>(null)
    const scanInstance = useRef<Html5Qrcode | null>(null)

    // Handle password submission
    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === 'LASTNIGHT2026') {
            setIsAuthenticated(true)
        } else {
            alert('Invalid password')
        }
    }

    const startScanner = async () => {
        setScannerActive(true)
        setScanState({ status: 'scanning' })

        try {
            if (!scanInstance.current) {
                scanInstance.current = new Html5Qrcode("reader")
            }

            await scanInstance.current.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                onScanSuccess,
                onScanError
            )
        } catch (err) {
            console.error("Scanner Error:", err)
            alert("CAMERA ACCESS FAILED. TRY RELOADING.")
        }
    }

    const onScanSuccess = async (decodedText: string) => {
        if (scanInstance.current) {
            try {
                await scanInstance.current.stop()
                setScannerActive(false)
            } catch (e) { }
        }
        processValidation(decodedText)
    }

    const onScanError = (errorMessage: string) => {
        // Just let it keep scanning
    }

    const processValidation = async (identifier: string) => {
        setScanState({ status: 'scanning', message: 'CONSULTING THE ARCHIVE...' })

        // Determine if it's a ticket token or a member ID/phone
        const type = identifier.startsWith('LN-GOD-') || identifier.startsWith('LN-') ? 'member' : 'ticket'

        const result = await validateScan(type, identifier)
        setLastScanTime(new Date().toLocaleTimeString())

        if (result.success) {
            setScanState({
                status: 'success',
                data: result.data,
                message: result.data.name || result.data.ticket_type
            })
            // Log the scan for analytics/entry count
            recordScan({
                scan_id: `SCAN-${Date.now()}`,
                member_id: result.data.member_id || 'GUEST',
                event_id: 'FRIDAY-13TH-2026',
                timestamp: new Date().toISOString(),
                location: 'MAIN DOOR',
                result: 'success'
            })
        } else {
            setScanState({
                status: result.error === 'BANNED' ? 'banned' : 'error',
                message: result.error || 'NOT FOUND',
                data: result.data
            })
        }
    }

    const handleManualSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (manualInput.trim()) {
            processValidation(manualInput.trim())
        }
    }

    const resetScanner = () => {
        setScanState({ status: 'idle' })
        setManualInput('')
    }

    // Colors based on result
    const getTheme = () => {
        const themes = {
            success: { text: 'text-matrix-green', bg: 'bg-matrix-green/10', border: 'border-matrix-green', icon: '✓', label: 'ACCESS GRANTED' },
            error: { text: 'text-alert-red', bg: 'bg-alert-red/10', border: 'border-alert-red', icon: '✗', label: 'DENIED' },
            banned: { text: 'text-alert-red', bg: 'bg-alert-red/20', border: 'border-alert-red animate-pulse', icon: '!!!', label: 'BANNED' },
            warning: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400', icon: '?', label: 'CHECK ID' },
            idle: { text: 'text-neon-cyan', bg: 'bg-black/50', border: 'border-neon-cyan', icon: '', label: '' },
            scanning: { text: 'text-neon-purple', bg: 'bg-neon-purple/5', border: 'border-neon-purple', icon: '', label: 'ANALYZING' }
        }
        return themes[scanState.status as keyof typeof themes] || themes.idle
    }

    const theme = getTheme()

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-pitch-black relative flex items-center justify-center">
                <Starfield />
                <div className="relative z-10 w-full max-w-md p-8">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card border-neon-purple/30 box-glow-purple p-8">
                        <h1 className="font-mono text-2xl text-center mb-2 text-static-white tracking-widest font-bold">DOOR ACCESS</h1>
                        <p className="font-mono text-cold-gray text-center text-[10px] mb-8 tracking-widest uppercase">STRICT SECURE LINK ONLY</p>
                        <form onSubmit={handlePasswordSubmit}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-4 bg-black border border-neon-purple rounded text-static-white font-mono focus:border-neon-cyan focus:outline-none text-center text-3xl tracking-[0.5em]"
                                placeholder="••••"
                                autoFocus
                            />
                            <button type="submit" className="w-full btn-primary mt-8 py-4 font-mono text-sm tracking-[0.2em] uppercase font-bold">
                                AUTHENTICATE
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-pitch-black relative text-static-white font-mono overflow-x-hidden">
            <Starfield />

            <div className="relative z-10 p-6 flex justify-between items-center border-b border-white/10 backdrop-blur-md sticky top-0">
                <div>
                    <span className="text-neon-purple text-[10px] tracking-widest block font-bold">BOUNCER NODE</span>
                    <span className="text-static-white text-sm tracking-widest uppercase font-bold">LAST NIGHT DOOR</span>
                </div>
                <button onClick={() => window.location.reload()} className="text-cold-gray text-[10px] tracking-widest border border-white/20 px-3 py-1 rounded-sm hover:text-neon-cyan transition-colors uppercase">
                    Logout
                </button>
            </div>

            <div className="relative z-10 max-w-lg mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-100px)]">
                <AnimatePresence mode="wait">
                    {scanState.status === 'idle' || scanState.status === 'scanning' ? (
                        <motion.div key="scanner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
                            {/* Camera Area */}
                            <div className="relative aspect-square w-full max-w-[350px] mx-auto bg-black rounded-lg border-2 border-neon-purple/50 overflow-hidden mb-8 shadow-[0_0_30px_rgba(176,38,255,0.2)]">
                                {scanState.status === 'idle' ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                                        <button onClick={startScanner} className="btn-primary px-8 py-4 font-bold tracking-widest text-sm uppercase">Activate Lens</button>
                                    </div>
                                ) : (
                                    <div id="reader" className="w-full h-full"></div>
                                )}
                                <div className="absolute inset-0 pointer-events-none border-[40px] border-black/40 z-10"></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-neon-cyan/50 rounded z-10 animate-pulse"></div>
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-neon-cyan/50 shadow-[0_0_15px_rgba(0,240,255,1)] z-10 animate-scan"></div>
                            </div>

                            {/* Manual Entry Fallback */}
                            <div className="w-full space-y-6">
                                <form onSubmit={handleManualSearch} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={manualInput}
                                        onChange={(e) => setManualInput(e.target.value.toUpperCase())}
                                        placeholder="MEMBER ID OR PHONE"
                                        className="flex-grow bg-black/50 border border-white/20 px-4 py-3 rounded text-sm focus:border-neon-cyan focus:outline-none tracking-widest font-mono"
                                    />
                                    <button type="submit" className="border border-neon-cyan text-neon-cyan px-4 py-3 rounded text-xs font-bold hover:bg-neon-cyan/10 transition-colors uppercase">Check</button>
                                </form>
                                <p className="text-center text-[10px] text-cold-gray tracking-[0.2em] font-bold uppercase">TIP: SEARCH BY PHONE IF QR WON'T SCAN</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className={`w-full p-8 rounded border-4 ${theme.bg} ${theme.border} text-center flex flex-col items-center justify-center min-h-[400px] shadow-2xl relative overflow-hidden`}
                        >
                            {/* Scanning result decorations */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${theme.text.split('-')[1]}-${theme.text.split('-')[2]} to-transparent`}></div>

                            <div className={`flex items-center justify-center w-24 h-24 rounded-full border-2 ${theme.border} mb-6`}>
                                <span className={`text-5xl font-bold ${theme.text}`}>{theme.icon}</span>
                            </div>

                            <p className={`text-xs tracking-[0.3em] font-bold mb-2 uppercase ${theme.text}`}>{theme.label}</p>
                            <h2 className="text-3xl font-bold mb-6 tracking-wider uppercase text-static-white break-words w-full">
                                {scanState.message}
                            </h2>

                            {scanState.data && (
                                <div className="w-full bg-black/20 p-4 rounded-sm border border-white/10 mb-8 space-y-2">
                                    <div className="flex justify-between text-[10px] uppercase font-bold text-cold-gray">
                                        <span>TIER</span>
                                        <span className="text-static-white">{scanState.data.tier || scanState.data.ticket_type || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] uppercase font-bold text-cold-gray">
                                        <span>POINTS</span>
                                        <span className="text-static-white font-mono">{scanState.data.points || 0}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] uppercase font-bold text-cold-gray">
                                        <span>EVENTS</span>
                                        <span className="text-static-white">{scanState.data.attendance_count || 0}</span>
                                    </div>
                                </div>
                            )}

                            <div className="text-[10px] text-cold-gray tracking-widest mb-8 font-bold uppercase">
                                ARCHIVE TIME: {lastScanTime}
                            </div>

                            <button onClick={resetScanner} className="w-full btn-primary py-4 font-bold tracking-widest uppercase">Next Subject</button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <style jsx global>{`
                @keyframes scan {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}</style>
        </div>
    )
}
