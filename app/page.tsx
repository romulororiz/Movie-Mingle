'use client';

import Card from '@/components/Cards/Card';
import { Section } from '@/components/Layout';
import { SkeletonHero } from '@/components/ui';
import { isTablet } from '@/utils/breakpoints';
import { CardPerView } from '@/utils/cardPerView';
import useWindowSize from '@/hooks/useWindowSize';
import { HeroBgSection } from '@/components/ui/HeroBg';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { SwiperComponent, SwiperMobileComponent } from '@/components/Swiper';

import {
	useNowPlaying,
	usePopularActors,
	usePopularMovies,
	useTopRated,
	useUpcoming,
} from '@/hooks/useTMDB';

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
		<div className='min-h-screen'>
			{!popularMoviesLoading ? (
				<HeroBgSection popularMovies={popularMovies} />
			) : (
				<SkeletonHero />
			)}

			{/* {isTablet(windowSize) ? (
				<Section container={false} route='/movies/popular'>
					{!popularMoviesLoading ? (
						<SwiperMobileComponent
							movies={popularMovies}
							isLoading={popularMoviesLoading}
						/>
					) : (
						<RenderSkeletonCards isMovie={true} isCardSlider={true} />
					)}
				</Section>
			) : (
				<Section
					icon='ThumbsUp'
					title='Popular' // change upon user preferences
					className='md:-mt-[15rem] z-50'
					container={false}
					route='/movies/popular'
					seeMore={false}
					spotlight={false}
				>
					{!popularMoviesLoading ? (
						<SwiperComponent
							movies={popularMovies}
							isLoading={popularMoviesLoading}
						/>
					) : (
						<RenderSkeletonCards isMovie={true} isCardSlider={true} />
					)}
				</Section>
			)} */}

			<Section
				icon='ThumbsUp'
				title='Popular' // change upon user preferences
				className='mt-[8rem] md:-mt-[22rem] z-50'
				container={false}
				route='/movies/popular'
				seeMore={false}
				spotlight={false}
			>
				{!popularMoviesLoading ? (
					<SwiperComponent
						movies={popularMovies}
						isLoading={popularMoviesLoading}
					/>
				) : (
					<RenderSkeletonCards isMovie={true} isCardSlider={true} />
				)}
			</Section>

			<Section
				icon='Users'
				className='mt-7 md:mt-24'
				title='Popular Actors'
				route='/actors'
				isActor={true}
			>
				{!popularActorsLoading ? (
					popularActors
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
				icon='Flame'
				className='mt-12 md:mt-40'
				title='Trending this week'
				route='/movies/trending'
			>
				{!nowPlayingLoading ? (
					nowPlaying
						.map(movie => <Card key={`movie-${movie.id}`} item={movie} />)
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards />
				)}
			</Section>

			<Section
				icon='Clapperboard'
				className='mt-12 md:mt-40'
				title='Coming up next'
				route='/movies/coming-up'
			>
				{!upcomingLoading ? (
					upcoming
						.map(movie => <Card key={`movie-${movie.id}`} item={movie} />)
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards isMovie={true} />
				)}
			</Section>

			<Section
				icon='Star'
				className='mt-12 md:mt-40 mb-28'
				title='Best of the best'
				route='/movies/top-rated'
			>
				{!topRatedLoading ? (
					topRated
						.map(movie => <Card key={`movie-${movie.id}`} item={movie} />)
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards isMovie={true} />
				)}
			</Section>
		</div>
	);
}
