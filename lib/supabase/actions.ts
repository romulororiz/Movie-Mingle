'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

export async function signInWithGoogle() {
	const supabase = await createClient();
	
	// Get the origin from request headers to build correct callback URL
	const headersList = await headers();
	const origin = headersList.get('origin') || headersList.get('referer')?.split('/').slice(0, 3).join('/') || process.env.NEXT_PUBLIC_SITE_URL;
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

