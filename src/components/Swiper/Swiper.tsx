'use client';

import { Overlay } from '@/components/ui';
import { isTablet } from '@/utils/breakpoints';
import { getImagePath } from '@/utils/getPath';
import { MovieResponse } from '@/types/tmdb';
import { PlayBtnSwiper } from './PlayBtnSwiper';
import { MovieInfoHero } from '@/components/ui';
import { getSwiperOptions } from '@/lib/swiper';
import { Swiper as SwiperClass } from 'swiper';
import React, { useRef, useState } from 'react';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import Card from '../Cards/Card';
import { cn } from '@/utils/cn';
import 'swiper/swiper-bundle.css';

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
		return 'border border-dark-background';
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
					<div key={`movie-${movie.id}`} className='relative'>
						<Overlay className='spotlight' />
						<SwiperSlide onClick={() => handleClick(index)}>
							<Card
								item={movie}
								className={getMovieCardClass(index)}
								isSlider={true}
							/>
						</SwiperSlide>
					</div>
				))}
				<div className='absolute bottom-0 md:bottom-8 right-0 max-w-7xl mx-auto px-[5rem] left-0 flex -z-[1] w-full justify-end'>
					<PlayBtnSwiper isPlaying={isPlaying} onClick={stopPlayAutoplay} />
				</div>
			</Swiper>
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
		<Swiper {...getSwiperOptions()}>
			{movies.map(movie => (
				<SwiperSlide key={`movie-${movie.id}`}>
					<Image
						src={getImagePath(movie)}
						alt={movie.title}
						width='0'
						height='0'
						sizes='100vw'
						className='w-full h-full'
						priority
					/>
					<MovieInfoHero movie={movie} />
					{/* <Overlay
						className='bg-gradient-to-b from-transparent from-75%
				via-dark-background to-dark-background z-[1]'
					/> */}
				</SwiperSlide>
			))}
		</Swiper>
	);
};

const MemoizedSwiperMobileComponent = React.memo(SwiperMobileComponent);
export { MemoizedSwiperMobileComponent as SwiperMobileComponent };
