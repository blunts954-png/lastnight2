'use client'

import { motion } from 'framer-motion'

interface BlacklistSectionProps {
    onJoinClick: () => void
}

export default function BlacklistSection({ onJoinClick }: BlacklistSectionProps) {
    return (
        <section id="blacklist" className="section-padding relative">
            <div className="container-custom">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Section Label */}
                    <span className="font-inter text-electric-indigo text-sm uppercase tracking-[0.3em]">
                        Exclusive Access
                    </span>

                    {/* Title */}
                    <h2 className="font-monument text-3xl md:text-5xl lg:text-5xl mt-4 mb-6 leading-tight uppercase">
                        LAST NIGHT ENTERTAINMENT
                    </h2>

                    <p className="font-monument text-2xl md:text-3xl text-cold-gray mb-8">
                        NOT FOR EVERYONE
                    </p>

                    {/* Description */}
                    <p className="font-inter text-cold-gray text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12">
                        The Blacklist is our exclusive loyalty program. Members receive priority entry,
                        discounted tickets, and a digital membership card that lives in their phone wallet.
                    </p>

                    {/* Benefits */}
                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {[
                            {
                                title: 'Priority Entry',
                                description: 'Coming soon.'
                            },
                            {
                                title: 'Member Pricing',
                                description: 'Unlock the $5 Friday the 13th member ticket'
                            },
                            {
                                title: 'Digital Card',
                                description: 'Add to Apple/Google Wallet'
                            },
                            {
                                title: 'Loyalty Point Rewards',
                                description: 'Coming soon.'
                            }
                        ].map((benefit, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-6 text-left"
                            >
                                <h3 className="font-monument text-lg text-electric-indigo mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="font-inter text-cold-gray text-sm">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={onJoinClick}
                            className="btn-primary neon-glow text-lg px-12"
                        >
                            Apply for Membership
                        </button>
                    </motion.div>

                    {/* Disclaimer */}
                    <p className="font-inter text-cold-gray text-xs mt-8 max-w-md mx-auto">
                        * Membership is selective. Not all applications are approved.
                        Previous event attendance and social media presence may be considered.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
