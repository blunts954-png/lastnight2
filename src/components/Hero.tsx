'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/LanguageContext'

const EVENT_DATE = new Date('2026-03-13T22:00:00-08:00')

export default function Hero() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    })
    const { language, t } = useLanguage()

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date()
            const difference = EVENT_DATE.getTime() - now.getTime()

            const safeDifference = Math.max(0, difference)
            setTimeLeft({
                days: Math.floor(safeDifference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((safeDifference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((safeDifference / (1000 * 60)) % 60),
                seconds: Math.floor((safeDifference / 1000) % 60)
            })
        }

        calculateTimeLeft()
        const timer = setInterval(calculateTimeLeft, 1000)
        return () => clearInterval(timer)
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: 'easeOut'
            }
        }
    }

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4 pt-24 pb-10 overflow-hidden">
            {/* Cinematic Background Layer */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-pitch-black via-transparent to-pitch-black z-10" />
                <div className="absolute inset-0 bg-pitch-black/55 z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,240,255,0.14),transparent_38%),radial-gradient(circle_at_70%_25%,rgba(176,38,255,0.18),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(255,51,51,0.15),transparent_38%)] z-10" />
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    <motion.span
                        aria-hidden="true"
                        animate={{
                            x: [0, -48, 32, -20, 0],
                            y: [0, 74, -34, 40, 0],
                            rotate: [0, 5, -7, 3, 0],
                            scale: [1, 1.05, 0.96, 1.03, 1]
                        }}
                        transition={{
                            duration: 15,
                            ease: 'easeInOut',
                            repeat: Infinity,
                            repeatType: 'mirror'
                        }}
                        className="absolute right-[-10vw] md:right-[4vw] top-[8%] font-monument text-[52vw] md:text-[30rem] text-alert-red/10 leading-none select-none"
                    >
                        13
                    </motion.span>
                </div>
                <motion.img
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.45 }}
                    transition={{ duration: 2, ease: 'easeOut' }}
                    src="/lastnight_hero_bg.png"
                    alt="Friday the 13th event background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Container */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center w-full max-w-4xl flex flex-col items-center z-20"
            >
                {/* Main Title */}
                <motion.div className="mb-2">
                    <motion.h1
                        variants={itemVariants}
                        className="font-monument text-5xl md:text-8xl tracking-[0.14em] text-static-white leading-none text-jitter"
                        data-text={t.hero.heading.split(' ')[0]}
                    >
                        {t.hero.heading.split(' ')[0]}.
                    </motion.h1>
                    <motion.h2
                        variants={itemVariants}
                        className="font-mono text-4xl md:text-7xl lg:text-7xl font-bold tracking-[0.1em] text-neon-purple text-glow-purple leading-tight"
                    >
                        {t.hero.heading.split(' ').slice(1).join(' ')}.
                    </motion.h2>
                </motion.div>

                {/* Refined Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="font-mono text-cold-gray text-[10px] md:text-xs max-w-xl mx-auto mb-5 tracking-[0.32em] uppercase opacity-90 leading-relaxed"
                >
                    Bakersfield • March 13, 2026 • 10PM
                </motion.p>
                <motion.p
                    variants={itemVariants}
                    className="font-inter text-static-white/80 text-sm md:text-base max-w-2xl mx-auto mb-14 px-3"
                >
                    {language === 'en'
                        ? 'One night only. Secure the preorder now, or unlock 50% off with the new Black Card reward program.'
                        : 'Solo una noche. Asegura la pre-venta ahora, o desbloquea el 50% con el programa de recompensas de Tarjeta Negra.'}
                </motion.p>

                {/* Countdown Label - Industrial Style */}
                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] w-8 bg-alert-red/50" />
                    <p className="font-mono text-alert-red text-[10px] md:text-xs uppercase tracking-[0.5em] font-bold">
                        {language === 'en' ? 'ESTIMATED ARRIVAL' : 'LLEGADA ESTIMADA'}
                    </p>
                    <div className="h-[1px] w-8 bg-alert-red/50" />
                </motion.div>

                {/* Countdown Timer - Dashboard Style */}
                <motion.div
                    variants={itemVariants}
                    className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-4 md:gap-6 mb-12 font-mono w-full max-w-3xl"
                >
                    <div className="flex flex-col items-center group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-neon-purple/20 blur-md rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-20 h-20 md:w-28 md:h-28 border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center relative">
                                <span className="text-static-white font-bold text-4xl md:text-6xl tracking-tighter">
                                    {String(timeLeft.days).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                        <span className="text-cold-gray mt-3 text-[9px] tracking-[.3em] uppercase font-bold">
                            {language === 'en' ? 'DAYS' : 'DÍAS'}
                        </span>
                    </div>

                    <div className="flex flex-col items-center group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-neon-purple/20 blur-md rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-20 h-20 md:w-28 md:h-28 border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center relative">
                                <span className="text-static-white font-bold text-4xl md:text-6xl tracking-tighter">
                                    {String(timeLeft.hours).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                        <span className="text-cold-gray mt-3 text-[9px] tracking-[.3em] uppercase font-bold">
                            {language === 'en' ? 'HOURS' : 'HORAS'}
                        </span>
                    </div>

                    <div className="flex flex-col items-center group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-neon-purple/20 blur-md rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-20 h-20 md:w-28 md:h-28 border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center relative">
                                <span className="text-static-white font-bold text-4xl md:text-6xl tracking-tighter">
                                    {String(timeLeft.minutes).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                        <span className="text-cold-gray mt-3 text-[9px] tracking-[.3em] uppercase font-bold">
                            {language === 'en' ? 'MINUTES' : 'MINUTOS'}
                        </span>
                    </div>

                    <div className="flex flex-col items-center group">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-alert-red/20 blur-md rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-20 h-20 md:w-28 md:h-28 border border-white/10 bg-black/40 backdrop-blur-md flex items-center justify-center relative">
                                <span className="text-alert-red font-bold text-4xl md:text-6xl tracking-tighter text-glow-red">
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </span>
                            </div>
                        </div>
                        <span className="text-cold-gray mt-3 text-[9px] tracking-[.3em] uppercase font-bold text-alert-red">
                            {language === 'en' ? 'SECONDS' : 'SEGUNDOS'}
                        </span>
                    </div>
                </motion.div>

                {/* CTA Button - High Gloss */}
                <motion.div variants={itemVariants} className="mb-20 flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <a
                        href="#tickets"
                        className="relative group inline-flex items-center justify-center px-10 py-4 bg-transparent border border-neon-cyan overflow-hidden transition-all duration-300"
                    >
                        <div className="absolute inset-0 bg-neon-cyan/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        <span className="relative font-mono text-xs font-bold tracking-[0.3em] text-neon-cyan group-hover:text-white transition-colors duration-300">
                            {language === 'en' ? 'SECURE ACCESS' : 'ASEGURAR ACCESO'}
                        </span>
                    </a>
                    <a
                        href="#past-events"
                        className="relative group inline-flex items-center justify-center px-8 py-4 bg-transparent border border-alert-red/70 text-alert-red font-mono text-xs font-bold tracking-[0.25em] hover:bg-alert-red/10 transition-all duration-300"
                    >
                        {t.nav.pastEvents}
                    </a>
                </motion.div>

            </motion.div>

            {/* Aesthetic Detail: Floating coordinates */}
            <div className="absolute bottom-10 left-10 font-mono text-[8px] text-white/20 tracking-[0.5em] hidden lg:block">
                35.3733° N, 119.0187° W // BAKERSFIELD_CA
            </div>
            <div className="absolute bottom-10 right-10 font-mono text-[8px] text-white/20 tracking-[0.5em] hidden lg:block">
                STATUS: ENCRYPTED // RELOAD_V2.0
            </div>
        </section>
    )
}
