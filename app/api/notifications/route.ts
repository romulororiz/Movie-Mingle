import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/session';
import { getSupabaseDb } from '@/lib/supabase/db';

export const dynamic = 'force-dynamic';

export interface NotificationCounts {
	friendRequests: number;
	totalUnread: number;
}

// GET /api/notifications - Get notification counts
export async function GET(request: NextRequest) {
	try {
		const user = await getUser();

		if (!user) {
			return NextResponse.json({ friendRequests: 0, totalUnread: 0 });
		}

		const supabase = await getSupabaseDb();

		// Get pending friend requests count (where user is the addressee)
		const { count: friendRequestsCount } = await supabase
			.from('friend_requests')
			.select('*', { count: 'exact', head: true })
			.eq('addressee_id', user.id)
			.eq('status', 'pending');

		const counts: NotificationCounts = {
			friendRequests: friendRequestsCount || 0,
			totalUnread: friendRequestsCount || 0,
		};

		return NextResponse.json(counts);
	} catch (error) {
		console.error('Error fetching notifications:', error);
		return NextResponse.json({ friendRequests: 0, totalUnread: 0 });
	}
}

