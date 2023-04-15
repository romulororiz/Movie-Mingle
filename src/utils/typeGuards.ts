import {
	GenreResponse,
	MovieData,
	MovieResponse,
	PeopleData,
	PeopleResponse,
} from '@/types/tmdb';

export const isMovieResponse = (data: any): data is MovieResponse[] => {
	if (Array.isArray(data) && data.length) {
		return data.every(
			movie =>
				typeof movie === 'object' && movie !== null && 'backdrop_path' in movie
		);
	}
	return false;
};

export const isMovieData = (data: any): data is MovieData[] => {
	if (
		'page' in data &&
		'total_pages' in data &&
		'total_results' in data &&
		'results' in data &&
		isMovieResponse(data.results)
	) {
		return true;
	}
	return false;
};

export const isPeopleResponse = (data: any): data is PeopleResponse[] => {
	if (Array.isArray(data) && data.length) {
		return data.every(
			people =>
				typeof people === 'object' && people !== null && 'known_for' in people
		);
	}
	return false;
};

export const isPeopleData = (data: any): data is PeopleData[] => {
	if (
		'page' in data &&
		'total_pages' in data &&
		'total_results' in data &&
		'results' in data &&
		isPeopleResponse(data.results)
	) {
		return true;
	}
	return false;
};

export const isGenreResponse = (data: any): data is GenreResponse[] => {
	if (Array.isArray(data) && data.length) {
		return data.every(
			genre =>
				typeof genre === 'object' &&
				genre !== null &&
				'id' in genre &&
				'name' in genre
		);
	}
	return false;
};
