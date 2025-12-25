import { createClient } from '@/lib/supabase/server';
import { syncUser } from '@/lib/sync-user';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');
	const origin = requestUrl.origin;

	if (code) {
		const supabase = await createClient();
		const { data, error } = await supabase.auth.exchangeCodeForSession(code);

		if (error) {
			console.error('Error exchanging code for session:', error);
			return NextResponse.redirect(`${origin}/auth/error`);
		}

		// Sync user to database after successful authentication
		if (data.user) {
			await syncUser(data.user);
		}
	}

	// URL to redirect to after sign in process completes
	return NextResponse.redirect(`${origin}/`);
}
