const { env } = process;
import { withMethods } from '@/lib/api-middlewares/with-methods';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export const tmdbKey = env.TMDB_API_KEY as string;

// Validate query parameters
const movieQuerySchema = z.object({
	title: z.string().optional(),
	'release_date.gte': z.string().optional(),
	'release_date.lte': z.string().optional(),
	with_genres: z.array(z.string()).optional(),
	'vote_average.gte': z.number().optional(),
	'vote_average.lte': z.number().optional(),
});

export type MovieQuery = z.infer<typeof movieQuerySchema>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { type, id } = req.query;

	// Check sort later on
	const fetchData = async (
		endpoint: string,
		api_key: string = tmdbKey,
		queryParams?: Partial<MovieQuery>
	) => {
		const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
		url.searchParams.append('api_key', api_key);
		url.searchParams.append('language', 'en-US');
		url.searchParams.append('sort_by', 'popularity.desc');

		const data = await fetch(url.toString());
		return data.json();
	};

	try {
		let data;
		switch (type) {
			case 'popular':
				data = await fetchData('/movie/popular');
				break;

			case 'now_playing':
				data = await fetchData('/movie/now_playing');
				break;

			case 'top_rated':
				data = await fetchData('/movie/top_rated');
				break;

			case 'upcoming':
				data = await fetchData('/movie/upcoming');
				break;

			case 'genres':
				data = await fetchData('/genre/movie/list');
				break;

			case 'popular_actors':
				data = await fetchData('/person/popular');
				break;

			case 'actor_details':
				if (!id) throw new Error('Missing id parameter');
				data = await fetchData(`/person/${id}`);
				break;

			case 'movie_details':
				if (!id) throw new Error('Missing id parameter');

				data = await fetchData(`/movie/${id}`);
				break;

			case 'movie_credits':
				if (!id) throw new Error('Missing id parameter');

				data = await fetchData(`/movie/${id}/credits`);
				break;

			case 'recommended':
				if (!id) throw new Error('missing id parameter');

				data = await fetchData(`/movie/${id}/recommendations`);
				break;

			case 'movie_query':
				const { releaseDateGte, releaseDateLte, genres, voteGte, voteLte } =
					req.query;

				const query = {
					'release_date.gte': releaseDateGte,
					'release_date.lte': releaseDateLte,
					with_genres: (genres as string).split(',') || [],
					'vote_average.gte': Number(voteGte),
					'vote_average.lte': Number(voteLte),
				};

				const validatedQuery = movieQuerySchema.parse(query);

				data = await fetchData('/discover/movie', '', validatedQuery);

				break;
			default:
				throw new Error('Invalid type parameter');
		}

		res.status(200).json(data);
	} catch (error: unknown) {
		const errorMessage =
			error instanceof Error ? error.message : 'Unknown error';
		res.status(400).json({ error: errorMessage });
	}
};

export default withMethods(['GET'], handler);
