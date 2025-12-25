import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/supabase/session';
import { getMovieReviews, upsertReview, getUserMovieReview } from '@/lib/supabase/db';

export const dynamic = 'force-dynamic';

// GET /api/reviews?movieId=xxx - Get all reviews for a movie
// GET /api/reviews?movieId=xxx&userId=xxx - Get user's review for a movie
export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const movieId = searchParams.get('movieId');
		const userId = searchParams.get('userId');

		if (!movieId) {
			return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
		}

		if (userId) {
			// Get specific user's review
			const review = await getUserMovieReview(userId, movieId);
			return NextResponse.json(review);
		}

		// Get all reviews for movie
		const reviews = await getMovieReviews(movieId);
		return NextResponse.json(reviews);
	} catch (error) {
		console.error('Error fetching reviews:', error);
		return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
	}
}

// POST /api/reviews - Create or update a review
export async function POST(request: NextRequest) {
	try {
		const user = await getUser();

		if (!user) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		}

		const body = await request.json() as {
			movieId?: string;
			movieTitle?: string;
			moviePoster?: string | null;
			rating?: number;
			content?: string;
		};
		const { movieId, movieTitle, moviePoster, rating, content } = body;

		if (!movieId || !movieTitle || !rating || !content) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		if (rating < 1 || rating > 5) {
			return NextResponse.json({ error: 'Rating must be between 1 and 5' }, { status: 400 });
		}

		if (content.length < 10) {
			return NextResponse.json({ error: 'Review must be at least 10 characters' }, { status: 400 });
		}

		const review = await upsertReview(
			user.id,
			movieId,
			movieTitle,
			moviePoster || null,
			rating,
			content
		);

		return NextResponse.json(review);
	} catch (error) {
		console.error('Error creating review:', error);
		return NextResponse.json({ error: 'Failed to create review' }, { status: 500 });
	}
}

