'use client'

import { motion } from 'framer-motion'
import Marquee from '@/components/Marquee'
import { useLanguage } from '@/lib/LanguageContext'

export default function EventSection() {
    const { language, t } = useLanguage()

    return (
        <section id="event" className="relative">
            <Marquee />

            <div className="container-custom pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center flex flex-col items-center"
                >
                    {/* Section Label */}
                    <div className="border border-alert-red px-4 py-1 mb-16 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-alert-red/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out"></div>
                        <span className="font-mono text-alert-red text-xs md:text-sm tracking-[0.2em] font-bold relative z-10">
                            <span className="text-white mr-4">VOL. 13</span> {language === 'en' ? 'FRIDAY THE 13TH' : 'VIERNES 13'}
                        </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-serif font-normal text-5xl md:text-6xl lg:text-7xl mb-12 text-static-white tracking-widest text-glow">
                        {t.event.chaos}
                    </h2>

                    {/* Description */}
                    <p className="font-inter text-cold-gray text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        {t.event.description}
                    </p>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        {t.event.features.map((feature: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="glass-card p-6 text-center"
                            >
                                <h3 className="font-monument text-xl mb-3 text-static-white">
                                    {feature.title}
                                </h3>
                                <p className="font-inter text-cold-gray text-sm">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
