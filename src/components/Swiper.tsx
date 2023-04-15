'use client';

import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { getSwiperOptions } from '@/lib/swiper';
import { MovieResponse } from '@/types/tmdb';
import { isTablet } from '@/utils/breakpoints';
import { cn } from '@/utils/cn';
import { useState } from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import MovieCard from './ui/MovieCard';

type SwiperComponentProps = {
	movies: MovieResponse[];
	onActiveIndexChange: (index: number) => void;
};

const SwiperComponent = ({
	movies,
	onActiveIndexChange,
}: SwiperComponentProps) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const windowSize: WindowSize = useWindowSize();

	const handleSlideChange = (swiper: SwiperClass) => {
		setActiveIndex(swiper.realIndex);
		onActiveIndexChange(swiper.realIndex);
	};

	const getMovieCardClass = (index: number) => {
		if (index === activeIndex)
			return 'border-2 border-accent-default after:bg-transparent z-50 lg:scale-125';
		return '';
	};

	return (
		<div className='relative'>
			<Swiper
				{...getSwiperOptions(windowSize)}
				onSlideChange={handleSlideChange}
			>
				{movies.map((movie, index) => (
					<SwiperSlide key={`movie-${movie.id}`}>
						<div className='flex justify-center w-11/12 md:w-full'>
							<MovieCard movie={movie} className={getMovieCardClass(index)} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div
				className='hidden sm:block absolute top-0 bottom-0 left-0 w-20 md:left-0 bg-gradient-to-r
						 from-dark-background from-0% via-dark-background via-20% to-transparent z-50'
			></div>
			<div
				className='hidden sm:block absolute top-0 bottom-0 right-0 w-20 md:right-0 bg-gradient-to-l
						 from-dark-background from-0% via-dark-background via-20% to-transparent z-50'
			></div>
		</div>
	);
};

export default SwiperComponent;
