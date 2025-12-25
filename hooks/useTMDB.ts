// @ts-nocheck
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

const fetcher = async <T>(endpoint: string): Promise<T> => {
	const res = await fetch(endpoint, {
		cache: 'force-cache',
		next: {
			revalidate: 3600, // 1 hour
		},
	});
	
	if (!res.ok) {
		throw new Error(`API Error: ${res.status}`);
	}
	
	return await res.json();
};

// ------------------ Movie Hooks ------------------

export const usePopularMovies = () => {
	return useQuery({
		queryKey: ['movies', 'popular'],
		queryFn: () => fetcher<MovieDataResponse>('/api/movies/popular'),
		staleTime: 10 * 60 * 1000, // 10 minutes
	}) as UseQueryResult<MovieDataResponse>;
};

export const useTopRated = () => {
	return useQuery({
		queryKey: ['movies', 'topRated'],
		queryFn: () => fetcher<MovieDataResponse>('/api/movies/top_rated'),
		staleTime: 10 * 60 * 1000, // 10 minutes
	}) as UseQueryResult<MovieDataResponse>;
};

export const useNowPlaying = () => {
	return useQuery({
		queryKey: ['movies', 'nowPlaying'],
		queryFn: () => fetcher<MovieDataResponse>('/api/movies/now_playing'),
		staleTime: 5 * 60 * 1000, // 5 minutes
	}) as UseQueryResult<MovieDataResponse>;
};

export const useUpcoming = () => {
	return useQuery({
		queryKey: ['movies', 'upcoming'],
		queryFn: () => fetcher<MovieDataResponse>('/api/movies/upcoming'),
		staleTime: 10 * 60 * 1000, // 10 minutes
	}) as UseQueryResult<MovieDataResponse>;
};

export const useMovieDetail = (movieId: number) => {
	return useQuery({
		queryKey: ['movies', 'detail', movieId],
		queryFn: () => fetcher<MovieDetailResponse>(`/api/movies/${movieId}`),
		staleTime: 30 * 60 * 1000, // 30 minutes
		enabled: !!movieId,
	}) as UseQueryResult<MovieDetailResponse>;
};

export const useMoviesByGenre = (genreId: number) => {
	return useInfiniteQuery<MovieDataResponse>({
		queryKey: ['movies', 'genre', genreId],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<MovieDataResponse>(`/api/movies/genres/${genreId}?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useSimilarMoviesInfinite = (movieId: number) => {
	return useInfiniteQuery<MovieDataResponse>({
		queryKey: ['movies', 'similar', movieId],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<MovieDataResponse>(`/api/movies/${movieId}/similar?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 15 * 60 * 1000, // 15 minutes
	});
};

export const useRecommendedMoviesInfinite = (movieId: number) => {
	return useInfiniteQuery<MovieDataResponse>({
		queryKey: ['movies', 'recommended', movieId],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<MovieDataResponse>(
				`/api/movies/${movieId}/recommended?page=${pageParam}`
			),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 15 * 60 * 1000, // 15 minutes
	});
};

export const useUpcomingInfinite = () => {
	return useInfiniteQuery<MovieDataResponse>({
		queryKey: ['movies', 'upcoming', 'infinite'],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<MovieDataResponse>(`/api/movies/upcoming?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useTopRatedInfinite = () => {
	return useInfiniteQuery<MovieDataResponse>({
		queryKey: ['movies', 'topRated', 'infinite'],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<MovieDataResponse>(`/api/movies/top_rated?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useNowPlayingInfinite = () => {
	return useInfiniteQuery<MovieDataResponse>({
		queryKey: ['movies', 'nowPlaying', 'infinite'],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<MovieDataResponse>(`/api/movies/now_playing?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

export const usePopularMoviesInfinite = () => {
	return useInfiniteQuery<MovieDataResponse>({
		queryKey: ['movies', 'popular', 'infinite'],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<MovieDataResponse>(`/api/movies/popular?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

// ------------------ People Hooks ------------------

export const usePopularActors = () => {
	return useQuery({
		queryKey: ['actors', 'popular'],
		queryFn: () => fetcher<PeopleDataResponse>('/api/actors/popular'),
		staleTime: 10 * 60 * 1000, // 10 minutes
	}) as UseQueryResult<PeopleDataResponse>;
};

export const useActorDetail = (actorId: number) => {
	return useQuery({
		queryKey: ['actors', 'detail', actorId],
		queryFn: () => fetcher<PeopleDetailResponse>(`/api/actors/${actorId}`),
		staleTime: 30 * 60 * 1000, // 30 minutes
		enabled: !!actorId,
	}) as UseQueryResult<PeopleDetailResponse>;
};

export const usePopularActorsInfinite = () => {
	return useInfiniteQuery<PeopleDataResponse>({
		queryKey: ['actors', 'popular', 'infinite'],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<PeopleDataResponse>(`/api/actors/popular?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useMovieCreditsInfinite = (actorId: number) => {
	return useInfiniteQuery<MovieCreditsResponse>({
		queryKey: ['actors', 'credits', actorId],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<MovieCreditsResponse>(
				`/api/actors/${actorId}/movie_credits?page=${pageParam}`
			),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 30 * 60 * 1000, // 30 minutes
	});
};

// ------------------ TV Hooks ------------------

export const useTvPopularInfinite = () => {
	return useInfiniteQuery<TvResponseData>({
		queryKey: ['tv', 'popular', 'infinite'],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<TvResponseData>(`/api/tv/popular?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useTvTopRatedInfinite = () => {
	return useInfiniteQuery<TvResponseData>({
		queryKey: ['tv', 'topRated', 'infinite'],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<TvResponseData>(`/api/tv/top_rated?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 10 * 60 * 1000, // 10 minutes
	});
};

export const useTvAiringTodayInfinite = () => {
	return useInfiniteQuery<TvResponseData>({
		queryKey: ['tv', 'airingToday', 'infinite'],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			fetcher<TvResponseData>(`/api/tv/airing_today?page=${pageParam}`),
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
};

// ------------------ Search Hooks ------------------

export const useSearch = (q: string) => {
	return useQuery({
		queryKey: ['search', q],
		queryFn: () => fetcher<SearchData>(`/api/search?q=${q}`),
		enabled: q.length > 0,
		staleTime: 2 * 60 * 1000, // 2 minutes
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
