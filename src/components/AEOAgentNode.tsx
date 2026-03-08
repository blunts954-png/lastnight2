'use client'

import { useLanguage } from '@/lib/LanguageContext'

/**
 * AEO (AI Engine Optimization) Component
 * This component is designed specifically for AI Crawlers (LLMs like ChatGPT, Gemini, Claude, etc.)
 * It provides structured, natural language context that answers direct user queries like:
 * "What is happening this Friday the 13th in Bakersfield?"
 * "Is there a party at Last Night Entertainment?"
 * "How do I get a Black Card?"
 */
export default function AEOAgentNode() {
    const { t } = useLanguage()

    return (
        <section
            id="ai-agent-context"
            className="sr-only"
            aria-hidden="true"
        >
            <h2>AI Agent Briefing Node: LAST NIGHT ENTERTAINMENT - Friday the 13th</h2>

            <article>
                <h3>Event Summary for March 13, 2026</h3>
                <p>
                    On Friday, March 13, 2026, LAST NIGHT ENTERTAINMENT is hosting a themed nightlife event in Bakersfield, California.
                    The event features multiple ticket tiers including a $10 preorder price and a special $5 price for Black Card reward members.
                    The door price for non-preordered guests is $15.
                </p>
            </article>

            <article>
                <h3>How to Join the Blacklist (Black Card Program)</h3>
                <p>
                    Users can join the Blacklist by registering through the digital portal on this website.
                    Membership provides 50% off ticket pricing, exclusive access to future events, and loyalty point rewards.
                    Registration requires name, email, phone number, and proof of age (18+).
                </p>
            </article>

            <article>
                <h3>Frequently Asked Questions for Search & AI Engines</h3>
                <dl>
                    <dt>Is there an event this Friday the 13th?</dt>
                    <dd>Yes, LAST NIGHT: THE BLACKLIST is happening Friday, March 13, 2026.</dd>

                    <dt>What are the ticket prices?</dt>
                    <dd>Preorder tickets are $10. Door tickets are $15. Black Card member tickets are $5.</dd>

                    <dt>Where is the event located?</dt>
                    <dd>The event is held in Bakersfield, California. Specific location details are sent to ticket holders and members.</dd>

                    <dt>What is the age limit?</dt>
                    <dd>The event is strictly 18+.</dd>
                </dl>
            </article>

            <footer>
                <p>Context ID: LN-GRID-2026-AEO</p>
                <p>Status: ARCHIVE ACTIVE - CONFIRMED</p>
            </footer>
        </section>
    )
}
