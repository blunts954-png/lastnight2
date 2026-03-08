import type { ReactNode } from 'react'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/site'

interface LegalPageShellProps {
    eyebrow: string
    title: string
    intro: string
    children: ReactNode
}

interface LegalSectionProps {
    title: string
    children: ReactNode
}

export function LegalSection({ title, children }: LegalSectionProps) {
    return (
        <section className="glass-card p-6 md:p-8">
            <h2 className="font-monument text-2xl md:text-3xl tracking-wide text-static-white uppercase mb-5">
                {title}
            </h2>
            <div className="space-y-4 font-inter text-sm md:text-base text-cold-gray leading-relaxed">
                {children}
            </div>
        </section>
    )
}

export default function LegalPageShell({ eyebrow, title, intro, children }: LegalPageShellProps) {
    return (
        <main className="min-h-screen bg-pitch-black text-static-white relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_12%_18%,rgba(255,51,51,0.12),transparent_30%),radial-gradient(circle_at_82%_15%,rgba(0,240,255,0.12),transparent_28%),radial-gradient(circle_at_48%_78%,rgba(176,38,255,0.18),transparent_36%)]" />
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />

            <div className="relative z-10">
                <header className="sticky top-0 z-20 border-b border-white/10 bg-pitch-black/90 backdrop-blur-xl">
                    <div className="container-custom h-20 flex items-center justify-between gap-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-12 h-12 md:w-14 md:h-14">
                                <div className="absolute inset-0 rounded-full bg-neon-cyan/20 blur-md opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <img
                                    src={siteConfig.logoSrc}
                                    alt={siteConfig.name}
                                    className="relative z-10 w-full h-full object-contain"
                                />
                            </div>
                            <span className="hidden sm:block font-serif italic text-base md:text-lg tracking-[0.28em] text-static-white">
                                {siteConfig.shortName} <span className="text-neon-cyan">ENTERTAINMENT</span>
                            </span>
                        </Link>

                        <nav className="flex items-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em]">
                            <Link href="/privacy-policy" className="text-cold-gray hover:text-static-white transition-colors">
                                Privacy
                            </Link>
                            <Link href="/terms" className="text-cold-gray hover:text-static-white transition-colors">
                                Terms
                            </Link>
                            <Link href="/contact" className="text-cold-gray hover:text-static-white transition-colors">
                                Contact
                            </Link>
                        </nav>
                    </div>
                </header>

                <section className="container-custom pt-16 pb-20 md:pt-24 md:pb-24">
                    <div className="max-w-4xl">
                        <p className="font-mono text-neon-cyan text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold mb-4">
                            {eyebrow}
                        </p>
                        <h1 className="font-monument text-4xl md:text-6xl lg:text-7xl text-static-white uppercase tracking-wide leading-tight">
                            {title}
                        </h1>
                        <p className="font-inter text-cold-gray text-base md:text-lg max-w-3xl mt-6 leading-relaxed">
                            {intro}
                        </p>
                    </div>

                    <div className="max-w-4xl mt-12 space-y-8">
                        {children}
                    </div>
                </section>

                <Footer />
            </div>
        </main>
    )
}
