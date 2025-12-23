/** @type {import('next').NextConfig} */
const nextConfig = {
	// App Router is stable in Next.js 13.4+, no need for experimental flag
	images: {
		domains: ['unsplash.it', 'lh3.googleusercontent.com', 'image.tmdb.org'],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
	},
	
	// Security Headers
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-DNS-Prefetch-Control',
						value: 'on',
					},
					{
						key: 'Strict-Transport-Security',
						value: 'max-age=63072000; includeSubDomains; preload',
					},
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					{
						key: 'Permissions-Policy',
						value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
					},
				],
			},
		];
	},
	
	// Webpack configuration for optimal builds
	webpack: (config, { isServer }) => {
		// Fix for Prisma in edge runtime
		if (isServer) {
			config.externals.push('@prisma/client');
		}
		return config;
	},
};

module.exports = nextConfig;
