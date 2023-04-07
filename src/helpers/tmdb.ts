const { env } = process;
import { tmdb } from '@/lib/tmdb';
import { MovieData } from '@/types/tmdb';
import { z } from 'zod';

export async function getPopularMovies() {
	try {
		const res = await tmdb.get('/movie/popular');
		const data = res.data as MovieData;

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error('Error fetching popular movies');
		}
	}
}

// get now playing movies
export async function getNowPlayingMovies() {
	try {
		const res = await tmdb.get('/movie/now_playing');
		const data = res.data as MovieData;

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error('Error fetching now playing movies');
		}
	}
}

// get top rated movies
export async function getTopRatedMovies() {
	try {
		const res = await tmdb.get('/movie/top_rated');
		const data = res.data as MovieData;

		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(error.message);
		} else {
			throw new Error('Error fetching top rated movies');
		}
	}
}

// Search based on User Preferences
const movieQuerySchema = z.object({
	releaseDateGte: z.string().optional(),
	releaseDateLte: z.string().optional(),
	genres: z.array(z.string()).optional(),
	voteGte: z.number().optional(),
	voteLte: z.number().optional(),
});

type MovieQuery = z.infer<typeof movieQuerySchema>;

export async function getMovieWithQuery(input?: Partial<MovieQuery>) {
	const { releaseDateGte, releaseDateLte, genres, voteGte, voteLte } =
		movieQuerySchema.parse(input);

	{
		try {
			const res = await tmdb.get('/discover/movie', {
				params: {
					'primary_release_date.gte': releaseDateGte,
					'primary_release_date.lte': releaseDateLte,
					with_genres: genres?.join(','),
					'vote_average.gte': voteGte,
					'vote_average.lte': voteLte,
				},
			});

			const data = res.data as MovieData;

			return data;
		} catch (error) {
			if (error instanceof z.ZodError) {
				throw new Error(error.message);
			} else if (error instanceof Error) {
				throw new Error(error.message);
			} else {
				throw new Error('Error fetching movies');
			}
		}
	}
}
