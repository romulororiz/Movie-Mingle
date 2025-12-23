// @ts-nocheck
import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Overlay, SkeletonHero } from '@/components/ui';
import { MovieResponse } from '@/types/tmdb';
import { MovieInfoHero } from '@/components/ui';
import useBgChange from '@/hooks/useSliderChange';
import { isMobile } from '@/utils/breakpoints';

interface HeroBgProps {
	src: string;
	isLocalAsset?: boolean;
	imageKey: string;
	active?: boolean;
	className?: string;
	isSlider?: boolean;
	isMobile?: boolean;
}

const HeroBg = ({
	src,
	isLocalAsset = false,
	imageKey,
	className,
	active = imageKey.includes('curr'),
	isSlider = true,
	isMobile = false,
}: HeroBgProps) => {
	return (
		<div
			key={imageKey}
			className={cn(
				'absolute inset-0 min-h-screen h-[750px] bg-cover bg-no-repeat bg-center md:bg-[center_-120px]',
				{
					'transition-opacity duration-700': isSlider,
					'animate-fadeIn': isSlider && active,
					'animate-fadeOut': isSlider && !active,
				},
				className
			)}
			style={{
				backgroundImage: isLocalAsset
					? `url(${src})`
					: `url(https://image.tmdb.org/t/p/${
							isMobile ? 'w500' : 'w1280'
					  }${src})`,
			}}
		/>
	);
};

export default React.memo(HeroBg);

interface HeroBgSectionProps {
	trendingMovies: MovieResponse[];
	isMobile?: boolean;
	isLoading?: boolean;
}

export const HeroBgSection = ({
	trendingMovies,
	isLoading = false,
	isMobile = false,
}: HeroBgSectionProps) => {
	const { currentImageIndex, previousImageIndex } = useBgChange();

	if (isLoading) return <SkeletonHero />;
	if (!trendingMovies || trendingMovies.length === 0) return null;

	const safePrevIndex =
		previousImageIndex >= 0 && previousImageIndex < trendingMovies.length
			? previousImageIndex
			: 0;
	const safeCurrIndex =
		currentImageIndex >= 0 && currentImageIndex < trendingMovies.length
			? currentImageIndex
			: 0;

	return (
		<section className='absolute h-[250px] inset-0 md:h-[750px] md:relative overflow-hidden'>
			<Overlay
				className='md:bg-gradient-to-b md:from-dark-background/50 
			md:from-25% md:via-dark-background md:via-65%
			md:to-dark-background z-[1] bg-gradient-to-b 
			from-dark-background/90 from-55% 
			via-dark-background via-[90%] to-dark-background'
			/>
			{
				<HeroBg
					imageKey={`prev-${safePrevIndex}`}
					src={trendingMovies[safePrevIndex]?.backdrop_path || ''}
					isMobile={isMobile}
				/>
			}
			<HeroBg
				imageKey={`curr-${safeCurrIndex}`}
				src={trendingMovies[safeCurrIndex]?.backdrop_path || ''}
				isMobile={isMobile}
			/>

			{trendingMovies[safeCurrIndex] && !isMobile ? (
				<MovieInfoHero movie={trendingMovies[safeCurrIndex]} />
			) : null}
		</section>
	);
};
