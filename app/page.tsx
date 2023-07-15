'use client';

import Card from '@/components/Cards/Card';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import { SwiperComponent } from '@/components/Swiper';
import { HeroBgSection } from '@/components/ui/HeroBg';
import useWindowSize from '@/hooks/useWindowSize';
import { CardPerView } from '@/utils/cardPerView';

import {
	useNowPlaying,
	usePopularActors,
	usePopularMovies,
	useTopRated,
	useUpcoming,
} from '@/hooks/useTMDB';
import { isMobile, isTablet } from '@/utils/breakpoints';

export default function Home() {
	const windowSize = useWindowSize();

	const { data: popularMovies, isLoading: popularMoviesLoading } =
		usePopularMovies();

	const { data: popularActors, isLoading: popularActorsLoading } =
		usePopularActors();

	const { data: topRated, isLoading: topRatedLoading } = useTopRated();

	const { data: nowPlaying, isLoading: nowPlayingLoading } = useNowPlaying();

	const { data: upcoming, isLoading: upcomingLoading } = useUpcoming();

	return (
		<>
			<HeroBgSection
				isLoading={nowPlayingLoading}
				trendingMovies={nowPlaying?.results!}
				isMobile={isTablet(windowSize)}
			/>

			<Section
				icon='Flame'
				title='Hottest Right Now' // change upon user preferences
				className='mt-[7rem] md:-mt-[22rem] z-50 text-center'
				container={false}
				route='/movies/trending'
				seeMore={false}
			>
				{!nowPlayingLoading ? (
					<SwiperComponent
						movies={nowPlaying?.results!}
						isLoading={popularMoviesLoading}
					/>
				) : (
					<RenderSkeletonCards isMovie={true} isCardSlider={true} />
				)}
			</Section>

			<Section
				icon='Users'
				className='mt-14 md:mt-24'
				title='Trending Actors'
				route='/actors/popular'
				isActor={true}
			>
				{!popularActorsLoading ? (
					popularActors?.results
						.map(actor => <Card key={`actor-${actor.id}`} item={actor} />)
						.slice(
							0,
							CardPerView(windowSize, { isActor: true, isMovie: false })
						)
				) : (
					<RenderSkeletonCards isMovie={false} isActor={true} />
				)}
			</Section>

			<Section
				icon='ThumbsUp'
				className='mt-16 md:mt-40'
				title='Popular'
				route='/movies/popular'
			>
				{!popularMoviesLoading ? (
					popularMovies?.results
						.map(movie => <Card key={`movie-${movie.id}`} item={movie} />)
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards />
				)}
			</Section>

			<Section
				icon='Clapperboard'
				className='mt-16 md:mt-40'
				title='Coming up next'
				route='/movies/coming-up'
			>
				{!upcomingLoading ? (
					upcoming?.results
						.map(movie => <Card key={`movie-${movie.id}`} item={movie} />)
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards isMovie={true} />
				)}
			</Section>

			<Section
				icon='Star'
				className='mt-16 md:mt-40 mb-16'
				title='All Time Best'
				route='/movies/top-rated'
			>
				{!topRatedLoading ? (
					topRated?.results
						.map(movie => <Card key={`movie-${movie.id}`} item={movie} />)
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards isMovie={true} />
				)}
			</Section>
		</>
	);
}
