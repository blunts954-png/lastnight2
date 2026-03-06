'use client'

import { motion } from 'framer-motion'

const highlights = [
    {
        label: 'Date',
        value: 'Friday, March 13, 2026'
    },
    {
        label: 'Doors',
        value: '10:00 PM'
    },
    {
        label: 'City',
        value: 'Bakersfield, California'
    }
]

export default function Friday13thSection() {
    return (
        <section id="friday-13th" className="section-padding relative overflow-hidden border-t border-ethereal-white">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_15%_25%,rgba(255,51,51,0.13),transparent_34%),radial-gradient(circle_at_78%_30%,rgba(176,38,255,0.18),transparent_38%),radial-gradient(circle_at_40%_80%,rgba(0,240,255,0.14),transparent_38%)]" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="font-monument text-[42vw] sm:text-[22rem] md:text-[28rem] leading-none text-alert-red/10 select-none">
                    13
                </span>
            </div>

            <div className="container-custom relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <p className="font-mono text-alert-red text-xs md:text-sm tracking-[0.32em] uppercase font-bold mb-4">
                        Special Theme Night
                    </p>
                    <h2 className="font-monument text-4xl md:text-6xl lg:text-7xl text-static-white mb-6 tracking-wide">
                        FRIDAY THE 13TH
                    </h2>
                    <p className="font-inter text-cold-gray text-base md:text-xl leading-relaxed max-w-3xl mx-auto">
                        A cinematic midnight party built around the number 13. Dark visuals, color-synced lights,
                        heavy atmosphere, and a crowd that came for the full experience.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 mt-12">
                        {highlights.map((highlight) => (
                            <div key={highlight.label} className="glass-card p-5 text-center">
                                <p className="font-mono text-neon-cyan text-[10px] tracking-[0.22em] uppercase mb-2">
                                    {highlight.label}
                                </p>
                                <p className="font-inter text-static-white text-sm md:text-base">
                                    {highlight.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
