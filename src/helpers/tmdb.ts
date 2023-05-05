import {
	MovieCreditsResponse,
	MovieData,
	MovieDetailResponse,
	PeopleData,
	PeopleDetailResponse,
} from '@/types/tmdb';
import { isMovieResponse, isPeopleResponse } from '@/utils/typeGuards';
import axios from 'axios';

export const fetchFromHandler = async (type: string, id?: number) => {
	const response = await axios.get(`/api/tmdb/tmdb-data`, {
		params: {
			type,
			id,
		},
	});

	const data = response.data as MovieData | PeopleData;

	if (data.results && data.results.length === 0) {
		throw new Error(
			'No results found. Please try again with different parameters.'
		);
	}

	// todo include in switch statement \/
	if (data.results) {
		if (isMovieResponse(data.results)) {
			return data.results;
		} else if (isPeopleResponse(data.results)) {
			return data.results;
		}
	}

	switch (type) {
		case 'movie_details':
			return response.data as MovieDetailResponse;
		case 'actor_details':
			return response.data as PeopleDetailResponse;
		case 'movie_credits':
			return response.data as MovieCreditsResponse;
	}

	throw new Error(`Unexpected data type received for ${type}`);
};
