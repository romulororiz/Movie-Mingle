/** @type {import('next').NextConfig} */
const nextConfig = {
	// Performance optimizations
	poweredByHeader: false,
	compress: true,
	reactStrictMode: true,

	// Turbopack configuration (empty object enables it with default settings)
	turbopack: {},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'unsplash.it',
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'image.tmdb.org',
			},
		],
		formats: ['image/avif', 'image/webp'],
		deviceSizes: [640, 750, 828, 1080, 1200, 1920],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		minimumCacheTTL: 31536000, // 1 year for TMDB images
		dangerouslyAllowSVG: true,
		contentDispositionType: 'inline',
	},

	// Compiler optimizations
	compiler: {
		removeConsole:
			process.env.NODE_ENV === 'production'
				? {
						exclude: ['error', 'warn'],
				  }
				: false,
	},

	// Security & Performance Headers
	async headers() {
		return [
			{
				source: '/:path*',
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
						value: 'camera=(), microphone=(), geolocation=()',
					},
				],
			},
			{
				source: '/api/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, s-maxage=3600, stale-while-revalidate=86400',
					},
				],
			},
			{
				source: '/_next/image',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
			{
				source: '/_next/static/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
