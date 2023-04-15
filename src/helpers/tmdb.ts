import { MovieData, PeopleData } from '@/types/tmdb';
import { isMovieResponse, isPeopleResponse } from '@/utils/typeGuards';

export const fetchFromHandler = async (type: string) => {
	const queryParams = new URLSearchParams({
		type,
	});

	const response = await fetch(`/api/tmdb/tmdb-data?${queryParams.toString()}`);
	const data = (await response.json()) as MovieData | PeopleData;

	if (data.results && data.results.length === 0) {
		throw new Error(
			'No results found. Please try again with different parameters.'
		);
	}

	if (data.results) {
		if (isMovieResponse(data.results)) {
			return data.results;
		} else if (isPeopleResponse(data.results)) {
			return data.results;
		}
	}
};
