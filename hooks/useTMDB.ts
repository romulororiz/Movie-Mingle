import {
	MovieDataResponse,
	MovieDetailResponse,
	MovieResponse,
	PeopleDetailResponse,
	PeopleResponse,
} from '@/types/tmdb';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const fetcher = async (endpoint: string, revalidateTime?: number) => {
	const res = await fetch(endpoint, {
		next: {
			revalidate: revalidateTime || 60,
		},
	});
	return await res.json();
};

export const usePopularMovies = () => {
	return useQuery({
		queryKey: ['Popular'],
		queryFn: () => fetcher('/api/movies/popular'),
	}) as {
		data: MovieResponse[];
		isLoading: boolean;
	};
};

export const useTopRated = () => {
	return useQuery({
		queryKey: ['TopRated'],
		queryFn: () => fetcher('/api/movies/top_rated'),
	}) as {
		data: MovieResponse[];
		isLoading: boolean;
	};
};

export const useNowPlaying = () => {
	return useQuery({
		queryKey: ['NowPlaying'],
		queryFn: () => fetcher('/api/movies/now_playing'),
	}) as {
		data: MovieResponse[];
		isLoading: boolean;
	};
};

export const useUpcoming = () => {
	return useQuery({
		queryKey: ['Upcoming'],
		queryFn: () => fetcher('/api/movies/upcoming'),
	}) as {
		data: MovieResponse[];
		isLoading: boolean;
	};
};

export const usePopularActors = () => {
	return useQuery({
		queryKey: ['PopularActors'],
		queryFn: () => fetcher('/api/actors/popular'),
	}) as {
		data: PeopleResponse[];
		isLoading: boolean;
	};
};

export const useMoviesByGenre = (genreId: number) => {
	return useQuery({
		queryKey: ['MoviesByGenre', genreId],
		queryFn: () => fetcher(`/api/movies/genres/${genreId}`),
	}) as {
		data: MovieDataResponse;
		isLoading: boolean;
	};
};

export const useMovieDetail = (movieId: number) => {
	return useQuery({
		queryKey: ['MovieDetail', movieId],
		queryFn: () => fetcher(`/api/movies/${movieId}`),
	}) as {
		data: MovieDetailResponse;
		isLoading: boolean;
	};
};

export const useActorDetail = (actorId: number) => {
	return useQuery({
		queryKey: ['ActorDetail', actorId],
		queryFn: () => fetcher(`/api/actors/${actorId}`),
	}) as UseQueryResult<PeopleDetailResponse> & {
		data: PeopleDetailResponse;
		isLoading: boolean;
	};
};

const useTMDB = {
	usePopularMovies,
	useTopRated,
	useNowPlaying,
	useUpcoming,
	usePopularActors,
	useMovieDetail,
	useActorDetail,
};

export default useTMDB;
