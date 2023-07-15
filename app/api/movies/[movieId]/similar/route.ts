import { MovieDataResponse, MovieDetailResponse } from '@/types/tmdb';

// @route GET
// @desc Get movie's similar movies by id
// @access Public
export async function GET(req: Request) {
	const url = new URL(req.url);

	const movieId = url.pathname.split('/')[3];

	const pageNum = url.searchParams.get('page') || 1;

	try {
		const movieRes = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.TMDB_API_KEY}&page=${pageNum}`
		);

		const movieResData = (await movieRes.json()) as MovieDataResponse;

		return new Response(JSON.stringify(movieResData));
	} catch (error) {
		return new Response('Could not fetch movies.', { status: 500 });
	}
}
