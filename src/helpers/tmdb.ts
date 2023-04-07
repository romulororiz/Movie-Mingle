import { GenreResponse, MovieData, MovieQuery } from '@/types/tmdb';
import { axiosRequest } from './axiosRequest';
import { movieQuerySchema } from '@/lib/tmdb';

export async function getPopularMovies() {
	const data = await axiosRequest('get', '/movie/popular');
	return data;
}

// get now playing movies
export async function getNowPlayingMovies() {
	const data = await axiosRequest('get', '/movie/now_playing');
	return data;
}

// get top rated movies
export async function getTopRatedMovies() {
	const data = await axiosRequest('get', '/movie/top_rated');
	return data;
}

// get genres
export async function getGenres() {
	const data = await axiosRequest('get', '/genre/movie/list');
	return data;
}

// Search based on User Preferences
export async function getMovieWithQuery(input?: Partial<MovieQuery>) {
	const validatedInput = movieQuerySchema.parse(input);

	const data = await axiosRequest('get', '/discover/movie', {
		params: {
			'primary_release_date.gte': validatedInput?.releaseDateGte,
			'primary_release_date.lte': validatedInput?.releaseDateLte,
			with_genres: validatedInput?.genres?.join(','),
			'vote_average.gte': validatedInput?.voteGte,
			'vote_average.lte': validatedInput?.voteLte,
		},
	});
	return data;
}
