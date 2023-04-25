import Overlay from './Overlay';
import React from 'react';
import { cn } from '@/utils/cn';
import { MovieResponse } from '@/types/tmdb';
import { getMoviePath } from '@/utils/getPath';
import MovieInfoHero from '../MovieInfoHero';

interface HeroBgProps {
	src: string;
	imageKey: string;
	active?: boolean;
	className?: string;
	isSlider?: boolean;
}

const HeroBg = ({
	src,
	imageKey,
	className,
	active = imageKey.includes('curr'),
	isSlider = true,
}: HeroBgProps) => {
	return (
		<div
			key={imageKey}
			className={cn(
				'absolute inset-0 min-h-screen h-[750px] bg-cover bg-no-repeat bg-center md:bg-[center_-100px]',
				{
					'transition-opacity duration-700': isSlider,
					'animate-fadeIn': isSlider && active,
					'animate-fadeOut': isSlider && !active,
				},
				className
			)}
			// make bg image responsive and fill the whole image in the container
			style={{ backgroundImage: src }}
		></div>
	);
};

export default React.memo(HeroBg);

interface HeroBgSectionProps {
	previousImageIndex: number;
	currentImageIndex: number;
	popularMovies: MovieResponse[];
}

export const HeroBgSection = ({
	previousImageIndex,
	currentImageIndex,
	popularMovies,
}: HeroBgSectionProps) => {
	return (
		<section className='hidden md:block h-[750px] relative overflow-hidden'>
			<Overlay
				className='md:bg-gradient-to-b md:from-dark-background/40 md:from-35%
		   md:via-dark-background md:via-65% md:to-dark-background z-[1]
		   bg-gradient-to-b from-dark-background/40 from-65%
		   via-dark-background/90 via-[90%] to-dark-background'
			/>
			{
				<HeroBg
					imageKey={`prev-${previousImageIndex}`}
					src={
						getMoviePath(popularMovies[previousImageIndex], {
							isBG: true,
						}).backgroundImage
					}
				/>
			}
			<HeroBg
				imageKey={`curr-${currentImageIndex}`}
				src={
					getMoviePath(popularMovies[currentImageIndex], {
						isBG: true,
					}).backgroundImage
				}
			/>

			{popularMovies[currentImageIndex] && (
				<MovieInfoHero movie={popularMovies[currentImageIndex]} />
			)}
		</section>
	);
};
