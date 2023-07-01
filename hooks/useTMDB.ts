import {
	MovieDetailResponse,
	MovieResponse,
	PeopleDetailResponse,
	PeopleResponse,
} from '@/types/tmdb';
import { UseQueryResult, useQuery } from '@tanstack/react-query';

const fetcher = async (endpoint: string) => {
	const res = await fetch(endpoint);
	return await res.json();
};

export const usePopularMovies = () => {
	return useQuery({
		queryKey: ['Popular'],
		queryFn: () => fetcher('/api/movies/popular'),
		refetchOnWindowFocus: false,
	}) as {
		data: MovieResponse[];
		isLoading: boolean;
	};
};

export const useTopRated = () => {
	return useQuery({
		queryKey: ['TopRated'],
		queryFn: () => fetcher('/api/movies/top_rated'),
		refetchOnWindowFocus: false,
	}) as {
		data: MovieResponse[];
		isLoading: boolean;
	};
};

export const useNowPlaying = () => {
	return useQuery({
		queryKey: ['NowPlaying'],
		queryFn: () => fetcher('/api/movies/now_playing'),
		refetchOnWindowFocus: false,
	}) as {
		data: MovieResponse[];
		isLoading: boolean;
	};
};

export const useUpcoming = () => {
	return useQuery({
		queryKey: ['Upcoming'],
		queryFn: () => fetcher('/api/movies/upcoming'),
		refetchOnWindowFocus: false,
	}) as {
		data: MovieResponse[];
		isLoading: boolean;
	};
};

export const usePopularActors = () => {
	return useQuery({
		queryKey: ['PopularActors'],
		queryFn: () => fetcher('/api/actors/popular'),
		refetchOnWindowFocus: false,
	}) as {
		data: PeopleResponse[];
		isLoading: boolean;
	};
};

export const useMovieDetail = (movieId: number) => {
	return useQuery({
		queryKey: ['MovieDetail', movieId],
		queryFn: () => fetcher(`/api/movies/${movieId}`),
		refetchOnWindowFocus: false,
	}) as {
		data: MovieDetailResponse;
		isLoading: boolean;
	};
};

export const useActorDetail = (actorId: number) => {
	return useQuery({
		queryKey: ['ActorDetail', actorId],
		queryFn: () => fetcher(`/api/actors/${actorId}`),
		refetchOnWindowFocus: false,
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
