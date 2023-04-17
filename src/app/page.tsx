'use client';

import SwiperComponent from '@/components/Swiper';
import Section from '@/components/layout/Section';
import ActorCard from '@/components/ui/ActorCard';
import MovieCard from '@/components/ui/MovieCard';
import { useAppState } from '@/context/stateContext';
import { fetchFromHandler } from '@/helpers/tmdb';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { CardPerView } from '@/utils/cardPerView';
import { slugify } from '@/utils/formaters';
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
				{isMovieResponse(popularMovies) && (
					<SwiperComponent
						movies={popularMovies}
						onActiveIndexChange={setActiveIndex}
					/>
				)}
			</Section>

			<Section
				icon='Users'
				className='mt-12 md:mt-16'
				title='Popular Actors'
				route='/actors'
				isActor={true}
			>
				{isPeopleResponse(popularActors) &&
					popularActors
						.map(actor => (
							<ActorCard
								key={`actor-${actor.id}`}
								actor={actor}
								route={slugify(`/actors/${actor.name}`)}
							/>
						))
						.slice(0, CardPerView(windowSize))}
			</Section>

			<Section
				icon='Flame'
				className='mt-12 md:mt-28'
				title='Trending this week'
				route='/movies/trending'
			>
				{isMovieResponse(nowPlaying) &&
					nowPlaying
						.map(movie => (
							<MovieCard
								key={`actor-${movie.id}`}
								movie={movie}
								route={slugify(`/movies/${movie.title}`)}
							/>
						))
						.slice(
							0,
							CardPerView(windowSize, { isActor: false, isMovie: true })
						)}
			</Section>

			<Section
				icon='Clapperboard'
				className='mt-12 md:mt-28'
				title='Coming up next'
				route='/movies/coming-up'
			>
				{isMovieResponse(upcoming) &&
					upcoming
						.map(movie => (
							<MovieCard
								key={`actor-${movie.id}`}
								movie={movie}
								route={slugify(`/movie/${movie.title}`)}
							/>
						))
						.slice(
							0,
							CardPerView(windowSize, { isActor: false, isMovie: true })
						)}
			</Section>

			<Section
				icon='Star'
				className='mt-12 md:mt-28 mb-24'
				title='Best of the best'
				route='/movies/top-rated'
			>
				{isMovieResponse(topRated) &&
					topRated
						.map(movie => (
							<MovieCard
								key={`actor-${movie.id}`}
								movie={movie}
								route={slugify(`/movie/${movie.title}`)}
							/>
						))
						.slice(
							0,
							CardPerView(windowSize, { isActor: false, isMovie: true })
						)}
			</Section>

			{/* <Section icon='Star' className='mt-14 mb-24' title='Skeleton'> */}
			{/* create array of 6 skeleton cards */}
			{/* {[...Array(6)].map((_, i) => ( */}
			{/* // <SkeletonCard key={i} /> */}
			{/* ))} */}
			{/* </Section> */}
		</div>
	);
}

// export const getStaticProps: GetStaticProps<StaticProps> = async () => {
// 	const popularMovies = await fetchFromHandler('popular');
// 	const topRated = await fetchFromHandler('top_rated');
// 	const nowPlaying = await fetchFromHandler('now_playing');
// 	const upcoming = await fetchFromHandler('upcoming');
// 	const popularActors = await fetchFromHandler('popular_actors');

// 	if (
// 		!popularMovies ||
// 		!topRated ||
// 		!nowPlaying ||
// 		!upcoming ||
// 		!popularActors
// 	) {
// 		throw new Error('Unexpected data type received');
// 	}

// 	// console.log('topRated', topRated);
// 	console.log('popularMovies', popularMovies);

// 	return {
// 		props: {
// 			popularMovies: popularMovies as MovieResponse[],
// 			topRated: topRated as MovieResponse[],
// 			nowPlaying: nowPlaying as MovieResponse[],
// 			upcoming: upcoming as MovieResponse[],
// 			popularActors: popularActors as PeopleResponse[],
// 		},
// 	};
// };
