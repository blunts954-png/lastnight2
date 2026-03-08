import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell, { LegalSection } from '@/components/LegalPageShell'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
    title: `Privacy Policy | ${siteConfig.name}`,
    description: 'How LAST NIGHT ENTERTAINMENT collects, uses, and protects guest and Black Card member information.',
}

export default function PrivacyPolicyPage() {
    return (
        <LegalPageShell
            eyebrow="Privacy Policy"
            title="How We Handle Guest Information"
            intro={`Effective ${siteConfig.legalEffectiveDate}. This policy explains what information LAST NIGHT ENTERTAINMENT collects, why we collect it, and the limits of how it is used when you browse the site, buy access, or apply for a Black Card.`}
        >
            <LegalSection title="Information We Collect">
                <p>
                    We may collect the information you choose to submit to us, including your full name, phone number,
                    email address, date of birth, ticket details, and any messages you send through our forms or direct contact channels.
                </p>
                <p>
                    We may also collect basic technical information such as device type, browser data, referral pages,
                    and site activity needed to keep the site working, secure forms, and understand demand for events.
                </p>
            </LegalSection>

            <LegalSection title="How We Use It">
                <p>
                    We use submitted information to create and manage Black Card profiles, confirm eligibility for 18+ events,
                    send event updates, respond to questions, improve guest support, and reduce fraud, spam, or abuse.
                </p>
                <p>
                    If you opt in, we may use your email address or phone number for event announcements, reward updates,
                    and limited promotional messaging tied to LAST NIGHT ENTERTAINMENT.
                </p>
            </LegalSection>

            <LegalSection title="Sharing And Confidentiality Limits">
                <p>
                    We do not intentionally sell or rent your personal information. We may share it with service providers
                    who help us operate the site, process memberships, send communications, host infrastructure, or manage event operations.
                </p>
                <p>
                    We may also disclose information when reasonably necessary to enforce our rules, investigate misuse,
                    respond to safety issues, comply with law, or protect guests, staff, partners, or the public.
                </p>
            </LegalSection>

            <LegalSection title="Retention, Security, And Your Choices">
                <p>
                    We keep information only as long as it is reasonably useful for event administration, loyalty tracking,
                    recordkeeping, dispute resolution, or legal compliance. We use practical safeguards, but no website or
                    database can promise absolute security.
                </p>
                <p>
                    You can request updates to submitted contact information or ask to opt out of non-essential marketing messages.
                    To do that, use the <Link href="/contact" className="text-neon-cyan hover:text-static-white transition-colors">contact page</Link>.
                </p>
            </LegalSection>

            <LegalSection title="18 Plus Notice">
                <p>
                    LAST NIGHT ENTERTAINMENT events and Black Card applications are intended for adults. We do not knowingly
                    approve Black Card signups for anyone under 18, and date of birth may be used to verify eligibility.
                </p>
                <p>
                    Liability, admission, and conduct rules are governed separately by our <Link href="/terms" className="text-neon-cyan hover:text-static-white transition-colors">Terms and Conditions</Link>.
                </p>
            </LegalSection>
        </LegalPageShell>
    )
}
