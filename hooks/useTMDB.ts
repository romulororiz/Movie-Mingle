import {
	MovieDataResponse,
	MovieDetailResponse,
	MovieResponse,
	PeopleDataResponse,
	PeopleDetailResponse,
	PeopleResponse,
} from '@/types/tmdb';
import {
	UseInfiniteQueryResult,
	UseQueryResult,
	useInfiniteQuery,
	useQuery,
} from '@tanstack/react-query';

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
	}) as UseQueryResult<MovieDataResponse>;
};

export const useTopRated = () => {
	return useQuery({
		queryKey: ['TopRated'],
		queryFn: () => fetcher('/api/movies/top_rated'),
	}) as UseQueryResult<MovieDataResponse>;
};

export const useNowPlaying = () => {
	return useQuery({
		queryKey: ['NowPlaying'],
		queryFn: () => fetcher('/api/movies/now_playing'),
	}) as UseQueryResult<MovieDataResponse>;
};

export const useUpcoming = () => {
	return useQuery({
		queryKey: ['Upcoming'],
		queryFn: () => fetcher('/api/movies/upcoming'),
	}) as UseQueryResult<MovieDataResponse>;
};

export const usePopularActors = () => {
	return useQuery({
		queryKey: ['PopularActors'],
		queryFn: () => fetcher('/api/actors/popular'),
	}) as UseQueryResult<PeopleDataResponse>;
};

export const useMovieDetail = (movieId: number) => {
	return useQuery({
		queryKey: ['MovieDetail', movieId],
		queryFn: () => fetcher(`/api/movies/${movieId}`),
	}) as UseQueryResult<MovieDetailResponse>;
};

export const useActorDetail = (actorId: number) => {
	return useQuery({
		queryKey: ['ActorDetail', actorId],
		queryFn: () => fetcher(`/api/actors/${actorId}`),
	}) as UseQueryResult<PeopleDetailResponse>;
};

export const useMoviesByGenre = (genreId: number) => {
	return useInfiniteQuery({
		queryKey: ['MoviesByGenre', genreId],
		queryFn: () => fetcher(`/api/movies/genres/${genreId}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieDataResponse>;
};

export const usePopularActorsInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['PopularActorsInfinite'],
		queryFn: () => fetcher(`/api/actors/popular`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<PeopleDataResponse>;
};

export const useUpcomingInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['UpcomingInfinite'],
		queryFn: () => fetcher(`/api/movies/upcoming`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieDataResponse>;
};

export const useTopRatedInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['TopRatedInfinite'],
		queryFn: () => fetcher(`/api/movies/top_rated`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieDataResponse>;
};

export const useNowPlayingInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['NowPlayingInfinite'],
		queryFn: () => fetcher(`/api/movies/now_playing`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieDataResponse>;
};

export const usePopularMoviesInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['PopularMoviesInfinite'],
		queryFn: () => fetcher(`/api/movies/popular`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieDataResponse>;
};


const useTMDB = {
	usePopularMovies,
	useTopRated,
	useNowPlaying,
	useUpcoming,
	usePopularActors,
	useMovieDetail,
	useActorDetail,
	useMoviesByGenre,
	usePopularActorsInfinite,
	useUpcomingInfinite,
};

export default useTMDB;
