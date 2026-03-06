'use client'

import { motion } from 'framer-motion'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="section-padding bg-pitch-black border-t border-ethereal-white">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-center"
                >
                    {/* Logo */}
                    <div className="mb-6 md:mb-0">
                        <span className="font-monument text-2xl tracking-wider text-static-white leading-tight">
                            LAST NIGHT<br className="md:hidden" /> ENTERTAINMENT
                        </span>
                    </div>

                    {/* Links */}
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                        <a
                            href="#"
                            className="font-inter text-cold-gray text-sm uppercase tracking-widest hover:text-static-white transition-colors"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="font-inter text-cold-gray text-sm uppercase tracking-widest hover:text-static-white transition-colors"
                        >
                            Terms
                        </a>
                        <a
                            href="mailto:contact@lastnight.com"
                            className="font-inter text-cold-gray text-sm uppercase tracking-widest hover:text-static-white transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="border-t border-ethereal-white my-8"
                />

                {/* Copyright */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center font-inter text-cold-gray text-xs"
                >
                    © {currentYear} LAST NIGHT ENTERTAINMENT. All rights reserved.
                    <br />
                    <span className="text-electric-indigo">NOT FOR EVERYONE</span>
                    <br />
                    <span className="text-neon-cyan/50 mt-4 inline-block tracking-widest text-[10px]">
                        Designed by ChaoticallyOrganizedAI.com
                    </span>
                </motion.p>
            </div>
        </footer>
    )
}
