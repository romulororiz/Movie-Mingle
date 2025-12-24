import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getUser } from '@/lib/supabase/session';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
import { syncUser } from '@/lib/sync-user';

// Validation schema for creating a bookmark
const bookmarkSchema = z.object({
	movieId: z.string().min(1),
	title: z.string().min(1),
	overview: z.string(),
	posterPath: z.string().nullable(),
	backdropPath: z.string().nullable(),
	originalLang: z.string(),
	releaseDate: z.string().transform((str) => new Date(str)),
	voteAverage: z.number(),
	originalTitle: z.string(),
	genres: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
		})
	),
});

// @route GET
// @desc Get user's bookmarks
// @access Private
export async function GET(request: Request) {
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

		// Get user's bookmarks
		const bookmarks = await prisma.bookmark.findMany({
			where: {
				userId: user.id,
			},
			include: {
				genres: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return NextResponse.json(bookmarks);
	} catch (error) {
		console.error('Get bookmarks error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch bookmarks' },
			{ status: 500 }
		);
	}
}

// @route POST
// @desc Add a bookmark
// @access Private
export async function POST(request: Request) {
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

		// Parse and validate request body
		const body = await request.json();
		const result = bookmarkSchema.safeParse(body);

		if (!result.success) {
			return NextResponse.json(
				{ error: 'Invalid request data', details: result.error.flatten() },
				{ status: 400 }
			);
		}

		const data = result.data;

		// Check if bookmark already exists
		const existing = await prisma.bookmark.findUnique({
			where: {
				movieId_userId: {
					movieId: data.movieId,
					userId: user.id,
				},
			},
		});

		if (existing) {
			return NextResponse.json(
				{ error: 'Movie already bookmarked' },
				{ status: 409 }
			);
		}

		// Create bookmark with genres
		const bookmark = await prisma.bookmark.create({
			data: {
				userId: user.id,
				movieId: data.movieId,
				title: data.title,
				overview: data.overview,
				posterPath: data.posterPath,
				backdropPath: data.backdropPath,
				originalLang: data.originalLang,
				releaseDate: data.releaseDate,
				voteAverage: data.voteAverage,
				originalTitle: data.originalTitle,
				genres: {
					create: data.genres.map((genre) => ({
						genreId: genre.id,
						name: genre.name,
					})),
				},
			},
			include: {
				genres: true,
			},
		});

		return NextResponse.json(bookmark, { status: 201 });
	} catch (error) {
		console.error('Create bookmark error:', error);
		return NextResponse.json(
			{ error: 'Failed to create bookmark' },
			{ status: 500 }
		);
	}
}

