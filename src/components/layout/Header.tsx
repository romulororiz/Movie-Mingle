'use client';

import { useSidebarContext } from '@/context/sidebarContext';
import useTMDB from '@/hooks/useTMDB';
import { renderHeaderImages } from '@/utils/renderBg';
import { isMovieResponse } from '@/utils/typeGuards';
import { Dispatch, SetStateAction, useState } from 'react';
import SwiperComponent from '../Swiper';
import Section from './Section';
import { cn } from '@/utils/cn';

interface headerProps {
	activeIndex: number;
}

export const Header = ({ activeIndex }: headerProps) => {
	const { sidebarOpen } = useSidebarContext();

	const { popularMovies, isLoadingPopularMovies, errorPopularMovies } =
		useTMDB();

	return (
		<header className='h-[750px] bg-cover bg-no-repeat bg-center relative'>
			<div className='absolute inset-0 w-full h-full'>
				{isMovieResponse(popularMovies) &&
					renderHeaderImages(popularMovies, activeIndex)}
			</div>
			<div className='absolute inset-0 bg-gradient-to-b from-transparent from-35% via-dark-background via-[75%] to-dark-background'></div>

			{/* //todo fix top header server component error *}}
			{/* <TopHeader /> */}

			{/* <div
				className={cn('relative transition-all duration-200 ease-linear', {
					'xl:ml-60': sidebarOpen,
				})}
			> */}
			{/* <Section
					icon='ThumbsUp'
					title='Recommended 4 u' // change upon user preferences
					className='absolute top-[50vh] left-0 right-0 z-50'
					sidebarOpen={sidebarOpen}
					container={false}
				>
					{isMovieResponse(popularMovies) && (
						<SwiperComponent
							movies={popularMovies}
							onActiveIndexChange={setActiveIndex}
						/>
					)}
				</Section> */}
			{/* //todo thiunk about pagination dynamic */}
			{/* </div> */}
		</header>
	);
};
