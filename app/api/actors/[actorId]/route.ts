import { PeopleDataResponse } from '@/types/tmdb';

// @route GET
// @desc Get actor by id
// @access Public
export async function GET(req: Request) {
	const url = new URL(req.url);

	const actorId = url.pathname.split('/')[3];

	try {
		const actorRes = await fetch(
			`https://api.themoviedb.org/3/person/${actorId}?api_key=${process.env.TMDB_API_KEY}&append_to_response=images,videos,movie_credits,tv_credits`
		);

		const actorDataResponse = (await actorRes.json()) as PeopleDataResponse;

		return new Response(JSON.stringify(actorDataResponse));
	} catch (error) {
		return new Response('Could not fetch movies.', { status: 500 });
	}
}
