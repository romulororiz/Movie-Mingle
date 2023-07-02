'use client';

import { Overlay } from '@/components/ui';
import { isTablet } from '@/utils/breakpoints';
import { blurData, cn, getAbsoluteUrl } from '@/lib/utils';
import { MovieResponse } from '@/types/tmdb';
import { PlayBtnSwiper } from '@/components/Swiper';
import { MovieInfoHero } from '@/components/ui';
import { getSwiperOptions } from '@/lib/swiper';
import { Swiper as SwiperClass } from 'swiper';
import React, { useRef, useState } from 'react';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import Image from 'next/image';
import Card from '@/components/Cards/Card';
import 'swiper/swiper-bundle.css';
import { useAppState } from '@/context/stateContext';

// Card Slider Desktop
type SwiperComponentProps = {
	movies: MovieResponse[];
	isLoading: boolean;
};

const SwiperComponent = ({ movies }: SwiperComponentProps) => {
	const [isPlaying, setIsPlaying] = useState(true);

	const { activeIndex, setActiveIndex } = useAppState();

	const swiperRef = useRef<SwiperRef>(null);

	const windowSize: WindowSize = useWindowSize();

	const handleSlideChange = (swiper: SwiperClass) => {
		setActiveIndex(swiper.realIndex);
	};

	const handleClick = (index: number) => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slideToLoop(index, 700);
		}
	};

	const getMovieCardClass = (index: number) => {
		if (index === activeIndex)
			return 'border-2 border-accent-primary after:bg-transparent z-50 md:scale-125';
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
				className='after:sm:block after:absolute 
					  after:top-0 md:after:top-20 after:bottom-0 after:left-0 after:w-20 
					  after:bg-gradient-to-r after:from-dark-background 
					  after:from-0% after:via-dark-background 
					  after:via-20% after:z-[2]'
			/>
			<Overlay
				className='before:sm:block before:absolute 
					  before:top-0 md:before:top-20 before:bottom-0 before:right-0 before:w-20 
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
						onClick={() => handleClick(index)}
						key={`movie-${movie.id}`}
					>
						<Card
							item={movie}
							className={getMovieCardClass(index)}
							isSlider={true}
						/>
					</SwiperSlide>
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
	const [isImgLoading, setIsImgLoading] = useState(true);

	return (
		<Swiper {...getSwiperOptions()}>
			{movies.map(movie => (
				<SwiperSlide key={`movie-${movie.id}`}>
					<Image
						src={getAbsoluteUrl(
							'https://image.tmdb.org/t/p/w780',
							movie.poster_path
						)}
						alt={movie.title}
						width='0'
						height='0'
						sizes='(max-width: 640px) 100vw, 640px'
						className={cn(
							'w-full h-screen',
							isImgLoading
								? 'grayscale blur-2xl scale-100 duration-200'
								: 'grayscale-0 blur-0 scale-100 duration-200'
						)}
						placeholder='blur'
						blurDataURL={blurData}
						onLoadingComplete={() => setIsImgLoading(false)}
						style={{
							objectFit: 'cover',
						}}
					/>
					<MovieInfoHero movie={movie} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

const MemoizedSwiperMobileComponent = React.memo(SwiperMobileComponent);
export { MemoizedSwiperMobileComponent as SwiperMobileComponent };
