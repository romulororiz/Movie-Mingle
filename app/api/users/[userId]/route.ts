import { NextRequest, NextResponse } from 'next/server';
import { getPublicUser, getUserReviews, getFriendshipStatus } from '@/lib/supabase/db';
import { getUser } from '@/lib/supabase/session';

export const dynamic = 'force-dynamic';

// GET /api/users/[userId] - Get public user profile
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ userId: string }> }
) {
	try {
		const { userId } = await params;
		const currentUser = await getUser();

		const user = await getPublicUser(userId);

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Get user's reviews
		const reviews = await getUserReviews(userId);

		// Get friendship status if logged in
		let friendshipStatus = null;
		if (currentUser && currentUser.id !== userId) {
			friendshipStatus = await getFriendshipStatus(currentUser.id, userId);
		}

		return NextResponse.json({
			user,
			reviews,
			friendshipStatus,
			isOwnProfile: currentUser?.id === userId,
		});
	} catch (error) {
		console.error('Error fetching user:', error);
		return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
	}
}
