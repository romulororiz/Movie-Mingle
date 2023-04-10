import { MovieQuery, MovieResponse, PeopleResponse } from '@/types/tmdb';
import { isMovieResponse, isPeopleResponse } from '@/utils/typeGuards';
import { useEffect, useState } from 'react';

interface Movies {
	topRated: MovieResponse[] | null;
	nowPlaying: MovieResponse[] | null;
	upcoming: MovieResponse[] | null;
	popularMovies: MovieResponse[] | null;
	popularActors: PeopleResponse[] | null;
}

const useTMDB = () => {
	const [data, setData] = useState<Movies>({
		popularMovies: null,
		topRated: null,
		nowPlaying: null,
		upcoming: null,
		popularActors: null,
	});
	const [movieQueryResults, setMovieQueryResults] = useState<
		MovieResponse[] | null
	>(null);

	// Define the fetchData function with a type parameter
	const fetchData = async (type: string, input?: Partial<MovieQuery>) => {
		const queryParams = new URLSearchParams({ type });

		if (input) {
			for (const key in input) {
				const value = input[key as keyof typeof input];
				if (value !== undefined) {
					if (Array.isArray(value)) {
						queryParams.append(key, value.join(','));
					} else {
						queryParams.append(key, value.toString());
					}
				}
			}
		}

		const response = await fetch(
			`/api/tmdb/tmdb-data?${queryParams.toString()}`
		);
		const data = await response.json();
		return data;
	};

	const fetchMovieQueryResults = async (input: Partial<MovieQuery>) => {
		const movieQueryResults = await fetchData('movie_query', input);
		if (isMovieResponse(movieQueryResults)) {
			setMovieQueryResults(movieQueryResults);
		}
	};

	useEffect(() => {
		const fetchDataAll = async () => {
			const [topRated, nowPlaying, upcoming, popularMovies, popularActors] =
				await Promise.all([
					fetchData('top_rated'),
					fetchData('now_playing'),
					fetchData('upcoming'),
					fetchData('popular'),
					fetchData('popular_actors'),
				]);

			if (
				isMovieResponse(topRated.results) &&
				isMovieResponse(nowPlaying.results) &&
				isMovieResponse(upcoming.results) &&
				isMovieResponse(popularMovies.results) &&
				isPeopleResponse(popularActors.results)
			) {
				setData({
					topRated: topRated.results,
					nowPlaying: nowPlaying.results,
					upcoming: upcoming.results,
					popularMovies: popularMovies.results,
					popularActors: popularActors.results,
				});
			}
		};

		fetchDataAll();
	}, []);

	return {
		data,
		movieQueryResults,
		fetchMovieQueryResults,
	};
};
export default useTMDB;
