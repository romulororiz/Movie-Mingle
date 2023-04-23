'use client';

import { CardPerView } from '@/utils/cardPerView';
import { getMoviePath } from '@/utils/getPath';
import { isMovieResponse } from '@/utils/typeGuards';
import { RenderSkeletonCards } from '@/components/ui/SkeletonCard';
import { useAppState } from '@/context/stateContext';
import HeroBg from '@/components/ui/HeroBg';
import SwiperComponent from '@/components/Swiper';
import Section from '@/components/layout/Section';
import ActorCard from '@/components/ui/ActorCard';
import MovieCard from '@/components/ui/MovieCard';
import Overlay from '@/components/ui/Overlay';
import useBgChange, { MovieInfo } from '@/hooks/useSliderChange';
import useTMDB from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';
import SkeletonHero from '@/components/ui/SkeletonHero';
import useScrollPosition from '@/hooks/useScrollPosition';

export default function Home() {
	const { setActiveIndex } = useAppState();
	const { currentImageIndex, previousImageIndex } = useBgChange();
	const windowSize = useWindowSize();
	const scrollPosition = useScrollPosition();

	const { topRated, popularMovies, nowPlaying, upcoming, popularActors } =
		useTMDB();

	if (!popularMovies.data) return null;


	return (
		<div className='min-h-screen'>
			{!popularMovies.isLoading ? (
				<section className='h-[750px] relative overflow-hidden'>
					<Overlay
						className='bg-gradient-to-b from-dark-background/40 from-35%
						   via-dark-background via-45% md:via-65% to-dark-background z-[1]'
					/>
					{
						<HeroBg
							imageKey={`prev-${previousImageIndex}`}
							src={
								getMoviePath(popularMovies.data[previousImageIndex], {
									isBG: true,
								}).backgroundImage
							}
						/>
					}
					<HeroBg
						imageKey={`curr-${currentImageIndex}`}
						src={
							getMoviePath(popularMovies.data[currentImageIndex], {
								isBG: true,
							}).backgroundImage
						}
					/>

					{popularMovies.data[currentImageIndex] && (
						<MovieInfo movie={popularMovies.data[currentImageIndex]} />
					)}
				</section>
			) : (
				<SkeletonHero />
			)}

			<Section
				icon='ThumbsUp'
				title='Recommended' // change upon user preferences
				className='md:-mt-[20rem] -mt-[28rem] z-50'
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
					<RenderSkeletonCards windowSize={windowSize} />
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
					<RenderSkeletonCards windowSize={windowSize} isMovie={true} />
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
					<RenderSkeletonCards windowSize={windowSize} isMovie={true} />
				)}
			</Section>
		</div>
	);
}
