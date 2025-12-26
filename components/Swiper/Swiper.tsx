'use client';

import React, { useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { MovieResponse } from '@/types/tmdb';
import Card from '@/components/Cards/Card';
import { useAppState } from '@/context/stateContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type SwiperComponentProps = {
	movies: MovieResponse[];
	isLoading: boolean;
};

const getSlidesPerView = (windowSize?: WindowSize): number => {
	const width = windowSize?.width ?? 1280;
	if (width < 640) return 2;
	if (width < 768) return 3;
	if (width < 1024) return 4;
	if (width < 1280) return 5;
	if (width < 1536) return 6;
	return 7;
};

const SwiperComponent = ({ movies }: SwiperComponentProps) => {
	const { activeIndex, setActiveIndex } = useAppState();
	const windowSize: WindowSize = useWindowSize();

	const slidesPerView = getSlidesPerView(windowSize);

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: 'center',
			skipSnaps: false,
			dragFree: false,
			slidesToScroll: 1,
			duration: 20,
			startIndex: 0,
		},
		[
			Autoplay({
				delay: 4000,
				stopOnInteraction: false,
				stopOnMouseEnter: true,
			}),
		]
	);

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	const scrollTo = useCallback(
		(index: number) => {
			if (emblaApi) emblaApi.scrollTo(index);
		},
		[emblaApi]
	);

	const onSelect = useCallback(() => {
		if (!emblaApi) return;
		const selectedIndex = emblaApi.selectedScrollSnap();
		setActiveIndex(selectedIndex);
	}, [emblaApi, setActiveIndex]);

	useEffect(() => {
		if (!emblaApi) return;

		onSelect();
		emblaApi.on('select', onSelect);
		emblaApi.on('reInit', onSelect);

		return () => {
			emblaApi.off('select', onSelect);
			emblaApi.off('reInit', onSelect);
		};
	}, [emblaApi, onSelect]);

	const currSlide = (index: number) => index === activeIndex;

	const getMovieCardClass = (index: number) => {
		if (currSlide(index))
			return 'border-2 border-accent-primary z-50 scale-[1.10] md:scale-125 relative';
		return 'border border-dark-background relative';
	};

	return (
		<div className="relative group">
			{/* Carousel container */}
			<div className="overflow-hidden" ref={emblaRef}>
				<div className="flex py-8 md:py-12" style={{ touchAction: 'pan-y' }}>
					{movies.map((movie, index) => (
						<div
							key={`movie-${movie.id}-${index}`}
							className="flex-shrink-0 pb-14 px-[7px] sm:px-[10px] transition-all duration-500 ease-out cursor-pointer relative"
							style={{
								flex: `0 0 ${100 / slidesPerView}%`,
								minWidth: 0,
							}}
							onClick={() => scrollTo(index)}
						>
							<Card
								item={movie}
								className={getMovieCardClass(index)}
								isSlider={true}
								isCurrSlide={currSlide(index)}
							/>
						</div>
					))}
				</div>
			</div>

			{/* Left fade overlay */}
			<div
				className="absolute mt-10 inset-y-0 left-0 w-16 sm:w-24 md:w-32 lg:w-40 pointer-events-none z-20"
				style={{
					background:
						'linear-gradient(to right, rgb(3, 14, 19) 0%, rgb(3, 14, 19) 30%, rgba(3, 14, 19, 0.8) 50%, rgba(3, 14, 19, 0) 100%)',
				}}
			/>
			{/* Right fade overlay */}
			<div
				className="absolute mt-10 inset-y-0 right-0 w-16 sm:w-24 md:w-32 lg:w-40 pointer-events-none z-20"
				style={{
					background:
						'linear-gradient(to left, rgb(3, 14, 19) 0%, rgb(3, 14, 19) 30%, rgba(3, 14, 19, 0.8) 50%, rgba(3, 14, 19, 0) 100%)',
				}}
			/>

			{/* Navigation buttons */}
			<button
				onClick={scrollPrev}
				className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-30 
					p-2 rounded-full bg-black/80 hover:bg-accent-primary/30 
					border border-white/10 hover:border-accent-primary
					transition-all duration-300
					opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100
					hidden sm:flex items-center justify-center"
				aria-label="Previous slide"
			>
				<ChevronLeft className="w-5 h-5 text-white" />
			</button>
			<button
				onClick={scrollNext}
				className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-30 
					p-2 rounded-full bg-black/80 hover:bg-accent-primary/30 
					border border-white/10 hover:border-accent-primary
					transition-all duration-300
					opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100
					hidden sm:flex items-center justify-center"
				aria-label="Next slide"
			>
				<ChevronRight className="w-5 h-5 text-white" />
			</button>

			{/* Dot indicators */}
			<div className="flex justify-center gap-1.5 mt-2 relative z-10">
				{movies.slice(0, Math.min(movies.length, 10)).map((_, index) => (
					<button
						key={index}
						onClick={() => scrollTo(index)}
						className={`w-2 h-2 rounded-full transition-all duration-300 ${
							currSlide(index)
								? 'bg-accent-primary w-6'
								: 'bg-dark-border hover:bg-accent-primary/50'
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

const MemoizedSwiperComponent = React.memo(SwiperComponent);
export { MemoizedSwiperComponent as SwiperComponent };
