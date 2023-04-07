const { env } = process;
import axios from 'axios';
import { z } from 'zod';

const tmdbKey = env.TMDB_API_KEY;

export const tmdb = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: {
		api_key: tmdbKey,
		language: 'en-US',
		sort_by: 'popularity.desc',
	},
});

// Movie Query Schema User Preferences
export const movieQuerySchema = z.object({
	releaseDateGte: z.string().optional(),
	releaseDateLte: z.string().optional(),
	genres: z.array(z.string()).optional(),
	voteGte: z.number().optional(),
	voteLte: z.number().optional(),
});

