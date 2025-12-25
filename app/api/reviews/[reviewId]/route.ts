import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/session';
import { deleteReview } from '@/lib/supabase/db';

export const dynamic = 'force-dynamic';

// DELETE /api/reviews/[reviewId] - Delete a review
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ reviewId: string }> }
) {
	try {
		const user = await getUser();

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { reviewId } = await params;

		await deleteReview(user.id, reviewId);

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('Error deleting review:', error);
		return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
	}
}
