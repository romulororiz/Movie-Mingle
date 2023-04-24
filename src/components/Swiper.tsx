'use client';

import React, { useRef, useState, useMemo } from 'react';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { getSwiperOptions } from '@/lib/swiper';
import { MovieResponse } from '@/types/tmdb';
import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import PlayBtnSwiper from './ui/PlayBtnSwiper';
import MovieCard from './ui/MovieCard';
import Overlay from './ui/Overlay';
import { isTablet } from '@/utils/breakpoints';
import 'swiper/swiper-bundle.css';
import { MovieInfo } from '@/hooks/useSliderChange';

// Card Slider Desktop
type SwiperComponentProps = {
	movies: MovieResponse[];
	onActiveIndexChange: (index: number) => void;
	isLoading: boolean;
};

const SwiperComponent = ({
	movies,
	onActiveIndexChange,
}: SwiperComponentProps) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);

	const swiperRef = useRef<SwiperRef>(null);

	const windowSize: WindowSize = useWindowSize();

	const handleSlideChange = (swiper: SwiperClass) => {
		setActiveIndex(swiper.realIndex);
		onActiveIndexChange(swiper.realIndex);
	};

	const handleClick = (index: number) => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slideToLoop(index, 700);
		}
	};

	const getMovieCardClass = (index: number) => {
		if (index === activeIndex)
			return 'border-2 border-primaryAccent-default after:bg-transparent z-50 md:scale-125';
		return '';
	};

	const stopPlayAutoplay = () => {
		if (swiperRef.current) {
			if (swiperRef.current.swiper.autoplay.running.valueOf() === true) {
				swiperRef.current.swiper.autoplay.stop();
				setIsPlaying(false);
			} else {
				swiperRef.current.swiper.autoplay.start();
				setIsPlaying(true);
			}
		}
	};

	// stop autoplay on mobile
	if (isTablet(windowSize)) {
		if (swiperRef.current) {
			if (swiperRef.current.swiper.autoplay.running.valueOf() === true) {
				swiperRef.current.swiper.autoplay.stop();
				setIsPlaying(false);
			}
		}
	}

	return (
		<>
			<Overlay
				className='after:hidden after:sm:block after:absolute 
					  after:top-0 md:after:top-14 after:bottom-0 after:left-0 after:w-20 
					  after:bg-gradient-to-r after:from-dark-background 
					  after:from-0% after:via-dark-background 
					  after:via-20% after:z-[2]'
			/>
			<Overlay
				className='before:hidden before:sm:block before:absolute 
					  before:top-0 md:before:top-14 before:bottom-0 before:right-0 before:w-20 
					  before:bg-gradient-to-l before:from-dark-background 
					  before:from-0% before:via-dark-background 
					  before:via-20% before:z-[2]'
			/>
			<Swiper
				{...getSwiperOptions(windowSize)}
				onSlideChange={handleSlideChange}
				ref={swiperRef}
			>
				{movies.map((movie, index) => (
					<SwiperSlide
						key={`movie-${movie.id}`}
						onClick={() => handleClick(index)}
						className='flex justify-center w-full '
					>
						<MovieCard
							movie={movie}
							className={getMovieCardClass(index)}
							isCurrentSlide={index === activeIndex}
							isSlider={true}
							route='#'
						/>
					</SwiperSlide>
				))}
			</Swiper>

			{/* play / pause based on actual state */}
			<div className='absolute bottom-0 md:bottom-8 right-0 max-w-7xl mx-auto container left-0 flex z-50 w-full justify-end'>
				<PlayBtnSwiper isPlaying={isPlaying} onClick={stopPlayAutoplay} />
			</div>
		</>
	);
};

const MemoizedSwiperComponent = React.memo(SwiperComponent);
export { MemoizedSwiperComponent as SwiperComponent };

// ----------------------------------------------

// Full Bg Slide Mobile
type SwiperMobileComponentProps = {
	movies: MovieResponse[];
	isLoading: boolean;
};

const SwiperMobileComponent = ({ movies }: SwiperMobileComponentProps) => {
	return (
		<div className='relative'>
			<Swiper {...getSwiperOptions()}>
				{movies.map(movie => (
					<SwiperSlide key={`movie-${movie.id}`}>
						<MovieCard
							movie={movie}
							isSlider={true}
							route='#'
							className='pointer-events-none rounded-none after:rounded-none shadow-none after:bg-transparent'
						/>
						<MovieInfo movie={movie} />
						<Overlay
							className='bg-gradient-to-b from-transparent from-45%
						via-dark-background via-[90%] to-dark-background z-[1]'
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

const MemoizedSwiperMobileComponent = React.memo(SwiperMobileComponent);
export { MemoizedSwiperMobileComponent as SwiperMobileComponent };
