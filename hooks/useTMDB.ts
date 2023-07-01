import { useQuery } from '@tanstack/react-query';

const fetcher = async (endpoint: string): Promise<any> => {
	const res = await fetch(endpoint);
	return await res.json();
};

export const usePopularMovies = () => {
	return useQuery({
		queryKey: ['PopularMovies'],
		queryFn: () => fetcher('/api/movies/popular'),
		refetchOnWindowFocus: false,
	});
};

export const useTopRated = () => {
	return useQuery({
		queryKey: ['TopRated'],
		queryFn: () => fetcher('/api/movies/top_rated'),
		refetchOnWindowFocus: false,
	});
};

export const useNowPlaying = () => {
	return useQuery({
		queryKey: ['NowPlaying'],
		queryFn: () => fetcher('/api/movies/now_playing'),
		refetchOnWindowFocus: false,
	});
};

export const useUpcoming = () => {
	return useQuery({
		queryKey: ['Upcoming'],
		queryFn: () => fetcher('/api/movies/upcoming'),
		refetchOnWindowFocus: false,
	});
};

export const usePopularActors = () => {
	return useQuery({
		queryKey: ['PopularActors'],
		queryFn: () => fetcher('/api/actors/popular'),
		refetchOnWindowFocus: false,
	});
};

export const useMovieDetail = (movieId: number) => {
	return useQuery({
		queryKey: ['MovieDetail', movieId],
		queryFn: () => fetcher(`/api/movies/${movieId}`),
		refetchOnWindowFocus: false,
	});
};

export const useActorDetail = (actorId: number) => {
	return useQuery({
		queryKey: ['ActorDetail', actorId],
		queryFn: () => fetcher(`/api/actors/${actorId}`),
		refetchOnWindowFocus: false,
	});
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
