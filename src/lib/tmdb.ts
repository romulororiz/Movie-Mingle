const { env } = process;
import axios from 'axios';

const tmdbKey = env.TMDB_API_KEY;

export const tmdb = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	params: {
		api_key: tmdbKey,
		language: 'en-US',
		sort_by: 'popularity.desc',
        
	},
});
