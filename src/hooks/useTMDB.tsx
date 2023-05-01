import { fetchFromHandler } from '@/helpers/tmdb';
import { MovieDetailResponse } from '@/types/tmdb';
import {
	isMovieDetailResponse,
	isMovieResponse,
	isPeopleResponse,
} from '@/utils/typeGuards';
import { useQuery } from '@tanstack/react-query';

const useTMDB = (movieId?: number, fetchOnlyDetail: boolean = false) => {
	const {
		data: topRated,
		isLoading: isLoadingTopRated,
		error: errorTopRated,
	} = useQuery({
		queryKey: [`TopRated`],
		queryFn: () => fetchFromHandler('top_rated'),
		enabled: !fetchOnlyDetail,
	});

	const {
		data: popularMovies,
		isLoading: isLoadingPopularMovies,
		error: errorPopularMovies,
	} = useQuery({
		queryKey: [`PopularMovies`],
		queryFn: () => fetchFromHandler('popular'),
		enabled: !fetchOnlyDetail,
	});

	const {
		data: nowPlaying,
		isLoading: isLoadingNowPlaying,
		error: errorNowPlaying,
	} = useQuery({
		queryKey: [`NowPlaying`],
		queryFn: () => fetchFromHandler('now_playing'),
		enabled: !fetchOnlyDetail,
	});

	const {
		data: upcoming,
		isLoading: isLoadingUpcoming,
		error: errorUpcoming,
	} = useQuery({
		queryKey: [`Upcoming`],
		queryFn: () => fetchFromHandler('upcoming'),
		enabled: !fetchOnlyDetail,
	});

	const {
		data: popularActors,
		isLoading: isLoadingPopularActors,
		error: errorPopularActors,
	} = useQuery({
		queryKey: [`PopularActors`],
		queryFn: () => fetchFromHandler('popular_actors'),
		enabled: !fetchOnlyDetail,
	});

	const {
		data: movieDetail,
		isLoading: isLoadingMovieDetail,
		error: errorMovieDetail,
	} = useQuery({
		queryKey: [`MovieDetail`],
		queryFn: () => fetchFromHandler('movie_details', movieId),
		enabled: fetchOnlyDetail,
	});

	const {
		data: movieRecommendations,
		isLoading: isLoadingMovieRecommendations,
		error: errorMovieRecommendations,
	} = useQuery({
		queryKey: [`MovieRecommendations`],
		queryFn: () => fetchFromHandler('recommended', movieId),
		enabled: fetchOnlyDetail,
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
		movieDetail: {
			data: isMovieDetailResponse(movieDetail) ? movieDetail : null,
			isLoading: isLoadingMovieDetail,
			error: errorMovieDetail,
		},
		movieRecommendations: {
			data: isMovieResponse(movieRecommendations) ? movieRecommendations : [],
			isLoading: isLoadingMovieRecommendations,
			error: errorMovieRecommendations,
		},
	};
};

export default useTMDB;
