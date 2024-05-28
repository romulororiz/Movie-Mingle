import {
	MovieCreditsResponse,
	MovieDataResponse,
	MovieDetailResponse,
	PeopleDataResponse,
	PeopleDetailResponse,
	SearchData,
	TvResponseData,
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

// ------------------ Movie Hooks ------------------

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

export const useMovieDetail = (movieId: number) => {
	return useQuery({
		queryKey: ['MovieDetail', movieId],
		queryFn: () => fetcher(`/api/movies/${movieId}`),
	}) as UseQueryResult<MovieDetailResponse>;
};

export const useMoviesByGenre = (genreId: number) => {
	return useInfiniteQuery({
		queryKey: ['MoviesByGenre', genreId],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/movies/genres/${genreId}?page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieDataResponse>;
};

export const useSimilarMoviesInfinite = (movieId: number) => {
	return useInfiniteQuery({
		queryKey: ['SimilarMovies', movieId],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/movies/${movieId}/similar?page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieDataResponse>;
};

export const useRecommendedMoviesInfinite = (movieId: number) => {
	return useInfiniteQuery({
		queryKey: ['RecommendedMovies', movieId],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/movies/${movieId}/recommended?page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieDataResponse>;
};

export const useUpcomingInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['UpcomingInfinite'],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/movies/upcoming?page=${pageParam}`),
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
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/movies/top_rated?page=${pageParam}`),
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
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/movies/now_playing?page=${pageParam}`),
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
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/movies/popular?page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieDataResponse>;
};

// ------------------ People Hooks ------------------

export const usePopularActors = () => {
	return useQuery({
		queryKey: ['PopularActors'],
		queryFn: () => fetcher('/api/actors/popular'),
	}) as UseQueryResult<PeopleDataResponse>;
};

export const useActorDetail = (actorId: number) => {
	return useQuery({
		queryKey: ['ActorDetail', actorId],
		queryFn: () => fetcher(`/api/actors/${actorId}`),
	}) as UseQueryResult<PeopleDetailResponse>;
};

export const usePopularActorsInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['PopularActorsInfinite'],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/actors/popular?page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<PeopleDataResponse>;
};

export const useMovieCreditsInfinite = (actorId: number) => {
	return useInfiniteQuery({
		queryKey: ['MovieCredits', actorId],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/actors/${actorId}/movie_credits?page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<MovieCreditsResponse>;
};

// ------------------ TV Hooks ------------------

export const useTvPopularInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['TvPopularInfinite'],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/tv/popular?page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<TvResponseData>;
};

export const useTvTopRatedInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['TvTopRatedInfinite'],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/tv/top_rated?page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<TvResponseData>;
};

export const useTvAiringTodayInfinite = () => {
	return useInfiniteQuery({
		queryKey: ['TvAiringTodayInfinite'],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/tv/airing_today?page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<TvResponseData>;
};

// ------------------ Search Hooks ------------------

export const useSearch = (q: string) => {
	return useQuery({
		queryKey: ['Search', q],
		queryFn: () => fetcher(`/api/search?q=${q}`),
		enabled: q.length > 0,
	}) as UseQueryResult<SearchData>;
};

export const useSearchInfinite = (q: string) => {
	return useInfiniteQuery({
		queryKey: ['SearchInfinite', q],
		queryFn: ({ pageParam = 1 }: { pageParam?: number }) =>
			fetcher(`/api/search?q=${q}&page=${pageParam}`),
		getNextPageParam: ({ page, total_pages }) => {
			return page < total_pages ? page + 1 : undefined;
		},
		select: data => {
			return data;
		},
	}) as UseInfiniteQueryResult<SearchData>;
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
	useTopRatedInfinite,
	useNowPlayingInfinite,
	usePopularMoviesInfinite,
	useSimilarMoviesInfinite,
	useSearch,
};

export default useTMDB;
