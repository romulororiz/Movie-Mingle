import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/session';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

// @route DELETE
// @desc Remove a bookmark
// @access Private
export async function DELETE(
	request: Request,
	{ params }: { params: { movieId: string } }
) {
	try {
		// Rate limiting
		const ip = getClientIP(request);
		const rateLimitResult = await checkRateLimit(`api:bookmarks:${ip}`);

		if (!rateLimitResult.success && rateLimitResult.response) {
			return rateLimitResult.response;
		}

		// Check authentication
		const user = await getCurrentUser();

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const { movieId } = params;

		// Check if bookmark exists
		const bookmark = await prisma.bookmark.findUnique({
			where: {
				movieId_userId: {
					movieId,
					userId: user.id,
				},
			},
		});

		if (!bookmark) {
			return NextResponse.json({ error: 'Bookmark not found' }, { status: 404 });
		}

		// Delete bookmark (genres will be deleted automatically via cascade)
		await prisma.bookmark.delete({
			where: {
				id: bookmark.id,
			},
		});

		return NextResponse.json({ message: 'Bookmark removed successfully' });
	} catch (error) {
		console.error('Delete bookmark error:', error);
		return NextResponse.json(
			{ error: 'Failed to delete bookmark' },
			{ status: 500 }
		);
	}
}

// @route GET
// @desc Check if movie is bookmarked
// @access Private
export async function GET(
	request: Request,
	{ params }: { params: { movieId: string } }
) {
	try {
		// Check authentication
		const user = await getCurrentUser();

		if (!user) {
			return NextResponse.json({ isBookmarked: false });
		}

		const { movieId } = params;

		// Check if bookmark exists
		const bookmark = await prisma.bookmark.findUnique({
			where: {
				movieId_userId: {
					movieId,
					userId: user.id,
				},
			},
		});

		return NextResponse.json({ isBookmarked: !!bookmark });
	} catch (error) {
		console.error('Check bookmark error:', error);
		return NextResponse.json({ isBookmarked: false });
	}
}

