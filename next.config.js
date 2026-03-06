/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
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
