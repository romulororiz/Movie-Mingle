import { SearchData } from '@/types/tmdb';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { env } from '@/env.mjs';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

// Mark route as dynamic to prevent static generation
export const dynamic = 'force-dynamic';

// Input validation schema
const searchSchema = z.object({
	q: z.string().min(1).max(100).trim(),
	page: z.coerce.number().int().min(1).max(500).default(1),
});

// @route GET
// @desc Search for movies, tv shows, and people
// @access Public
export async function GET(request: Request) {
	try {
		// Rate limiting
		const ip = getClientIP(request);
		const rateLimitResult = await checkRateLimit(`api:search:${ip}`);

		if (!rateLimitResult.success && rateLimitResult.response) {
			return rateLimitResult.response;
		}

		const url = new URL(request.url);
		
		// Validate input
		const result = searchSchema.safeParse({
			q: url.searchParams.get('q'),
			page: url.searchParams.get('page') || '1',
		});

		if (!result.success) {
			return NextResponse.json(
				{ 
					error: 'Invalid request parameters', 
					details: result.error.flatten().fieldErrors 
				},
				{ status: 400 }
			);
		}

		const { q, page } = result.data;

		// Fetch from TMDB API
		const searchRes = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${env.TMDB_API_KEY}&query=${encodeURIComponent(q)}&include_adult=false&language=en-US&page=${page}`,
			{
				next: { revalidate: 3600 }, // Cache for 1 hour
			}
		);

		if (!searchRes.ok) {
			throw new Error(`TMDB API error: ${searchRes.status}`);
		}

		const searchResData = (await searchRes.json()) as SearchData;

		// Combine rate limit headers with cache headers
		const headers = new Headers({
			'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
		});

		if (rateLimitResult.success && rateLimitResult.headers) {
			Object.entries(rateLimitResult.headers).forEach(([key, value]) => {
				headers.set(key, value);
			});
		}

		return NextResponse.json(searchResData, { headers });
	} catch (error) {
		console.error('Search API error:', error);
		return NextResponse.json(
			{ error: 'Failed to fetch search results' },
			{ status: 500 }
		);
	}
}
