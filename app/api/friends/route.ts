import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/session';
import { sendFriendRequest, getFriendRequests, getUserFriends } from '@/lib/supabase/db';

export const dynamic = 'force-dynamic';

// GET /api/friends - Get friend requests and friends
export async function GET(request: NextRequest) {
	try {
		const user = await getUser();

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const [requests, friends] = await Promise.all([
			getFriendRequests(user.id),
			getUserFriends(user.id),
		]);

		// Separate pending requests into incoming and outgoing
		const pendingIncoming = requests.filter(
			(r) => r.status === 'pending' && r.addressee_id === user.id
		);
		const pendingOutgoing = requests.filter(
			(r) => r.status === 'pending' && r.requester_id === user.id
		);

		return NextResponse.json({
			friends,
			pendingIncoming,
			pendingOutgoing,
		});
	} catch (error) {
		console.error('Error fetching friends:', error);
		return NextResponse.json({ error: 'Failed to fetch friends' }, { status: 500 });
	}
}

// POST /api/friends - Send friend request
export async function POST(request: NextRequest) {
	try {
		const user = await getUser();

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = await request.json() as { addresseeId?: string };
		const { addresseeId } = body;

		if (!addresseeId) {
			return NextResponse.json({ error: 'Addressee ID is required' }, { status: 400 });
		}

		if (addresseeId === user.id) {
			return NextResponse.json({ error: 'Cannot send friend request to yourself' }, { status: 400 });
		}

		const request_ = await sendFriendRequest(user.id, addresseeId);

		return NextResponse.json(request_);
	} catch (error: any) {
		console.error('Error sending friend request:', error);
		if (error.message === 'Friend request already exists') {
			return NextResponse.json({ error: error.message }, { status: 400 });
		}
		return NextResponse.json({ error: 'Failed to send friend request' }, { status: 500 });
	}
}

