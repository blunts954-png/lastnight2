'use client'

import { motion } from 'framer-motion'

const galleryImages = [
    { src: '/IMG_0634.png', alt: 'Last Night Entertainment Gallery 1' },
    { src: '/IMG_0636.png', alt: 'Last Night Entertainment Gallery 2' },
    { src: '/146DCE7A-FE8C-4EED-9EBE-43E4173B2B38.jpeg', alt: 'Last Night Entertainment Gallery 3' },
    { src: '/1DD98BB6-A6D0-4B8E-8B25-2BBE6A40E456.jpeg', alt: 'Last Night Entertainment Gallery 4' },
    { src: '/Shawn2blacklive.jpeg', alt: 'Last Night Entertainment Gallery 5' },
]

export default function LastNightAlbum() {
    return (
        <section id="album" className="section-padding bg-pitch-black border-t border-ethereal-white relative overflow-hidden">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="font-mono text-neon-cyan text-xs md:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
                        Archived Memories
                    </p>
                    <h2 className="font-monument text-3xl md:text-5xl text-static-white tracking-widest uppercase leading-tight">
                        LAST NIGHT ENTERTAINMENT<br />ALBUM
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl glitch-hover"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 font-mono text-[8px] tracking-widest text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase">
                                Entry_{index + 1}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center font-mono text-cold-gray text-[9px] tracking-[0.5em] mt-12 uppercase"
                >
                    Captured during the madness // Private Archive
                </motion.p>
            </div>
        </section>
    )
}
