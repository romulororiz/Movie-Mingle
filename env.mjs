import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		// Database
		DATABASE_URL: z.string().url(),

		// TMDB API
		TMDB_API_KEY: z.string().min(1),

		// Node environment
		NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	},

	client: {
		// Public env vars (exposed to client)
		NEXT_PUBLIC_SITE_URL: z.string().url(),
		NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
		NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY: z.string().min(1),
	},

	runtimeEnv: {
		// Server
		DATABASE_URL: process.env.DATABASE_URL,
		TMDB_API_KEY: process.env.TMDB_API_KEY,
		NODE_ENV: process.env.NODE_ENV,

		// Client
		NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	},

	// Skip validation during build if explicitly set
	skipValidation: process.env.SKIP_ENV_VALIDATION === 'true',
});
