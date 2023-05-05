import {
	CastResponse,
	GenreResponse,
	MovieCreditsResponse,
	MovieData,
	MovieDetailResponse,
	MovieResponse,
	PeopleData,
	PeopleDetailResponse,
	PeopleResponse,
} from '@/types/tmdb';

// todo remove isMovieResponseItem and isPeopleResponseItem
export const isMovieResponseItem = (data: any): data is MovieDetailResponse => {
	if (typeof data === 'object' && data !== null && 'backdrop_path' in data) {
		return true;
	}
	return false;
};

export const isMovieResponse = (data: any): data is MovieResponse[] => {
	if (Array.isArray(data) && data.length) {
		return data.every(
			movie =>
				typeof movie === 'object' && movie !== null && 'backdrop_path' in movie
		);
	}
	return false;
};

export const isMovieDetailResponse = (
	data: any
): data is MovieDetailResponse => {
	if (typeof data === 'object' && data !== null && 'revenue' in data) {
		return true;
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

// todo check this out because known for doesn't exist in the response
export const isPeopleResponseItem = (data: any): data is PeopleResponse => {
	if (typeof data === 'object' && data !== null && 'known_for' in data) {
		return true;
	}
	return false;
};

export const isPeopleDetailResponse = (
	data: any
): data is PeopleDetailResponse => {
	if (
		typeof data === 'object' &&
		data !== null &&
		'known_for_department' in data
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

export const isMovieCreditsResponse = (
	data: any
): data is MovieCreditsResponse => {
	if (
		typeof data === 'object' &&
		data !== null &&
		'cast' in data &&
		'crew' in data
	) {
		return true;
	}
	return false;
};

export const isCastResponseItem = (data: any): data is CastResponse => {
	if (
		typeof data === 'object' &&
		data !== null &&
		'cast_id' in data &&
		'order' in data
	) {
		return true;
	}
	return false;
};
