import { MovieData, PeopleData } from '@/types/tmdb';
import { isMovieResponse, isPeopleResponse } from '@/utils/typeGuards';
import axios from 'axios';

export const fetchFromHandler = async (type: string) => {
	const response = await axios.get(`/api/tmdb/tmdb-data`, {
		params: {
			type,
		},
	});

	const data = response.data as MovieData | PeopleData;

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

	throw new Error(`Unexpected data type received for ${type}`);
};
