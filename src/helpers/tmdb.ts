import { movieQuerySchema } from '@/lib/tmdb';
import { MovieQuery } from '@/types/tmdb';
import { axiosRequest } from './axiosRequest';

async function fetchData(endpoint: string, params?: MovieQuery) {
	const data = await axiosRequest('get', endpoint, { params });
	return data;
}

export function getPopularMovies() {
	return fetchData('/movie/popular');
}

export function getNowPlayingMovies() {
	return fetchData('/movie/now_playing');
}

export function getTopRatedMovies() {
	return fetchData('/movie/top_rated');
}

export function getGenres() {
	return fetchData('/genre/movie/list');
}

export function getPopularActors() {
	return fetchData('/person/popular');
}

export async function getMovieWithQuery(input?: Partial<MovieQuery>) {
	const validatedInput = movieQuerySchema.parse(input);

	return fetchData('/discover/movie', validatedInput);
}
