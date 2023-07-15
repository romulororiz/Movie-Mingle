/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ['unsplash.it', 'lh3.googleusercontent.com', 'image.tmdb.org'],
	},
};

module.exports = nextConfig;
