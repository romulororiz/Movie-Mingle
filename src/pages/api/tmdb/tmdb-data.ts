import { NextApiRequest, NextApiResponse } from 'next';
import {
	getNowPlayingMovies,
	getPopularMovies,
	getTopRatedMovies,
	getUpcomingMovies,
	getGenres,
	getPopularActors,
	getMovieWithQuery,
} from '@/helpers/tmdb';
import { MovieQuery } from '@/types/tmdb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { type } = req.query;

	try {
		let data;
		switch (type) {
			case 'popular':
				data = await getPopularMovies();
				break;
			case 'now_playing':
				data = await getNowPlayingMovies();
				break;
			case 'top_rated':
				data = await getTopRatedMovies();
				break;
			case 'upcoming':
				data = await getUpcomingMovies();
				break;
			case 'genres':
				data = await getGenres();
				break;
			case 'popular_actors':
				data = await getPopularActors();
				break;
			case 'movie_query':
				const { releaseDateGte, releaseDateLte, genres, voteGte, voteLte } =
					req.query;
				const query: Partial<MovieQuery> = {
					releaseDateGte:
						typeof releaseDateGte === 'string' ? releaseDateGte : undefined,
					releaseDateLte:
						typeof releaseDateLte === 'string' ? releaseDateLte : undefined,
					genres: genres
						? Array.isArray(genres)
							? genres
							: [genres]
						: undefined,
					voteGte: voteGte ? Number(voteGte) : undefined,
					voteLte: voteLte ? Number(voteLte) : undefined,
				};
				data = await getMovieWithQuery(query);
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

export default handler;
