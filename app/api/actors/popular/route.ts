import { PeopleDataResponse } from '@/types/tmdb';

// @route GET
// @desc Get popular actors
// @access Public

export async function GET() {
	try {
		const actorsRes = await fetch(
			`https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.TMDB_API_KEY}`
		);

		const MovieDataResponse = (await actorsRes.json()) as PeopleDataResponse;

		return new Response(JSON.stringify(MovieDataResponse.results));
	} catch (error) {
		return new Response('Could not fetch movies.', { status: 500 });
	}
}
