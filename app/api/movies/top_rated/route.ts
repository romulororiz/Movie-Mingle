import { MovieDataResponse } from '@/types/tmdb';

// @route GET
// @desc Get top rated movies
// @access Public
export async function GET() {
	try {
		const movieRes = await fetch(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`
		);

		const MovieDataResponse = (await movieRes.json()) as MovieDataResponse;

		return new Response(JSON.stringify(MovieDataResponse));
	} catch (error) {
		return new Response('Could not fetch movies.', { status: 500 });
	}
}
