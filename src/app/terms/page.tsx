import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPageShell, { LegalSection } from '@/components/LegalPageShell'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
    title: `Terms And Conditions | ${siteConfig.name}`,
    description: 'Admission rules, ticket terms, refund policy, conduct standards, and liability limits for LAST NIGHT ENTERTAINMENT events.',
}

export default function TermsPage() {
    return (
        <LegalPageShell
            eyebrow="Terms And Conditions"
            title="Rules For Entry, Tickets, And Conduct"
            intro={`Effective ${siteConfig.legalEffectiveDate}. By buying a ticket, joining the Black Card program, or attending a LAST NIGHT ENTERTAINMENT event, you agree to these terms, our posted event rules, and instructions from venue staff or security.`}
        >
            <LegalSection title="Admission And Age Requirements">
                <p>
                    Entry is limited to guests who are 18 or older unless an event listing clearly says otherwise.
                    A valid government-issued photo ID may be required at the door, and admission can be denied if age,
                    identity, or compliance requirements are not satisfied.
                </p>
                <p>
                    Tickets and memberships are revocable privileges, not unconditional guarantees of entry.
                    Capacity, safety concerns, venue rules, and operational needs may affect final admission decisions.
                </p>
            </LegalSection>

            <LegalSection title="Tickets, Pricing, And Refunds">
                <p>
                    All ticket sales are final except where a refund is required by law or an event is canceled by the organizer.
                    Preorder access, member pricing, and promotional offers may change or end without notice before purchase is completed.
                </p>
                <p>
                    If you are denied entry or removed because you violated event rules, presented invalid information,
                    failed ID checks, acted unsafely, or ignored staff instructions, you should expect no refund, credit, or replacement.
                </p>
            </LegalSection>

            <LegalSection title="Conduct, Refusal Of Entry, And Removal">
                <p>
                    LAST NIGHT ENTERTAINMENT and venue security reserve the right to refuse entry, revoke access,
                    or remove any guest for disorderly conduct, harassment, threats, fighting, illegal activity,
                    unsafe intoxication, property damage, discriminatory behavior, or any conduct that disrupts the event.
                </p>
                <p>
                    You may also be removed for ignoring posted rules, violating venue policy, interfering with staff,
                    attempting to transfer or misuse a ticket or membership, or creating an unsafe environment for other guests.
                </p>
            </LegalSection>

            <LegalSection title="Assumption Of Risk And Limited Liability">
                <p>
                    Attendance is voluntary and at your own risk. To the fullest extent allowed by law, LAST NIGHT ENTERTAINMENT,
                    its organizers, staff, contractors, and venue partners are not responsible for injuries, losses, theft,
                    damaged property, missed experiences, transportation issues, or other incidents that may occur in connection with an event.
                </p>
                <p>
                    Nothing in these terms removes liability that cannot legally be limited, but your sole remedy for most event-related
                    disputes will be limited to the amount you actually paid to us for the affected ticket or membership access.
                </p>
            </LegalSection>

            <LegalSection title="Media, Scheduling, And Updates">
                <p>
                    Events may be photographed or recorded. By attending, you grant permission for your likeness to appear in reasonable
                    event recap or promotional media unless prohibited by law.
                </p>
                <p>
                    Lineups, times, locations, room flow, amenities, and event plans may change without notice. Continued use of the site
                    is also subject to our <Link href="/privacy-policy" className="text-neon-cyan hover:text-static-white transition-colors">Privacy Policy</Link>.
                </p>
            </LegalSection>
        </LegalPageShell>
    )
}
