export const translations = {
    en: {
        nav: {
            event: "FRIDAY 13TH",
            tickets: "TICKETS",
            blacklist: "BLACK CARD",
            myCard: "MY CARD",
            pastEvents: "PAST EVENTS"
        },
        hero: {
            tagline: "THE NIGHT YOU'LL NEVER FORGET",
            heading: "FRIDAY THE 13TH",
            cta: "JOIN THE BLACKLIST"
        },
        tickets: {
            title: "PICK YOUR ACCESS",
            subtitle: "Two ways in for Friday the 13th. Preorder at $10, or unlock the $5 Black Card member ticket.",
            preorderRemaining: "ONLY {count} PREORDERS REMAINING",
            cardsIssued: "{count} CARDS ISSUED LAST HOUR",
            preorderLabel: "Preorder for $10",
            claimTicket: "Claim $5 Ticket",
            signUp: "Sign Up for Black Card",
            features: {
                guaranteed: "Guaranteed entry",
                limited: "Limited online preorder allocation",
                doorPrice: "$15 at the door if not preordered",
                memberPrice: "Only $5 ticket after Black Card signup",
                lockedIn: "50% off preorder pricing locked in",
                exclusive: "Member-only offers and updates"
            }
        },
        event: {
            chaos: "Embrace the Chaos.",
            description: "This isn't superstition; it's a spectacle. Step into a night where the ordinary is excised and the extraordinary takes control. Friday, March 13, 2026 is your next entry point.",
            features: [
                {
                    title: 'Sonic Immersion',
                    description: 'State-of-the-art sound system delivering bass that resonates through your soul'
                },
                {
                    title: 'Visual Theatre',
                    description: 'Immersive lighting and projection mapping that transforms reality'
                },
                {
                    title: 'Selective Entry',
                    description: 'Limited capacity ensures an intimate, exclusive experience'
                }
            ]
        },
        blacklist: {
            label: "Exclusive Access",
            title: "LAST NIGHT ENTERTAINMENT",
            description: "The Blacklist is our exclusive loyalty program. Members receive priority entry, discounted tickets, and a digital membership card that lives in their phone wallet.",
            cta: "Apply for Membership",
            benefits: [
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
            ],
            disclaimer: "* Membership is selective. Not all applications are approved. Applicants must be 18 or older, and previous attendance or online presence may be considered."
        },
        footer: {
            privacy: "Privacy",
            terms: "Terms",
            contact: "Contact",
            rights: "All rights reserved.",
            designedBy: "Designed by"
        },
        splash: {
            systemReload: "System Reload",
            secure: "100% Secure",
            statuses: [
                'INITIALIZING...',
                'UPLOADING VIBES...',
                'DECRYPTING ACCESS...',
                'CALIBRATING LASERS...',
                'ARE YOU READY?'
            ]
        }
    },
    es: {
        nav: {
            event: "VIERNES 13",
            tickets: "BOLETOS",
            blacklist: "TARJETA NEGRA",
            myCard: "MI TARJETA",
            pastEvents: "EVENTOS PASADOS"
        },
        hero: {
            tagline: "LA NOCHE QUE NUNCA OLVIDARÁS",
            heading: "VIERNES 13",
            cta: "ÚNETE A LA LISTA NEGRA"
        },
        tickets: {
            title: "ELIGE TU ACCESO",
            subtitle: "Dos formas de entrar para el viernes 13. Pre-venta a $10, o desbloquea el boleto de miembro de Tarjeta Negra de $5.",
            preorderRemaining: "SOLO QUEDAN {count} PRE-VENTAS",
            cardsIssued: "{count} TARJETAS EMITIDAS LA ÚLTIMA HORA",
            preorderLabel: "Pre-venta por $10",
            claimTicket: "Reclamar Boleto de $5",
            signUp: "Regístrate para la Tarjeta Negra",
            features: {
                guaranteed: "Entrada garantizada",
                limited: "Cupo limitado de pre-venta en línea",
                doorPrice: "$15 en puerta si no es pre-venta",
                memberPrice: "Boleto de solo $5 tras registro",
                lockedIn: "50% de descuento asegurado",
                exclusive: "Ofertas y noticias exclusivas"
            }
        },
        event: {
            chaos: "Abraza el Caos.",
            description: "No es superstición; es un espectáculo. Entra en una noche donde lo ordinario se elimina y lo extraordinario toma el control. Viernes 13 de marzo de 2026 es tu próximo punto de entrada.",
            features: [
                {
                    title: 'Inmersión Sónica',
                    description: 'Sistema de sonido de vanguardia con graves que resuenan en tu alma'
                },
                {
                    title: 'Teatro Visual',
                    description: 'Iluminación inmersiva y mapping que transforma la realidad'
                },
                {
                    title: 'Entrada Selectiva',
                    description: 'Capacidad limitada que asegura una experiencia íntima y exclusiva'
                }
            ]
        },
        blacklist: {
            label: "Acceso Exclusivo",
            title: "LAST NIGHT ENTERTAINMENT",
            description: "La Lista Negra es nuestro programa exclusivo de lealtad. Los miembros reciben entrada prioritaria, boletos con descuento y una tarjeta de membresía digital en su teléfono.",
            cta: "Solicitar Membresía",
            benefits: [
                {
                    title: 'Entrada Prioritaria',
                    description: 'Próximamente.'
                },
                {
                    title: 'Precios para Miembros',
                    description: 'Desbloquea el boleto de miembro de $5 para el Viernes 13'
                },
                {
                    title: 'Tarjeta Digital',
                    description: 'Agregar a Apple/Google Wallet'
                },
                {
                    title: 'Puntos de Lealtad',
                    description: 'Próximamente.'
                }
            ],
            disclaimer: "* La membresía es selectiva. No todas las solicitudes son aprobadas. Los solicitantes deben ser mayores de 18 años, y se puede considerar la asistencia previa o presencia en línea."
        },
        footer: {
            privacy: "Privacidad",
            terms: "Términos",
            contact: "Contacto",
            rights: "Todos los derechos reservados.",
            designedBy: "Diseñado por"
        },
        splash: {
            systemReload: "Reiniciando Sistema",
            secure: "100% Seguro",
            statuses: [
                'INICIALIZANDO...',
                'SUBIENDO VIBRAS...',
                'DECODIFICANDO ACCESO...',
                'CALIBRANDO LÁSERES...',
                '¿ESTÁS LISTO?'
            ]
        }
    }
};

export type Language = 'en' | 'es';
