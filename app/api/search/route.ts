import { SearchData } from '@/types/tmdb';

// @route GET
// @desc Search for movies, tv shows, and people
// @access Public
export async function GET(request: Request) {
	const url = new URL(request.url);

	const q = url.searchParams.get('q');

	const pageNum = url.searchParams.get('page') || 1;

	try {
		const searchRes = await fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_API_KEY}&query=${q}&include_adult=false&language=en-US&page=${pageNum}`
		);

		const searchResData = (await searchRes.json()) as SearchData;

		return new Response(JSON.stringify(searchResData));
	} catch (error) {
		return new Response('Could not fetch movies.', { status: 500 });
	}
}
