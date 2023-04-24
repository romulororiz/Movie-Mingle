'use client';

import { isTablet } from '@/utils/breakpoints';
import { CardPerView } from '@/utils/cardPerView';
import { useAppState } from '@/context/stateContext';
import { HeroBgSection } from '@/components/ui/HeroBg';
import { RenderSkeletonCards } from '@/components/ui/SkeletonCard';

import Section from '@/components/Section';
import useTMDB from '@/hooks/useTMDB';
import ActorCard from '@/components/ui/ActorCard';
import MovieCard from '@/components/ui/MovieCard';
import useBgChange from '@/hooks/useSliderChange';
import SkeletonHero from '@/components/ui/SkeletonHero';
import useWindowSize from '@/hooks/useWindowSize';
import { SwiperComponent, SwiperMobileComponent } from '@/components/Swiper';

export default function Home() {
	// Get global state for the current slide index from Swiper
	//see context/stateContext.tsx
	const { setActiveIndex } = useAppState();
	const { currentImageIndex, previousImageIndex } = useBgChange();
	const windowSize = useWindowSize();

	const { topRated, popularMovies, nowPlaying, upcoming, popularActors } =
		useTMDB();

	if (!popularMovies.data) return null;

	return (
		<div className='min-h-screen'>
			{!popularMovies.isLoading ? (
				<HeroBgSection
					currentImageIndex={currentImageIndex}
					previousImageIndex={previousImageIndex}
					popularMovies={popularMovies.data}
				/>
			) : (
				<SkeletonHero />
			)}

			{isTablet(windowSize) ? (
				<Section container={false} route='/movies/popular' className='mt-16'>
					{!popularMovies.isLoading ? (
						<SwiperMobileComponent
							movies={popularMovies.data}
							isLoading={popularMovies.isLoading}
						/>
					) : (
						<RenderSkeletonCards isMovie={true} isCardSlider={true} />
					)}
				</Section>
			) : (
				<Section
					icon='ThumbsUp'
					title='Recommended' // change upon user preferences
					className='md:-mt-[20rem] z-50'
					container={false}
					route='/movies/popular'
				>
					{!popularMovies.isLoading ? (
						<SwiperComponent
							movies={popularMovies.data}
							onActiveIndexChange={setActiveIndex}
							isLoading={popularMovies.isLoading}
						/>
					) : (
						<RenderSkeletonCards isMovie={true} isCardSlider={true} />
					)}
				</Section>
			)}

			<Section
				icon='Users'
				className='mt-12 md:mt-20'
				title='Popular Actors'
				route='/actors'
				isActor={true}
			>
				{!popularActors.isLoading ? (
					popularActors.data
						.map(actor => (
							<ActorCard
								key={`actor-${actor.id}`}
								actor={actor}
								route={`/actors/${actor.name}`}
							/>
						))
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
				{!nowPlaying.isLoading ? (
					nowPlaying.data
						.map(movie => (
							<MovieCard
								key={`movie-${movie.id}`}
								movie={movie}
								route={`/movies/${movie.title}`}
							/>
						))
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
				{!upcoming.isLoading ? (
					upcoming.data
						.map(movie => (
							<MovieCard
								key={`movie-${movie.id}`}
								movie={movie}
								route={`/movies/${movie.title}`}
							/>
						))
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards isMovie={true} />
				)}
			</Section>

			<Section
				icon='Star'
				className='mt-12 md:mt-40 mb-24'
				title='Best of the best'
				route='/movies/top-rated'
			>
				{!topRated.isLoading ? (
					topRated.data
						.map(movie => (
							<MovieCard
								key={`movie-${movie.id}`}
								movie={movie}
								route={`/movies/${movie.title}`}
							/>
						))
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards isMovie={true} />
				)}
			</Section>
		</div>
	);
}
