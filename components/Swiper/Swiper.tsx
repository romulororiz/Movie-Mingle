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

	const currSlide = (index: number) => {
		return index === activeIndex;
	};

	const handleSlideChange = (swiper: SwiperClass) => {
		setActiveIndex(swiper.realIndex);
	};

	const handleClick = (index: number) => {
		if (swiperRef.current) {
			swiperRef.current.swiper.slideToLoop(index, 700);
		}
	};

	const getMovieCardClass = (index: number) => {
		if (currSlide(index))
			return 'border-2 border-accent-primary after:bg-transparent z-50 scale-[1.10] md:scale-125';
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

	return (
		<>
			<Overlay
				className='after:hidden after:sm:block after:absolute 
					  after:top-0 md:after:top-20 after:bottom-0 after:left-0 after:w-20 
					  after:bg-gradient-to-r after:from-dark-background 
					  after:from-0% after:via-dark-background 
					  after:via-20% after:z-[2]'
			/>
			<Overlay
				className='before:hidden before:sm:block before:absolute 
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
							isCurrSlide={currSlide(index)}
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
