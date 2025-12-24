import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@/lib/db';
import { env } from '@/env.mjs';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	// Using default NextAuth pages (no custom login page needed)
	// Use request origin in development, env var in production
	useSecureCookies: env.NEXTAUTH_URL.startsWith('https://'),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code',
				},
			},
		}),
	],
	callbacks: {
		session({ token, session }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
			}
			return session;
		},
		async jwt({ token, user }) {
			// Initial sign in
			if (user) {
				token.id = user.id;
				return token;
			}

			// Return previous token if user still exists
			const dbUser = await prisma.user.findFirst({
				where: { email: token.email },
			});

			if (!dbUser) {
				// User deleted, force sign out - return token with null id
				return { ...token, id: null } as unknown as typeof token;
			}

			return {
				...token,
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				picture: dbUser.image,
			};
		},
		async redirect({ url, baseUrl }) {
			// If URL contains an error, redirect to home with error message
			if (url.includes('error=')) {
				// Extract error type for better debugging
				const errorMatch = url.match(/error=([^&]+)/);
				if (errorMatch) {
					console.error('OAuth error:', errorMatch[1]);
				}
				return baseUrl;
			}
			// If URL is the signin page, redirect to home
			if (url.includes('/login') || url.includes('/api/auth/signin')) {
				return baseUrl;
			}
			// Allows relative callback URLs
			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;
			// Default to home page
			return baseUrl;
		},
	},
	events: {
		async signIn({ user, account, profile, isNewUser }) {
			// Log sign-in events for security monitoring
			console.info(`User signed in: ${user.email}`, { isNewUser, provider: account?.provider });
		},
	},
	// Enable debug in production temporarily to see OAuth errors in Vercel logs
	debug: true,
};
