import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell, { LegalSection } from '@/components/LegalPageShell'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
    title: `Contact | ${siteConfig.name}`,
    description: 'Public contact options for LAST NIGHT ENTERTAINMENT guest questions, ticket issues, and Black Card follow-up.',
}

function ContactCard({
    title,
    description,
    actionLabel,
    actionHref,
}: {
    title: string
    description: string
    actionLabel?: string
    actionHref?: string
}) {
    return (
        <div className="glass-card p-6">
            <h3 className="font-monument text-xl text-static-white uppercase tracking-wide mb-3">
                {title}
            </h3>
            <p className="font-inter text-cold-gray text-sm md:text-base leading-relaxed">
                {description}
            </p>
            {actionLabel && actionHref && (
                <a
                    href={actionHref}
                    target={actionHref.startsWith('http') ? '_blank' : undefined}
                    rel={actionHref.startsWith('http') ? 'noreferrer' : undefined}
                    className="inline-flex items-center mt-5 px-5 py-3 border border-neon-cyan text-neon-cyan font-mono text-xs uppercase tracking-[0.28em] hover:bg-neon-cyan hover:text-black transition-colors"
                >
                    {actionLabel}
                </a>
            )}
        </div>
    )
}

export default function ContactPage() {
    const hasInstagram = Boolean(siteConfig.contact.instagramLabel && siteConfig.contact.instagramUrl)
    const hasEmail = Boolean(siteConfig.contact.email)
    const hasPhone = Boolean(siteConfig.contact.phone)

    return (
        <LegalPageShell
            eyebrow="Contact"
            title="Reach The Team"
            intro="Instagram DMs are the main public contact lane for guest questions, event updates, and Black Card follow-up. Direct email and phone details will be added here as soon as the final contact information is confirmed."
        >
            <LegalSection title="Public Contact Channels">
                <div className="grid gap-6 md:grid-cols-3">
                    <ContactCard
                        title="Instagram"
                        description={hasInstagram
                            ? `${siteConfig.contact.instagramLabel} is the fastest way to reach the team for questions about tickets, entry, Black Card access, and party updates.`
                            : 'Instagram DMs are the primary public contact channel. The official handle will be posted here as soon as it is confirmed.'}
                        actionLabel={hasInstagram ? `Open ${siteConfig.contact.instagramLabel}` : undefined}
                        actionHref={hasInstagram ? siteConfig.contact.instagramUrl : undefined}
                    />
                    <ContactCard
                        title="Email"
                        description={hasEmail
                            ? `Use ${siteConfig.contact.email} for promoter, venue, partnership, or guest support requests.`
                            : 'The direct support email is being finalized and will be published here once it is confirmed.'}
                        actionLabel={hasEmail ? 'Send Email' : undefined}
                        actionHref={hasEmail ? `mailto:${siteConfig.contact.email}` : undefined}
                    />
                    <ContactCard
                        title="Phone"
                        description={hasPhone
                            ? `Call or text ${siteConfig.contact.phone} for time-sensitive coordination if that line has been provided to you.`
                            : 'The public phone line is not published yet. It will be added here once the number is confirmed for guest-facing use.'}
                        actionLabel={hasPhone ? 'Call Now' : undefined}
                        actionHref={hasPhone ? `tel:${siteConfig.contact.phone}` : undefined}
                    />
                </div>
            </LegalSection>

            <LegalSection title="What To Send">
                <p>
                    For faster replies, include your full name, the event you are asking about, and whether your question is about tickets,
                    guest list, membership, venue details, or a Black Card account issue.
                </p>
                <p>
                    If the question is tied to a signup or ticket problem, use the same phone number and email you used during checkout or application.
                </p>
            </LegalSection>

            <LegalSection title="Event Notice">
                <p>
                    LAST NIGHT ENTERTAINMENT events are 18+ unless an event page states otherwise. Valid ID, conduct screening,
                    and final admission decisions remain subject to the <Link href="/terms" className="text-neon-cyan hover:text-static-white transition-colors">Terms and Conditions</Link>.
                </p>
            </LegalSection>
        </LegalPageShell>
    )
}
