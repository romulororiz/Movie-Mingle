import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		// Database
		DATABASE_URL: z.string().url(),

		// TMDB API
		TMDB_API_KEY: z.string().min(1),

		// NextAuth
		NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
		NEXTAUTH_URL: z.string().url(),

		// OAuth Providers
		GOOGLE_CLIENT_ID: z.string().min(1),
		GOOGLE_CLIENT_SECRET: z.string().min(1),

		// Node environment
		NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	},

	client: {
		// Public env vars (exposed to client)
		NEXT_PUBLIC_SITE_URL: z.string().url(),
	},

	runtimeEnv: {
		// Server
		DATABASE_URL: process.env.DATABASE_URL,
		TMDB_API_KEY: process.env.TMDB_API_KEY,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
		GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
		NODE_ENV: process.env.NODE_ENV,

		// Client
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
	},

	// Skip validation during build if explicitly set
	skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});
