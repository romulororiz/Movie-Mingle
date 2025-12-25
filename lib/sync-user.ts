import { syncUser as syncUserToDb } from '@/lib/supabase/db';
import type { User as SupabaseUser } from '@supabase/supabase-js';

/**
 * Sync Supabase user with database
 * Creates or updates user record when they sign in
 */
export async function syncUser(supabaseUser: SupabaseUser) {
	try {
		await syncUserToDb(
			supabaseUser.id,
			supabaseUser.email || null,
			supabaseUser.user_metadata
		);
	} catch (error) {
		console.error('Error syncing user:', error);
		// Don't throw - we don't want to break the app if sync fails
	}
}

