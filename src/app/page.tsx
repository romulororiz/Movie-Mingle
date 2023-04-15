'use client';

import Section from '@/components/layout/Section';
import ActorCard from '@/components/ui/ActorCard';
import MovieCard from '@/components/ui/MovieCard';
import { useSidebarContext } from '@/context/sidebarContext';
import useTMDB from '@/hooks/useTMDB';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { actorCardPerView } from '@/utils/cardPerView';
import { cn } from '@/utils/cn';
import { isMovieResponse, isPeopleResponse } from '@/utils/typeGuards';

export default function Home() {
	const { sidebarOpen } = useSidebarContext();

	const windowSize: WindowSize = useWindowSize();

	const {
		topRated,
		isLoadingTopRated,
		errorTopRated,
		nowPlaying,
		isLoadingNowPlaying,
		errorNowPlaying,
		upcoming,
		isLoadingUpcoming,
		errorUpcoming,
		popularActors,
		isLoadingPopularActors,
		errorPopularActors,
	} = useTMDB();

	return (
		<div
			className={cn('transition-all duration-200 ease-linear', {
				'md:ml-60': sidebarOpen,
			})}
		>
			<Section
				icon='Users'
				className='mt-[10rem] md:mt-[10rem]'
				title='Popular Actors'
			>
				{isPeopleResponse(popularActors) &&
					popularActors
						.map(actor => <ActorCard key={`actor-${actor.id}`} actor={actor} />)
						.slice(0, actorCardPerView(windowSize))}
			</Section>

			<Section
				icon='Flame'
				className='mt-16 md:mt-24'
				title='Trending this week'
			>
				{isMovieResponse(nowPlaying) &&
					nowPlaying
						.map(movie => <MovieCard key={`actor-${movie.id}`} movie={movie} />)
						.slice(0, 5)}
			</Section>

			<Section
				icon='Clapperboard'
				className='mt-16 md:mt-24'
				title='Coming up next'
			>
				{isMovieResponse(upcoming) &&
					upcoming
						.map(movie => <MovieCard key={`actor-${movie.id}`} movie={movie} />)
						.slice(0, 5)}
			</Section>

			<Section
				icon='Star'
				className='mt-16 md:mt-24 mb-24'
				title='Best of the best'
			>
				{isMovieResponse(topRated) &&
					topRated
						.map(movie => <MovieCard key={`actor-${movie.id}`} movie={movie} />)
						.slice(0, 5)}
			</Section>
		</div>
	);
}
