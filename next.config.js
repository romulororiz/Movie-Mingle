/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['lh3.googleusercontent.com', 'image.tmdb.org'],
	},
};

module.exports = nextConfig;
