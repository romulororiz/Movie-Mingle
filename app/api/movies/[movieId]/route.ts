import { MovieDetailResponse } from '@/types/tmdb';

// @route GET
// @desc Get actor by id
// @access Public
export async function GET(req: Request) {
	const url = new URL(req.url);

	const movieId = url.pathname.split('/')[3];

	try {
		const movieRes = await fetch(
			`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}&append_to_response=images,videos,credits,similar`
		);

		const movieResData = (await movieRes.json()) as MovieDetailResponse;
		return new Response(JSON.stringify(movieResData));
	} catch (error) {
		return new Response('Could not fetch movies.', { status: 500 });
	}
}
