import { fetchFromHandler } from '@/helpers/tmdb';
import {
	isMovieDetailResponse,
	isMovieResponse,
	isPeopleResponse,
} from '@/utils/typeGuards';
import { useQuery } from '@tanstack/react-query';

const useTMDB = () => {
	const {
		data: topRated,
		isLoading: isLoadingTopRated,
		error: errorTopRated,
	} = useQuery({
		queryKey: ['topRated'],
		queryFn: () => fetchFromHandler('top_rated'),
	});

	const {
		data: popularMovies,
		isLoading: isLoadingPopularMovies,
		error: errorPopularMovies,
	} = useQuery({
		queryKey: ['popularMovies'],
		queryFn: () => fetchFromHandler('popular'),
	});

	const {
		data: nowPlaying,
		isLoading: isLoadingNowPlaying,
		error: errorNowPlaying,
	} = useQuery({
		queryKey: ['nowPlaying'],
		queryFn: () => fetchFromHandler('now_playing'),
	});

	const {
		data: upcoming,
		isLoading: isLoadingUpcoming,
		error: errorUpcoming,
	} = useQuery({
		queryKey: ['upcoming'],
		queryFn: () => fetchFromHandler('upcoming'),
	});

	const {
		data: popularActors,
		isLoading: isLoadingPopularActors,
		error: errorPopularActors,
	} = useQuery({
		queryKey: ['popularActors'],
		queryFn: () => fetchFromHandler('popular_actors'),
	});

	return {
		topRated: {
			data: isMovieResponse(topRated) ? topRated : [],
			isLoading: isLoadingTopRated,
			error: errorTopRated,
		},
		popularMovies: {
			data: isMovieResponse(popularMovies) ? popularMovies : [],
			isLoading: isLoadingPopularMovies,
			error: errorPopularMovies,
		},
		nowPlaying: {
			data: isMovieResponse(nowPlaying) ? nowPlaying : [],
			isLoading: isLoadingNowPlaying,
			error: errorNowPlaying,
		},
		upcoming: {
			data: isMovieResponse(upcoming) ? upcoming : [],
			isLoading: isLoadingUpcoming,
			error: errorUpcoming,
		},
		popularActors: {
			data: isPeopleResponse(popularActors) ? popularActors : [],
			isLoading: isLoadingPopularActors,
			error: errorPopularActors,
		},
	};
};

export default useTMDB;
