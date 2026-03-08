'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
    createMember,
    getMemberByPhone,
    generateMemberId,
    generateQrToken,
} from '@/lib/firebase'
import html2canvas from 'html2canvas'

interface MemberPortalProps {
    onClose: () => void
    onLogin: () => void
    initialStep?: 'login' | 'register'
}

interface Member {
    member_id: string
    name: string
    email?: string
    tier: string
    points: number
    attendance_count: number
    member_since: string
}

export default function MemberPortal({ onClose, onLogin, initialStep = 'login' }: MemberPortalProps) {
    const [step, setStep] = useState<'login' | 'register' | 'dashboard'>(initialStep)
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState('')
    const [optIn, setOptIn] = useState(false)

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState('PROCESSING...')
    const [member, setMember] = useState<Member | null>(null)
    const [qrToken, setQrToken] = useState('')
    const [justRegistered, setJustRegistered] = useState(false)

    // 3D tilt effect refs
    const cardRef = useRef<HTMLDivElement>(null)
    const [rotateX, setRotateX] = useState(0)
    const [rotateY, setRotateY] = useState(0)
    const maxDob = (() => {
        const date = new Date()
        date.setFullYear(date.getFullYear() - 18)
        return date.toISOString().split('T')[0]
    })()

    // Handle card tilt effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateXValue = ((y - centerY) / centerY) * -10
        const rotateYValue = ((x - centerX) / centerX) * 10

        setRotateX(rotateXValue)
        setRotateY(rotateYValue)
    }

    const handleMouseLeave = () => {
        setRotateX(0)
        setRotateY(0)
    }

    // Handle login/registration with Firebase
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const phases = ['INITIALIZING SECURE LINK...', 'VERIFYING DATA ALIGNMENT...', 'SYNCING WITH FIRESTORE...']
            for (const phase of phases) {
                setLoadingText(phase)
                await new Promise(resolve => setTimeout(resolve, 500))
            }

            const normalizedPhone = phone.replace(/\D/g, '')
            const isJJ = normalizedPhone === '6613840179' || normalizedPhone === '16613840179'

            if (step === 'register') {
                const birthDate = new Date(`${dob}T00:00:00`)
                if (Number.isNaN(birthDate.getTime()) || birthDate > new Date(`${maxDob}T23:59:59`)) {
                    alert('BLACK CARD APPLICATIONS ARE LIMITED TO GUESTS WHO ARE 18 OR OLDER.')
                    setLoading(false)
                    return
                }
            }

            if (step === 'login') {
                // Check if member exists in Firebase
                const existingMember = await getMemberByPhone(normalizedPhone)

                if (isJJ) {
                    setMember({
                        member_id: 'LN-GOD-001',
                        name: 'Party Boy JJ (CEO OF LAST PARTY ENTERTAINMENT)',
                        tier: 'God Card',
                        points: 999999,
                        attendance_count: 999,
                        member_since: '2020-01-01'
                    })
                    setQrToken(generateQrToken('LN-GOD-001'))
                    setJustRegistered(false)
                    setStep('dashboard')
                    onLogin()
                } else if (existingMember) {
                    setMember({
                        member_id: existingMember.member_id,
                        name: existingMember.name,
                        email: existingMember.email,
                        tier: existingMember.tier,
                        points: existingMember.points,
                        attendance_count: existingMember.attendance_count,
                        member_since: existingMember.member_since
                    })
                    setQrToken(existingMember.qr_token || generateQrToken(existingMember.member_id))
                    setJustRegistered(false)
                    setStep('dashboard')
                    onLogin()
                } else {
                    alert('MEMBER NOT FOUND. PLEASE APPLY FOR A BLACK CARD.')
                    setStep('register')
                }
            } else {
                // Check if already registered
                const checkMember = await getMemberByPhone(normalizedPhone)
                if (checkMember) {
                    alert('PHONE NUMBER ALREADY REGISTERED. REDIRECTING TO LOGIN.')
                    setStep('login')
                    setLoading(false)
                    return
                }

                // Register new member in Firebase
                const memberId = isJJ ? 'LN-GOD-001' : generateMemberId()
                const newFirebaseMember: any = {
                    member_id: memberId,
                    name: name,
                    email: email,
                    phone: normalizedPhone,
                    dob: dob,
                    tier: isJJ ? 'Inner Circle' : 'Blacklist', // Firebase schema mapping
                    points: isJJ ? 999999 : 0,
                    attendance_count: isJJ ? 999 : 0,
                    member_since: new Date().toISOString().split('T')[0],
                    status: true,
                    banned: false,
                    qr_token: generateQrToken(memberId),
                    last_active: new Date().toISOString()
                }

                await createMember(newFirebaseMember)

                setMember({
                    member_id: memberId,
                    name: name,
                    email: email,
                    tier: isJJ ? 'God Card' : 'Blacklist',
                    points: isJJ ? 999999 : 0,
                    attendance_count: isJJ ? 999 : 0,
                    member_since: newFirebaseMember.member_since
                })
                setQrToken(newFirebaseMember.qr_token)
                setJustRegistered(true)
                setStep('dashboard')
                onLogin()
            }
        } catch (error) {
            console.error('Portal Error:', error)
            const isLocal = window.location.hostname === 'localhost'
            alert(isLocal
                ? 'SYSTEM ERROR: UNABLE TO SYNC WITH THE GRID. CHECK CONSOLE FOR FIREBASE ERRORS.'
                : 'GRID OFFLINE: THIS DEPLOY IS LIKELY MISSING FIREBASE KEYS. CONTACT ARCHITECT.')
        } finally {
            setLoading(false)
        }
    }

    const exportCard = async () => {
        if (!cardRef.current) return
        setLoading(true)
        setLoadingText('MINTING PHYSICAL PERSISTENCE...')

        try {
            // Reset rotation for clean capture
            setRotateX(0)
            setRotateY(0)

            // Wait for rotation transition
            await new Promise(resolve => setTimeout(resolve, 150))

            const canvas = await html2canvas(cardRef.current, {
                backgroundColor: null,
                scale: 3, // High quality
                logging: false,
                useCORS: true
            })

            const link = document.createElement('a')
            link.download = `LASTNIGHT-${member?.member_id}.png`
            link.href = canvas.toDataURL('image/png')
            link.click()

            alert('CARD EXPORTED TO YOUR ARCHIVE. YOU CAN NOW SAVE THIS TO YOUR PHONE WALLET OR PHOTOS.')
        } catch (err) {
            console.error('Export Error:', err)
            alert('EXPORT FAILED. PLEASE TAKE A SCREENSHOT OF YOUR CARD.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-pitch-black/95 backdrop-blur-xl"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="relative w-full max-w-md max-h-[90vh] overflow-y-auto no-scrollbar"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-0 right-0 z-10 text-cold-gray hover:text-static-white transition-colors"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Login/Register Form */}
                    {step !== 'dashboard' && (
                        <div className="glass-card border-neon-purple/50 box-glow-purple p-8 mt-10">
                            <h2 className="font-mono text-2xl text-center mb-2 font-bold tracking-widest text-static-white">
                                {step === 'login' ? 'MEMBER LOGIN' : 'THE BLACK CARD'}
                            </h2>
                            <p className="font-mono text-cold-gray text-center text-xs tracking-widest mb-6">
                                {step === 'login'
                                    ? 'ENTER YOUR PHONE NUMBER'
                                    : 'APPLY WITH NAME, EMAIL, BIRTHDAY, AND PHONE'}
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {step === 'register' && (
                                    <>
                                        <div>
                                            <label className="block font-mono text-neon-cyan text-xs tracking-widest mb-2 font-bold uppercase">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 bg-black/50 border border-neon-purple rounded text-static-white font-mono text-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all"
                                                placeholder="JOHN DOE"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-mono text-neon-cyan text-xs tracking-widest mb-2 font-bold uppercase">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 bg-black/50 border border-neon-purple rounded text-static-white font-mono text-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all"
                                                placeholder="VIP@EXAMPLE.COM"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block font-mono text-neon-cyan text-xs tracking-widest mb-2 font-bold uppercase">
                                                Date of Birth (For B-Day Perks)
                                            </label>
                                            <input
                                                type="date"
                                                value={dob}
                                                onChange={(e) => setDob(e.target.value)}
                                                max={maxDob}
                                                className="w-full px-4 py-3 bg-black/50 border border-neon-purple rounded text-static-white font-mono text-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all [color-scheme:dark]"
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                                <div>
                                    <label className="block font-mono text-neon-cyan text-xs tracking-widest mb-2 font-bold uppercase">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-3 bg-black/50 border border-neon-purple rounded text-static-white font-mono text-sm focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan focus:outline-none transition-all"
                                        placeholder="+1 (555) 000-0000"
                                        required
                                    />
                                </div>
                                {step === 'register' && (
                                    <div className="flex items-start gap-3 mt-4">
                                        <div className="flex items-center h-5">
                                            <input
                                                id="optIn"
                                                type="checkbox"
                                                checked={optIn}
                                                onChange={(e) => setOptIn(e.target.checked)}
                                                className="w-4 h-4 bg-black/50 border border-neon-purple rounded focus:ring-2 focus:ring-neon-cyan accent-neon-cyan cursor-pointer"
                                                required
                                            />
                                        </div>
                                        <label htmlFor="optIn" className="font-mono text-[10px] text-cold-gray tracking-wider leading-relaxed cursor-pointer select-none">
                                            I GRANT PERMISSION TO RECEIVE TEXTS AND EMAILS REGARDING LAST NIGHT ENTERTAINMENT EVENTS, EXCLUSIVE NEWS, AND OFFERS. MUST BE ACCEPTED TO PROCEED.
                                        </label>
                                    </div>
                                )}
                                {step === 'register' && (
                                    <p className="font-mono text-[10px] text-cold-gray tracking-wider leading-relaxed">
                                        BLACK CARD APPLICATIONS ARE 18+ ONLY. DATE OF BIRTH IS USED FOR AGE CHECKS AND BIRTHDAY PERKS.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed mt-2 py-3 text-sm"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center font-mono tracking-widest text-[10px] sm:text-xs">
                                            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-neon-cyan flex-shrink-0" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            <span className="truncate">{loadingText}</span>
                                        </span>
                                    ) : (
                                        step === 'login' ? 'ACCESS CARD' : 'APPLY NOW'
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={() => setStep(step === 'login' ? 'register' : 'login')}
                                    className="font-mono text-cold-gray text-xs tracking-widest hover:text-neon-cyan transition-colors"
                                >
                                    {step === 'login'
                                        ? "DON'T HAVE A CARD? APPLY"
                                        : 'ALREADY A MEMBER? LOGIN'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Dashboard - Digital Card */}
                    {step === 'dashboard' && member && (
                        <div className="space-y-6 mt-8">

                            {justRegistered && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-neon-cyan/10 border border-neon-cyan p-4 rounded text-center mb-6"
                                >
                                    <p className="font-mono text-neon-cyan text-sm tracking-widest mb-1 font-bold">APPLICATION APPROVED</p>
                                    {member.tier === 'God Card' ? (
                                        <p className="font-mono text-cold-gray text-xs tracking-wider uppercase text-[#FFD700]">Welcome back boss. Your God Card has been minted.</p>
                                    ) : (
                                        <p className="font-mono text-cold-gray text-xs tracking-wider">Your digital Black Card has been emailed to you.</p>
                                    )}
                                </motion.div>
                            )}
                            {!justRegistered && member.tier === 'God Card' && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-[#FFD700]/10 border border-[#FFD700] p-4 rounded text-center mb-6"
                                >
                                    <p className="font-mono text-[#FFD700] text-sm tracking-widest mb-1 font-bold">WELCOME BACK BOSS</p>
                                </motion.div>
                            )}

                            {/* 3D Membership Card - Metal Credit Card Style */}
                            <div
                                ref={cardRef}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                                className="relative w-full aspect-[1.586/1] cursor-pointer"
                                style={{
                                    transformStyle: 'preserve-3d',
                                    transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                                    transition: 'transform 0.1s ease-out'
                                }}
                            >
                                {/* Card Background */}
                                <div className={`absolute inset-0 rounded-2xl overflow-hidden ${member.tier === 'God Card' ? 'bg-gradient-to-br from-[#cca300] via-[#FFD700] to-[#b38f00] border border-[#FFEA70]' : 'bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#050505] border border-[#333]'} shadow-2xl`}
                                    style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75), inset 0 1px 1px rgba(255, 255, 255, 0.1)' }}>

                                    {/* Subtle metal brush texture */}
                                    <div className="absolute inset-0 opacity-[0.03]"
                                        style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)' }}></div>

                                    {/* Neon ambient glow inside card */}
                                    <div className="absolute -top-20 -right-20 w-48 h-48 bg-neon-purple rounded-full blur-[80px] opacity-20"></div>
                                    <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-neon-cyan rounded-full blur-[80px] opacity-10"></div>

                                    {/* Card Content - Real Credit Card Layout */}
                                    <div className="relative z-10 p-6 h-full flex flex-col justify-between" style={{ transform: 'translateZ(20px)' }}>
                                        {/* Top Row */}
                                        <div className="flex justify-between items-start">
                                            <div className={`font-serif italic ${member.tier === 'God Card' ? 'text-black/80' : 'text-static-white/70'} text-[10px] tracking-[0.2em] font-bold uppercase`}>
                                                LAST NIGHT ENTERTAINMENT
                                            </div>
                                            <div className={`tracking-[0.3em] font-mono text-[10px] ${member.tier === 'God Card' ? 'text-black bg-[#FFD700] border-black/50 shadow-md font-bold' : 'text-static-white/50 border-white/20'} border px-2 py-1 rounded-sm uppercase`}>
                                                {member.tier}
                                            </div>
                                        </div>

                                        {/* EMV Chip & QR row */}
                                        <div className="flex justify-between items-center my-2">
                                            {/* Simulated Metal EMV Chip */}
                                            <div className="w-12 h-9 rounded-md bg-gradient-to-br from-[#ffd700] via-[#cca300] to-[#b38f00] border border-[#e6c200] opacity-80 flex items-center justify-center relative overflow-hidden" style={{ boxShadow: 'inner 0 0 5px rgba(0,0,0,0.5)' }}>
                                                <div className="absolute inset-0  border border-black/20 rounded-md"></div>
                                                <div className="w-full h-[1px] bg-black/20 absolute top-1/2"></div>
                                                <div className="h-full w-[1px] bg-black/20 absolute left-1/3"></div>
                                                <div className="h-full w-[1px] bg-black/20 absolute right-1/3"></div>
                                            </div>

                                            {/* QR Code */}
                                            <div className="bg-white p-1 rounded-sm relative" style={{ transform: 'translateZ(10px)' }}>
                                                <QRCodeSVG
                                                    value={qrToken}
                                                    size={48}
                                                    bgColor="#FFFFFF"
                                                    fgColor="#000000"
                                                    level="L"
                                                />
                                            </div>
                                        </div>

                                        {/* Bottom Fields */}
                                        <div>
                                            {/* Simulated Card Number Display */}
                                            <div className={`font-mono ${member.tier === 'God Card' ? 'text-black font-bold' : 'text-static-white/80'} text-lg tracking-[0.2em] mb-2 drop-shadow-md`}>
                                                {member.member_id.replace('LN-', '4912 30')} **** {member.member_id.slice(-4)}
                                            </div>

                                            <div className="flex justify-between items-end">
                                                <div className="flex flex-col">
                                                    <span className={`font-mono text-[8px] ${member.tier === 'God Card' ? 'text-black/60' : 'text-static-white/40'} tracking-widest uppercase mb-0.5 font-bold`}>Cardholder Name</span>
                                                    <span className={`font-mono ${member.tier === 'God Card' ? 'text-black' : 'text-static-white'} tracking-[0.1em] text-sm md:text-[11px] lg:text-sm uppercase drop-shadow-md shadow-black font-bold`}>
                                                        {member.name}
                                                    </span>
                                                </div>

                                                <div className="flex gap-4">
                                                    <div className="flex flex-col text-right">
                                                        <span className={`font-mono text-[8px] ${member.tier === 'God Card' ? 'text-black/60 font-bold' : 'text-static-white/40'} tracking-widest uppercase mb-0.5`}>Points</span>
                                                        <span className={`font-mono ${member.tier === 'God Card' ? 'text-black font-bold' : 'text-static-white'} tracking-widest text-xs`}>{member.points}</span>
                                                    </div>
                                                    <div className="flex flex-col text-right">
                                                        <span className={`font-mono text-[8px] ${member.tier === 'God Card' ? 'text-black/60 font-bold' : 'text-static-white/40'} tracking-widest uppercase mb-0.5`}>Since</span>
                                                        <span className={`font-mono ${member.tier === 'God Card' ? 'text-black font-bold' : 'text-static-white'} tracking-widest text-xs`}>{member.member_since.split('-')[0].slice(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions / Buttons */}
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={exportCard}
                                    className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-black/50 border border-neon-purple/50 box-glow-purple rounded hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
                                >
                                    <svg className="w-6 h-6 text-static-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    <span className="font-mono text-[10px] uppercase text-static-white tracking-widest">Apple Wallet</span>
                                </button>
                                <button
                                    onClick={exportCard}
                                    className="flex flex-col items-center justify-center gap-2 px-4 py-4 bg-black/50 border border-neon-purple/50 box-glow-purple rounded hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all"
                                >
                                    <svg className="w-6 h-6 text-static-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.61 16.19l1.47-1.3c.25-.22.62-.26.89-.09.27.17.38.51.26.8l-.79 1.91c-.13.31-.45.51-.8.51h-.15c-.53-.03-.98-.34-1.14-.82l-.65-1.84c-.17-.48-.01-.99.35-1.28l1.56-.88zm6.75-5.54l-2.93 4.44-2.89-4.44a.49.49 0 00-.53-.18.51.51 0 00-.31.45l-.33 3.6c-.07.71.44 1.37 1.15 1.49l3.26.55c.71.12 1.38-.36 1.5-1.08l.33-3.6a.51.51 0 00-.51-.62.5.5 0 00-.34.15l-2.39 2.53 2.5 3.8c.19.29.58.4.91.26.33-.14.48-.52.35-.86l-1.17-3.01 1.44-1.51c.2-.21.26-.52.15-.8-.11-.28-.39-.45-.7-.45h-3.19l-.28-2.76c-.04-.35-.33-.62-.68-.65h-.13c-.4.03-.72.35-.72.76l.21 2.66zm6.42.03l-1.71 1.5c-.21.18-.52.15-.69-.07-.17-.22-.14-.53.07-.7l1.71-1.5-1.27-1.67c-.17-.23-.14-.54.08-.71.22-.17.53-.14.7.08l1.27 1.67 1.29-1.67c.17-.23.48-.26.7-.08.22.17.26.48.08.71l-1.29 1.67 1.71 1.5c.21.18.26.49.07.7-.17.21-.48.26-.7.07l-1.71-1.5z" />
                                    </svg>
                                    <span className="font-mono text-[10px] uppercase text-static-white tracking-widest">Google Pay</span>
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    )
}
