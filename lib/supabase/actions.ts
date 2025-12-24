'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function signInWithGoogle() {
	const supabase = await createClient();

	// Build the correct callback URL based on environment
	const headersList = await headers();
	const host = headersList.get('x-forwarded-host') || headersList.get('host');
	const protocol = headersList.get('x-forwarded-proto') || 'https';

	// Construct the origin: use host from headers, fallback to env var
	let origin: string;
	if (host) {
		// In production (Vercel), x-forwarded-host will be movie-mingle.vercel.app
		origin = `${protocol}://${host}`;
	} else {
		// Fallback to environment variable
		origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
	}

	const redirectTo = `${origin}/auth/callback`;

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo,
		},
	});

	if (error) {
		console.error('Error signing in with Google:', error);
		redirect('/error');
	}

	if (data.url) {
		redirect(data.url);
	}
}

export async function signOut() {
	const supabase = await createClient();
	await supabase.auth.signOut();
	revalidatePath('/', 'layout');
	redirect('/');
}
