import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/session';
import { updateFriendRequest } from '@/lib/supabase/db';

export const dynamic = 'force-dynamic';

// PUT /api/friends/[requestId] - Accept or reject friend request
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ requestId: string }> }
) {
	try {
		const user = await getUser();

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = (await request.json()) as { status?: string };
		const { status } = body;

		if (!status || !['accepted', 'rejected'].includes(status)) {
			return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
		}

		const { requestId } = await params;

		const updated = await updateFriendRequest(
			requestId,
			user.id,
			status as 'accepted' | 'rejected'
		);

		return NextResponse.json(updated);
	} catch (error) {
		console.error('Error updating friend request:', error);
		return NextResponse.json({ error: 'Failed to update friend request' }, { status: 500 });
	}
}
