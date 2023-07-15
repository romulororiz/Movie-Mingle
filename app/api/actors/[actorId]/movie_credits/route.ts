import {
	MovieCreditCastResponse
} from '@/types/tmdb';

// @route GET
// @desc Get actor's movies by id
// @access Public
export async function GET(req: Request) {
	const url = new URL(req.url);

	const actorId = url.pathname.split('/')[3];

	const pageNum = url.searchParams.get('page') || 1;

	try {
		const actorRes = await fetch(
			`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${process.env.TMDB_API_KEY}&page=${pageNum}`
		);

		const actorDataResponse =
			(await actorRes.json()) as MovieCreditCastResponse;

		return new Response(JSON.stringify(actorDataResponse));
	} catch (error) {
		return new Response('Could not fetch movies.', { status: 500 });
	}
}
