'use client';

import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { MovieResponse } from '@/types/tmdb';
import { isTablet } from '@/utils/breakpoints';
import { cn } from '@/utils/cn';
import { getSwiperOptions } from '@/utils/swiper';
import { useEffect, useState } from 'react';
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
	const [swiper, setSwiper] = useState<SwiperClass | null>(null); // [state, setState
	const [activeIndex, setActiveIndex] = useState(0);
	const windowSize: WindowSize = useWindowSize();

	const handleSlideChange = (swiper: SwiperClass) => {
		setActiveIndex(swiper.realIndex);
		onActiveIndexChange(swiper.realIndex);
	};

	const handleSlideClick = (index: number) => {
		if (swiper) {
			swiper.slideTo(index);
			setActiveIndex(index);
			onActiveIndexChange(index);
		}
	};

	// Get the class based on the active slide index
	const getMovieCardClass = (index: number) => {
		if (index === activeIndex)
			return 'border-2 border-accent-default after:bg-transparent';
		return '';
	};

	return (
		<>
			<Swiper
				{...getSwiperOptions(windowSize)}
				onSlideChange={handleSlideChange}
			>
				{movies.map((movie, index) => (
					<SwiperSlide key={`movie-${movie.id}`}>
						<div
							className={cn('flex justify-center w-full', {
								'w-11/12': !!isTablet(windowSize),
							})}
						>
							<MovieCard
								movie={movie}
								className={getMovieCardClass(index)}
								onClick={() => handleSlideClick(index)}
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
		// w-11/12
	);
};

export default SwiperComponent;
