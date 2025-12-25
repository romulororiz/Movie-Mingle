import { MovieDetailResponse } from '@/types/tmdb';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { env } from '@/env.mjs';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

// Input validation schemas
const movieIdSchema = z.coerce.number().int().positive();
const pageSchema = z.coerce.number().int().min(1).max(500).default(1);

// @route GET
// @desc Get movie by id
// @access Public
export async function GET(req: Request, { params }: { params: Promise<{ movieId: string }> }) {
	try {
		// Rate limiting
		const ip = getClientIP(req);
		const rateLimitResult = await checkRateLimit(`api:movie:${ip}`);

		if (!rateLimitResult.success && rateLimitResult.response) {
			return rateLimitResult.response;
		}

		const url = new URL(req.url);

		// Await params
		const resolvedParams = await params;

		// Validate movieId
		const movieIdResult = movieIdSchema.safeParse(resolvedParams.movieId);
		if (!movieIdResult.success) {
			return NextResponse.json({ error: 'Invalid movie ID' }, { status: 400 });
		}

		// Validate page parameter
		const pageResult = pageSchema.safeParse(url.searchParams.get('page') || '1');
		if (!pageResult.success) {
			return NextResponse.json({ error: 'Invalid page parameter' }, { status: 400 });
		}

		const movieId = movieIdResult.data;
		const page = pageResult.data;

		const movieRes = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${env.TMDB_API_KEY}&append_to_response=images,videos,credits,similar,recommendations&page=${page}`,
			{
				next: { revalidate: 3600 }, // Cache for 1 hour
			}
		);

		if (!movieRes.ok) {
			if (movieRes.status === 404) {
				return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
			}
			throw new Error(`TMDB API error: ${movieRes.status}`);
		}

		const movieResData = (await movieRes.json()) as MovieDetailResponse;

		// Combine rate limit headers with cache headers
		const headers = new Headers({
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
		});

		if (rateLimitResult.success && rateLimitResult.headers) {
			Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
				headers.set(key, value);
			});
		}

		return NextResponse.json(movieResData, { headers });
	} catch (error) {
		console.error('Movie detail API error:', error);
		return NextResponse.json({ error: 'Failed to fetch movie details' }, { status: 500 });
	}
}
