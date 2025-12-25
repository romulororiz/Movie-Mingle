import { NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/session';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
import { syncUser } from '@/lib/sync-user';
import { deleteBookmark, isMovieBookmarked } from '@/lib/supabase/db';

// @route DELETE
// @desc Remove a bookmark
// @access Private
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ movieId: string }> | { movieId: string } }
) {
	try {
		// Rate limiting
		const ip = getClientIP(request);
		const rateLimitResult = await checkRateLimit(`api:bookmarks:${ip}`);

		if (!rateLimitResult.success && rateLimitResult.response) {
			return rateLimitResult.response;
		}

		// Check authentication
		const user = await getUser();

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		// Sync user to database if not exists
		await syncUser(user);

		// Handle both Promise and direct params (Next.js 13 vs 15)
		const resolvedParams = params instanceof Promise ? await params : params;
		const { movieId } = resolvedParams;

		// Check if bookmark exists
		const bookmarkExists = await isMovieBookmarked(user.id, movieId.toString());

		if (!bookmarkExists) {
			return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
		}

		// Delete the bookmark (genres will be deleted automatically via CASCADE)
		await deleteBookmark(user.id, movieId.toString());

		return NextResponse.json({ message: 'Bookmark removed successfully', success: true });
	} catch (error) {
		console.error('Delete bookmark error:', error);
		const errorMessage = error instanceof Error ? error.message : 'Failed to delete bookmark';
		return NextResponse.json(
			{ error: errorMessage, details: error instanceof Error ? error.stack : undefined },
			{ status: 500 }
		);
	}
}

// @route GET
// @desc Check if movie is bookmarked
// @access Private
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ movieId: string }> | { movieId: string } }
) {
	try {
		// Check authentication
		const user = await getUser();

		if (!user) {
			return NextResponse.json({ isBookmarked: false });
		}

		// Sync user to database if not exists
		await syncUser(user);

		// Handle both Promise and direct params (Next.js 13 vs 15)
		const resolvedParams = params instanceof Promise ? await params : params;
		const { movieId } = resolvedParams;

		// Check if bookmark exists
		const bookmarked = await isMovieBookmarked(user.id, movieId.toString());

		return NextResponse.json({ isBookmarked: bookmarked });
	} catch (error) {
		console.error('Check bookmark error:', error);
		return NextResponse.json({ isBookmarked: false });
	}
}

