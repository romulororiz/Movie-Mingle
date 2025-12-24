import { prisma } from '@/lib/db';
import type { User as SupabaseUser } from '@supabase/supabase-js';

/**
 * Sync Supabase user with Prisma database
 * Creates or updates user record in Prisma when they sign in
 */
export async function syncUser(supabaseUser: SupabaseUser) {
	try {
		const existingUser = await prisma.user.findUnique({
			where: { id: supabaseUser.id },
		});

		if (!existingUser) {
			// Create new user
			await prisma.user.create({
				data: {
					id: supabaseUser.id,
					email: supabaseUser.email!,
					name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || null,
					avatarUrl: supabaseUser.user_metadata?.avatar_url || null,
				},
			});
		} else {
			// Update user info if changed
			await prisma.user.update({
				where: { id: supabaseUser.id },
				data: {
					email: supabaseUser.email!,
					name: supabaseUser.user_metadata?.full_name || existingUser.name,
					avatarUrl: supabaseUser.user_metadata?.avatar_url || existingUser.avatarUrl,
				},
			});
		}
	} catch (error) {
		console.error('Error syncing user:', error);
		// Don't throw - we don't want to break the app if sync fails
	}
}

