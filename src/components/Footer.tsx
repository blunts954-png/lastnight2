'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { siteConfig } from '@/lib/site'
import { useLanguage } from '@/lib/LanguageContext'

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const { language, t } = useLanguage()

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
                    <Link href="/" className="mb-6 md:mb-0 flex items-center gap-4 group">
                        <div className="relative w-16 h-16 md:w-20 md:h-20">
                            <div className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <img
                                src={siteConfig.logoSrc}
                                alt={siteConfig.name}
                                className="relative z-10 w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>
                        <div className="text-left">
                            <span className="block font-serif italic text-lg md:text-xl tracking-[0.28em] text-static-white">
                                {siteConfig.shortName}
                            </span>
                            <span className="block font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-neon-cyan">
                                Entertainment
                            </span>
                        </div>
                    </Link>

                    {/* Links */}
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                        <Link
                            href="/privacy-policy"
                            className="font-inter text-cold-gray text-sm uppercase tracking-widest hover:text-static-white transition-colors"
                        >
                            {t.footer.privacy}
                        </Link>
                        <Link
                            href="/terms"
                            className="font-inter text-cold-gray text-sm uppercase tracking-widest hover:text-static-white transition-colors"
                        >
                            {t.footer.terms}
                        </Link>
                        <Link
                            href="/contact"
                            className="font-inter text-cold-gray text-sm uppercase tracking-widest hover:text-static-white transition-colors"
                        >
                            {t.footer.contact}
                        </Link>
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
                    © {currentYear} {siteConfig.name}. {t.footer.rights}
                    <br />
                    <span className="text-electric-indigo">
                        {language === 'en' ? siteConfig.ageGateLabel : 'MAYORES DE 18 ÚNICAMENTE.'}
                    </span>
                    <br />
                    <a
                        href={siteConfig.designCredit.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-neon-cyan/50 mt-4 inline-block tracking-widest text-[10px] hover:text-neon-cyan transition-colors"
                    >
                        {t.footer.designedBy} {siteConfig.designCredit.label}
                    </a>
                </motion.p>
            </div>
        </footer>
    )
}
