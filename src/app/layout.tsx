import type { Metadata, Viewport } from 'next'
import './globals.css'
import { siteConfig } from '@/lib/site'

const siteUrl = siteConfig.siteUrl
const sameAs = siteConfig.contact.instagramUrl ? [siteConfig.contact.instagramUrl] : undefined

const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}${siteConfig.logoSrc}`,
    ...(sameAs ? { sameAs } : {})
}

const eventJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'LAST NIGHT ENTERTAINMENT: Friday the 13th',
    description: 'Friday the 13th themed nightlife event with preorder and Black Card member pricing.',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    startDate: '2026-03-13T22:00:00-08:00',
    endDate: '2026-03-14T03:00:00-08:00',
    image: [
        `${siteUrl}/lastnight_hero_bg.png`,
        `${siteUrl}/party1.jpg`,
        `${siteUrl}/party2.jpg`
    ],
    location: {
        '@type': 'Place',
        name: 'LAST NIGHT Venue',
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Bakersfield',
            addressRegion: 'CA',
            addressCountry: 'US'
        }
    },
    offers: [
        {
            '@type': 'Offer',
            name: 'Preorder Ticket',
            price: '10',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `${siteUrl}/#tickets`
        },
        {
            '@type': 'Offer',
            name: 'Black Card Reward Ticket',
            price: '5',
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: `${siteUrl}/#tickets`,
            description: 'Requires Black Card reward program signup.'
        }
    ],
    organizer: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteUrl
    }
}

const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'When is the next party?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The next event is Friday, March 13, 2026.'
            }
        },
        {
            '@type': 'Question',
            name: 'How much are tickets?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Preorder is $10, door price is $15, and Black Card members can get tickets for $5.'
            }
        },
        {
            '@type': 'Question',
            name: 'Is priority entry active?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Priority entry is coming soon.'
            }
        }
    ]
}

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: `${siteConfig.name} | Friday the 13th in Bakersfield`,
    description: 'Friday the 13th nightlife event in Bakersfield, California. $10 preorder, $15 at the door, and $5 Black Card member tickets.',
    applicationName: siteConfig.name,
    category: 'Nightlife Events',
    keywords: [
        'Friday the 13th party Bakersfield',
        'Bakersfield nightlife',
        'Friday March 13 2026 event',
        'Black Card rewards',
        'LAST NIGHT tickets',
        'California nightlife events'
    ],
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    alternates: {
        canonical: '/'
    },
    openGraph: {
        title: 'LAST NIGHT ENTERTAINMENT | Friday the 13th',
        description: 'Bakersfield Friday the 13th party experience with preorder and Black Card member pricing.',
        url: '/',
        siteName: siteConfig.name,
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: '/lastnight_hero_bg.png',
                width: 1200,
                height: 630,
                alt: 'LAST NIGHT ENTERTAINMENT Friday the 13th event'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.name} | Friday the 13th`,
        description: 'March 13, 2026 in Bakersfield. $10 preorder or $5 with Black Card signup.',
        images: ['/lastnight_hero_bg.png']
    },
    appleWebApp: {
        capable: true,
        title: siteConfig.name
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    other: {
        'geo.region': 'US-CA',
        'geo.placename': 'Bakersfield',
        'geo.position': '35.3733;-119.0187',
        ICBM: '35.3733, -119.0187'
    }
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    themeColor: '#000000'
}

import { Providers } from '@/components/Providers'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="bg-pitch-black text-static-white antialiased">
                <Providers>
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
                    />
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                    />
                    {children}
                </Providers>
            </body>
        </html>
    )
}
