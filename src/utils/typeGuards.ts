import {
	GenreResponse,
	MovieData,
	MovieResponse,
	PeopleData,
	PeopleResponse,
} from '@/types/tmdb';

export const isMovieResponse = (data: any): data is MovieResponse[] => {
	if (Array.isArray(data) && data.length > 0 && 'backdrop_path' in data[0]) {
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

export const isPeopleResponse = (data: any): data is PeopleResponse[] => {
	if (Array.isArray(data) && data.length > 0 && 'known_for' in data[0]) {
		return true;
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
	if (Array.isArray(data) && data.length > 0 && 'name' in data[0]) {
		return true;
	}
	return false;
};
