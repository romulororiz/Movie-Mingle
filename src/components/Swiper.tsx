'use client';

import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { getSwiperOptions } from '@/lib/swiper';
import { MovieResponse } from '@/types/tmdb';
import { useRef, useState } from 'react';
import { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import MovieCard from './ui/MovieCard';
import Icon from './Icon';
import { RenderSkeletonCards } from './ui/SkeletonCard';

const PlayButton = ({
	isPlaying,
	onClick,
}: {
	isPlaying: boolean;
	onClick: () => void;
}) => {
	return (
		<div
			onClick={onClick}
			className='absolute bottom-0 md:bottom-8 right-0 z-[80] cursor-pointer max-w-7xl mx-auto w-full container left-0 flex justify-end'
		>
			{isPlaying ? (
				<Icon name='Pause' fill='white' color='white' size={26} />
			) : (
				<Icon name='Play' fill='white' color='white' size={26} />
			)}
		</div>
	);
};

type SwiperComponentProps = {
	movies: MovieResponse[];
	onActiveIndexChange: (index: number) => void;
	isLoading: boolean;
};

const SwiperComponent = ({
	movies,
	isLoading,
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
			return 'border-2 border-accent-default after:bg-transparent z-50 md:scale-125';
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

	return (
		<div
			className='relative 
					  after:hidden after:xs:block after:absolute 
					  after:top-0 after:bottom-0 after:left-0 after:w-20 
					  after:bg-gradient-to-r after:from-dark-background 
					  after:from-0% after:via-dark-background 
					  after:via-20% after:z-[65]
					  before:hidden before:xs:block before:absolute 
					  before:top-0 before:bottom-0 before:right-0 before:w-20 
					  before:bg-gradient-to-l before:from-dark-background 
					  before:from-0% before:via-dark-background 
					  before:via-20% before:z-[65]'
		>
			<Swiper
				{...getSwiperOptions(windowSize)}
				onSlideChange={handleSlideChange}
				ref={swiperRef}
			>
				{movies.map((movie, index) => (
					<SwiperSlide
						key={`movie-${movie.id}`}
						onClick={() => handleClick(index)}
						className='flex justify-center w-full'
					>
						<MovieCard
							movie={movie}
							className={getMovieCardClass(index)}
							isCurrentSlide={index === activeIndex}
							isSlider={true}
							route='/#'
						/>
					</SwiperSlide>
				))}
			</Swiper>

			{/* play / pause based on actual state */}
			<PlayButton isPlaying={isPlaying} onClick={stopPlayAutoplay} />
		</div>
	);
};

export default SwiperComponent;
