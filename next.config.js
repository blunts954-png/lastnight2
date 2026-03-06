/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    transpilePackages: ['firebase', '@firebase/app', '@firebase/auth', '@firebase/component', '@firebase/firestore', '@firebase/storage', '@firebase/util'],
    images: {
        unoptimized: true,
        domains: ['firebasestorage.googleapis.com'],
    },
    webpack: (config) => {
        config.externals = [...(config.externals || []), { canvas: 'canvas' }];
        return config;
    },
}

module.exports = nextConfig
