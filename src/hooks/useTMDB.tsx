import { fetchFromHandler } from '@/helpers/tmdb';
import { MovieDetailResponse } from '@/types/tmdb';
import {
	isMovieCreditsResponse,
	isMovieDetailResponse,
	isMovieResponse,
	isPeopleDetailResponse,
	isPeopleResponse,
	isPeopleResponseItem,
} from '@/utils/typeGuards';
import { useQuery } from '@tanstack/react-query';

const useTMDB = (
	movieId?: number | null,
	{
		fetchMovieDetail = false,
		fetchMovieCredits = false,
		fetchRecommendations = false,
		fetchActorDetail = false,
		fetchGeneral = false,
	}: {
		fetchMovieDetail?: boolean;
		fetchMovieCredits?: boolean;
		fetchRecommendations?: boolean;
		fetchActorDetail?: boolean;
		fetchGeneral?: boolean;
	} = {}
) => {
	const {
		data: topRated,
		isLoading: isLoadingTopRated,
		error: errorTopRated,
	} = useQuery({
		queryKey: [`TopRated`],
		queryFn: () => fetchFromHandler('top_rated'),
		enabled: fetchGeneral,
	});

	const {
		data: popularMovies,
		isLoading: isLoadingPopularMovies,
		error: errorPopularMovies,
	} = useQuery({
		queryKey: [`PopularMovies`],
		queryFn: () => fetchFromHandler('popular'),
		enabled: fetchGeneral,
	});

	const {
		data: nowPlaying,
		isLoading: isLoadingNowPlaying,
		error: errorNowPlaying,
	} = useQuery({
		queryKey: [`NowPlaying`],
		queryFn: () => fetchFromHandler('now_playing'),
		enabled: fetchGeneral,
	});

	const {
		data: upcoming,
		isLoading: isLoadingUpcoming,
		error: errorUpcoming,
	} = useQuery({
		queryKey: [`Upcoming`],
		queryFn: () => fetchFromHandler('upcoming'),
		enabled: fetchGeneral,
	});

	const {
		data: popularActors,
		isLoading: isLoadingPopularActors,
		error: errorPopularActors,
	} = useQuery({
		queryKey: [`PopularActors`],
		queryFn: () => fetchFromHandler('popular_actors'),
		enabled: fetchGeneral,
	});

	const {
		data: movieDetail,
		isLoading: isLoadingMovieDetail,
		error: errorMovieDetail,
	} = useQuery({
		queryKey: [`MovieDetail`],
		queryFn: () => fetchFromHandler('movie_details', movieId || 0),
		enabled: fetchMovieDetail,
	});

	const {
		data: movieCredits,
		isLoading: isLoadingMovieCredits,
		error: errorMovieCredits,
	} = useQuery({
		queryKey: [`MovieCredits`],
		queryFn: () => fetchFromHandler('movie_credits', movieId || 0),
		enabled: fetchMovieCredits,
	});

	const {
		data: actorDetail,
		isLoading: isLoadingActorDetail,
		error: errorActorDetail,
	} = useQuery({
		queryKey: [`ActorDetail`],
		queryFn: () => fetchFromHandler('actor_details', movieId || 0),
		enabled: fetchActorDetail,
	});

	const {
		data: movieRecommendations,
		isLoading: isLoadingMovieRecommendations,
		error: errorMovieRecommendations,
	} = useQuery({
		queryKey: [`MovieRecommendations`],
		queryFn: () => fetchFromHandler('recommended', movieId || 0),
		enabled: fetchRecommendations,
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
		movieCredits: {
			data: isMovieCreditsResponse(movieCredits) ? movieCredits : null,
			isLoading: isLoadingMovieCredits,
			error: errorMovieCredits,
		},

		actorDetail: {
			data: isPeopleDetailResponse(actorDetail) ? actorDetail : null,
			isLoading: isLoadingActorDetail,
			error: errorActorDetail,
		},
		movieRecommendations: {
			data: isMovieResponse(movieRecommendations) ? movieRecommendations : [],
			isLoading: isLoadingMovieRecommendations,
			error: errorMovieRecommendations,
		},
	};
};

export default useTMDB;
