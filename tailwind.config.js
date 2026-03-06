/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'pitch-black': '#000000',
                'deep-space': '#05020a',
                'neon-purple': '#b026ff',
                'electric-indigo': '#8A2BE2',
                'neon-cyan': '#00f0ff',
                'static-white': '#FFFFFF',
                'cold-gray': '#A0A0A0',
                'matrix-green': '#00FF41',
                'alert-red': '#FF3333',
                'ethereal-white': 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                'monument': ['Monument Extended', 'Archivo Black', 'sans-serif'],
                'inter': ['Inter', 'sans-serif'],
                'mono': ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
                'serif': ['ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
            },
            animation: {
                'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
                'float': 'float 6s ease-in-out infinite',
                'shimmer': 'shimmer 3s ease-in-out infinite',
                'marquee': 'marquee 25s linear infinite',
            },
            keyframes: {
                'pulse-glow': {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(176, 38, 255, 0.5), 0 0 40px rgba(176, 38, 255, 0.3)' },
                    '50%': { boxShadow: '0 0 30px rgba(176, 38, 255, 0.8), 0 0 60px rgba(176, 38, 255, 0.5)' },
                },
                'float': {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'shimmer': {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                'marquee': {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-100%)' },
                }
            },
            backdropBlur: {
                'glass': '20px',
            },
        },
    },
    plugins: [],
}
