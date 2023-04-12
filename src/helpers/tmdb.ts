const { env } = process;
import { MovieQuery } from '@/types/tmdb';
import { z } from 'zod';

export const tmdbKey = env.TMDB_API_KEY as string;

export async function fetchData(
	endpoint: string,
	api_key: string,
	params?: MovieQuery
) {
	const url = new URL(`https://api.themoviedb.org/3${endpoint}`);
	url.search = new URLSearchParams(params as Record<string, string>).toString();
	url.searchParams.append('api_key', api_key);
	url.searchParams.append('language', 'en-US');
	url.searchParams.append('sort_by', 'popularity.desc');
	const data = await fetch(url.toString());
	return data.json();
}

// Movie Query Schema User Preferences
export const movieQuerySchema = z.object({
	releaseDateGte: z.string().optional(),
	releaseDateLte: z.string().optional(),
	genres: z.array(z.string()).optional(),
	voteGte: z.number().optional(),
	voteLte: z.number().optional(),
});

export function getPopularMovies() {
	return fetchData('/movie/popular', tmdbKey);
}

export function getNowPlayingMovies() {
	return fetchData('/movie/now_playing', tmdbKey);
}

export function getTopRatedMovies() {
	return fetchData('/movie/top_rated', tmdbKey);
}

export function getUpcomingMovies() {
	return fetchData('/movie/upcoming', tmdbKey);
}

export function getGenres() {
	return fetchData('/genre/movie/list', tmdbKey);
}

export function getPopularActors() {
	return fetchData('/person/popular', tmdbKey);
}

export async function getMovieWithQuery(input?: Partial<MovieQuery>) {
	const validatedInput = movieQuerySchema.parse(input);

	return fetchData('/discover/movie', tmdbKey, validatedInput);
}
