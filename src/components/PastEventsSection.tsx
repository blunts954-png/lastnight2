'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const galleryImages = [
    { src: '/party1.jpg', alt: 'Past event crowd and lighting 1' },
    { src: '/party2.jpg', alt: 'Past event crowd and lighting 2' },
    { src: '/party3.jpg', alt: 'Past event crowd and lighting 3' },
    { src: '/party4.jpg', alt: 'Past event crowd and lighting 4' },
    { src: '/party5.jpg', alt: 'Past event crowd and lighting 5' },
]

export default function PastEventsSection() {
    const [failedImages, setFailedImages] = useState<Record<number, boolean>>({})

    return (
        <section id="past-events" className="section-padding relative border-t border-ethereal-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="font-mono text-neon-purple text-xs md:text-sm tracking-[0.25em] uppercase mb-3 font-bold">
                        Past Events
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl text-static-white tracking-widest">
                        Nights We Already Broke
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
                    {galleryImages.map((image, index) => {
                        const isMissing = failedImages[index]
                        return (
                            <motion.div
                                key={image.src}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.45, delay: index * 0.06 }}
                                viewport={{ once: true }}
                                className={`relative overflow-hidden rounded-xl border border-ethereal-white/70 bg-black/40 ${index === 0 ? 'col-span-2 row-span-2 min-h-[16rem] md:min-h-[24rem]' : 'min-h-[10rem] md:min-h-[14rem]'}`}
                            >
                                {!isMissing && (
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        loading="lazy"
                                        onError={() => {
                                            setFailedImages((current) => ({ ...current, [index]: true }))
                                        }}
                                    />
                                )}

                                {isMissing && (
                                    <div className="absolute inset-0 flex items-center justify-center px-4 text-center bg-[linear-gradient(130deg,rgba(255,51,51,0.14),rgba(0,0,0,0.75))]">
                                        <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-alert-red">
                                            Add {image.src.replace('/', '')} to public/
                                        </p>
                                    </div>
                                )}

                                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent_60%)] pointer-events-none" />
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
