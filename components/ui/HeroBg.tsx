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
}

const HeroBg = ({
	src,
	isLocalAsset = false,
	imageKey,
	className,
	active = imageKey.includes('curr'),
	isSlider = true,
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
					: `url(https://image.tmdb.org/t/p/w1280${src})`,
			}}
		/>
	);
};

export default React.memo(HeroBg);

interface HeroBgSectionProps {
	popularMovies: MovieResponse[];
	isMobile?: boolean;
	isLoading?: boolean;
}

export const HeroBgSection = ({
	popularMovies,
	isLoading = false,
	isMobile = false,
}: HeroBgSectionProps) => {
	const { currentImageIndex, previousImageIndex } = useBgChange();

	if (isLoading) return <SkeletonHero />;

	return (
		<section className='h-[750px] relative overflow-hidden'>
			<Overlay
				className='md:bg-gradient-to-b md:from-dark-background/50 
			md:from-25% md:via-dark-background md:via-65%
			md:to-dark-background z-[1] bg-gradient-to-b 
			from-dark-background/90 from-55% 
			via-dark-background via-[90%] to-dark-background'
			/>
			{
				<HeroBg
					imageKey={`prev-${previousImageIndex}`}
					src={popularMovies[previousImageIndex].backdrop_path}
				/>
			}
			<HeroBg
				imageKey={`curr-${currentImageIndex}`}
				src={popularMovies[currentImageIndex].backdrop_path}
			/>

			{popularMovies[currentImageIndex] && !isMobile ? (
				<MovieInfoHero movie={popularMovies[currentImageIndex]} />
			) : null}
		</section>
	);
};
