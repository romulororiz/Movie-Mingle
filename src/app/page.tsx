'use client';

import { Section } from '@/components/Layout';
import { isTablet } from '@/utils/breakpoints';
import { CardPerView } from '@/utils/cardPerView';
import { useAppState } from '@/context/stateContext';
import { SkeletonHero } from '@/components/ui';
import { HeroBgSection } from '@/components/ui/HeroBg';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { SwiperComponent, SwiperMobileComponent } from '@/components/Swiper';

import useTMDB from '@/hooks/useTMDB';
import useBgChange from '@/hooks/useSliderChange';
import useWindowSize from '@/hooks/useWindowSize';
import Card from '@/components/Cards/Card';

export const fetchCache = 'force-cache';

export default function Home() {
	// Get global state for the current slide index from Swiper
	//see context/stateContext.tsx
	const { setActiveIndex } = useAppState();
	const { currentImageIndex, previousImageIndex } = useBgChange();
	const windowSize = useWindowSize();

	const { topRated, popularMovies, nowPlaying, upcoming, popularActors } =
		useTMDB(null, { fetchGeneral: true });

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
				<Section container={false} route='/movies/popular'>
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
					className='md:-mt-[15rem] z-50'
					container={false}
					route='/movies/popular'
					seeMore={false}
					spotlight={false}
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
				className='mt-7 md:mt-24'
				title='Popular Actors'
				route='/actors'
				isActor={true}
			>
				{!popularActors.isLoading ? (
					popularActors.data
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
				{!nowPlaying.isLoading ? (
					nowPlaying.data
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
				{!upcoming.isLoading ? (
					upcoming.data
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
				{!topRated.isLoading ? (
					topRated.data
						.map(movie => <Card key={`movie-${movie.id}`} item={movie} />)
						.slice(0, CardPerView(windowSize))
				) : (
					<RenderSkeletonCards isMovie={true} />
				)}
			</Section>
		</div>
	);
}
