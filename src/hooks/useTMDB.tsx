import { fetchFromHandler } from '@/helpers/tmdb';
import { MovieResponse, PeopleResponse } from '@/types/tmdb';
import { useQuery } from '@tanstack/react-query';

interface useTMDBProps {
	initialData?: MovieResponse[] | PeopleResponse[];
}

export default function useTMDB() {
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
		topRated,
		isLoadingTopRated,
		errorTopRated,
		nowPlaying,
		isLoadingNowPlaying,
		errorNowPlaying,
		upcoming,
		isLoadingUpcoming,
		errorUpcoming,
		popularMovies,
		isLoadingPopularMovies,
		errorPopularMovies,
		popularActors,
		isLoadingPopularActors,
		errorPopularActors,
	};
}
