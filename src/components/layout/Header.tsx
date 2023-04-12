'use client';

import useTMDB from '@/hooks/useTMDB';
import { MovieResponse } from '@/types/tmdb';
import { isMovieResponse } from '@/utils/typeGuards';
import { useEffect, useState } from 'react';
import SwiperComponent from '../Swiper';
import Section from './Section';

export const Header = () => {
	const [activeIndex, setActiveIndex] = useState<number>(0);
	const [popularMoviesData, setPopularMoviesData] = useState<MovieResponse[]>();

	const {
		data: { popularMovies },
	} = useTMDB();

	// Store popular movies data in state to prevent re-rendering
	useEffect(() => {
		if (popularMovies) {
			setPopularMoviesData(popularMovies);
		}
	}, [popularMovies]);

	// Render background images for header component with opacity transition
	const renderBackgroundImages = () => {
		if (!isMovieResponse(popularMoviesData)) return null;

		// fix key error
		return popularMoviesData.map((movie, index) => (
			<div
				key={`bg-${movie.id}`}
				className='absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-500'
				style={{
					opacity: index === activeIndex ? 1 : 0,
					backgroundImage: `${
						movie.backdrop_path
							? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
							: `url(/images/no-image.jpg)`
					}`,
				}}
			></div>
		));
	};

	return (
		<header className='h-[80vh] relative bg-cover bg-no-repeat bg-center'>
			<div className='absolute inset-0 w-full h-full'>
				{renderBackgroundImages()}
			</div>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent from-45% via-dark-background via-[70%] to-dark-background'></div>

			{/* //todo fix top header server component error *}}
			{/* <TopHeader /> */}

			<Section
				container={false}
				icon='ThumbsUp'
				title='Recommended 4 u' // change upon user preferences
				className='absolute top-[50vh] left-0 right-0 z-50'
			>
				{isMovieResponse(popularMovies) && (
					<div className='overflow-hidden relative'>
						<SwiperComponent
							movies={popularMovies}
							onActiveIndexChange={setActiveIndex}
						/>
						<div
							className='hidden md:block absolute top-0 bottom-0 left-0 w-20 md:left-0 bg-gradient-to-r
						 from-dark-background from-0% via-dark-background via-20% to-transparent z-50'
						></div>
						<div
							className='hidden md:block absolute top-0 bottom-0 right-0 w-20 md:right-0 bg-gradient-to-l
						 from-dark-background from-0% via-dark-background via-20% to-transparent z-50'
						></div>
					</div>
				)}
			</Section>
		</header>
	);
};
