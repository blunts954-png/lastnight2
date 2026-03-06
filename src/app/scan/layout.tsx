import { Viewport, Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Scanner | LAST NIGHT ENTERTAINMENT',
    description: 'Internal tool for door staff.',
    robots: {
        index: false,
        follow: false,
    },
}

export const viewport: Viewport = {
    themeColor: '#000000',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function ScanLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
