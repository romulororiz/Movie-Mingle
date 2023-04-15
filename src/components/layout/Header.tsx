'use client';

import { useSidebarContext } from '@/context/sidebarContext';
import useTMDB from '@/hooks/useTMDB';
import { renderBgImages } from '@/utils/renderBg';
import { isMovieResponse } from '@/utils/typeGuards';
import { useState } from 'react';
import SwiperComponent from '../Swiper';
import Section from './Section';

export const Header = () => {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const { sidebarOpen } = useSidebarContext();

	const { popularMovies, isLoadingPopularMovies, errorPopularMovies } =
		useTMDB();

	return (
		<header className='h-[80vh] bg-cover bg-no-repeat bg-center relative'>
			<div className='absolute inset-0 w-full h-full'>
				{isMovieResponse(popularMovies) &&
					renderBgImages(popularMovies, activeIndex)}
			</div>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent from-45% via-dark-background via-[70%] to-dark-background'></div>

			{/* //todo fix top header server component error *}}
			{/* <TopHeader /> */}

			<Section
				container={false}
				icon='ThumbsUp'
				title='Recommended 4 u' // change upon user preferences
				className='absolute top-[50vh] left-0 right-0 z-50'
				sidebarOpen={sidebarOpen}
			>
				{isMovieResponse(popularMovies) && (
					<SwiperComponent
						movies={popularMovies}
						onActiveIndexChange={setActiveIndex}
					/>
				)}
			</Section>
		</header>
	);
};
