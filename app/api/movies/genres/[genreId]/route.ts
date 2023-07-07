import { MovieDataResponse } from '@/types/tmdb';

// @route GET
// @desc Get genre by id
// @access Public
export async function GET(req: Request) {
	const url = new URL(req.url);

	const genreId = url.pathname.split('/')[4];
	const pageNum = url.searchParams.get('page');

	try {
		const genreRes = await fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&with_genres=${genreId}&page=${pageNum}`
		);

		const genreResData = (await genreRes.json()) as MovieDataResponse;
		return new Response(JSON.stringify(genreResData));
	} catch (error) {
		return new Response('Could not fetch movies.', { status: 500 });
	}
}
