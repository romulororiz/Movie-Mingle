import { PeopleDataResponse } from '@/types/tmdb';

// @route GET
// @desc Get popular actors
// @access Public

export async function GET(req: Request) {
	const url = new URL(req.url);

	const pageNum = url.searchParams.get('page') || 1;
	
	try {
		const actorsRes = await fetch(
			`https://api.themoviedb.org/3/trending/person/day?api_key=${process.env.TMDB_API_KEY}&page=${pageNum}`
		);

		const actorDataResponse = (await actorsRes.json()) as PeopleDataResponse;

		return new Response(JSON.stringify(actorDataResponse));
	} catch (error) {
		return new Response('Could not fetch movies.', { status: 500 });
	}
}
