'use client';

import SwiperComponent from '@/components/Swiper';
import Section from '@/components/layout/Section';
import ActorCard from '@/components/ui/ActorCard';
import MovieCard from '@/components/ui/MovieCard';
import { RenderSkeletonCards } from '@/components/ui/SkeletonCard';
import { useAppState } from '@/context/stateContext';
import { fetchFromHandler } from '@/helpers/tmdb';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { CardPerView } from '@/utils/cardPerView';
import { isMovieResponse, isPeopleResponse } from '@/utils/typeGuards';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
	const { setActiveIndex } = useAppState();
	const { sidebarOpen } = useAppState();

	const windowSize: WindowSize = useWindowSize();

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

	const isLoading = true;

	return (
		<div className='min-h-screen'>
			<Section
				icon='ThumbsUp'
				title='Recommended' // change upon user preferences
				className='-mt-[13rem] z-50'
				sidebarOpen={sidebarOpen}
				container={false}
				route='/movies/popular'
			>
				{!isLoadingPopularMovies && isMovieResponse(popularMovies) ? (
					<SwiperComponent
						movies={popularMovies}
						onActiveIndexChange={setActiveIndex}
						isLoading={isLoadingPopularMovies}
					/>
				) : (
					<RenderSkeletonCards
						windowSize={windowSize}
						isMovie={true}
						isSlider={true}
					/>
				)}
			</Section>

			<Section
				icon='Users'
				className='mt-12 md:mt-20'
				title='Popular Actors'
				route='/actors'
				isActor={true}
			>
				{!isLoadingPopularActors && isPeopleResponse(popularActors) ? (
					popularActors
						.map(actor => (
							<ActorCard
								key={`actor-${actor.id}`}
								actor={actor}
								route={`/actors/${actor.name}`}
							/>
						))
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards
						windowSize={windowSize}
						isMovie={false}
						isActor={true}
					/>
				)}
			</Section>

			<Section
				icon='Flame'
				className='mt-12 md:mt-40'
				title='Trending this week'
				route='/movies/trending'
			>
				{!isLoadingNowPlaying && isMovieResponse(nowPlaying) ? (
					nowPlaying
						.map(movie => (
							<MovieCard
								key={`actor-${movie.id}`}
								movie={movie}
								route={`/movies/${movie.title}`}
							/>
						))
						.slice(
							0,
							CardPerView(windowSize, { isActor: false, isMovie: true })
						)
				) : (
					<RenderSkeletonCards windowSize={windowSize} />
				)}
			</Section>

			<Section
				icon='Clapperboard'
				className='mt-12 md:mt-40'
				title='Coming up next'
				route='/movies/coming-up'
			>
				{!isLoadingUpcoming && isMovieResponse(upcoming) ? (
					upcoming
						.map(movie => (
							<MovieCard
								key={`actor-${movie.id}`}
								movie={movie}
								route={`/movie/${movie.title}`}
							/>
						))
						.slice(
							0,
							CardPerView(windowSize, { isActor: false, isMovie: true })
						)
				) : (
					<RenderSkeletonCards windowSize={windowSize} isMovie={true} />
				)}
			</Section>

			<Section
				icon='Star'
				className='mt-12 md:mt-40 mb-24'
				title='Best of the best'
				route='/movies/top-rated'
			>
				{!isLoadingTopRated && isMovieResponse(topRated) ? (
					topRated
						.map(movie => (
							<MovieCard
								key={`actor-${movie.id}`}
								movie={movie}
								route={`/movie/${movie.title}`}
							/>
						))
						.slice(
							0,
							CardPerView(windowSize, { isActor: false, isMovie: true })
						)
				) : (
					<RenderSkeletonCards windowSize={windowSize} isMovie={true} />
				)}
			</Section>
		</div>
	);
}

// {[
// 	...Array(CardPerView(windowSize, { isActor: false, isMovie: true })),
// ].map((_, i) => (
// 	<SkeletonCard key={`skeleton-${i}`} />
// ))}
