import React from 'react';
import { cn } from '@/utils/cn';
import { Overlay } from '@/components/ui';
import { MovieResponse } from '@/types/tmdb';
import { getBackgroundImagePath } from '@/utils/getPath';
import { MovieInfoHero } from '@/components/ui';
import useBgChange from '@/hooks/useSliderChange';

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
				'absolute inset-0 min-h-screen h-[750px] bg-cover bg-no-repeat bg-center md:bg-[center_-120px]',
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
	popularMovies: MovieResponse[];
}

export const HeroBgSection = ({ popularMovies }: HeroBgSectionProps) => {
	const { currentImageIndex, previousImageIndex } = useBgChange();

	return (
		<section className='hidden md:block h-[750px] relative overflow-hidden'>
			<Overlay
				className='md:bg-gradient-to-b md:from-dark-background/50 md:from-35%
		   md:via-dark-background md:via-70% md:to-dark-background z-[1]
		   bg-gradient-to-b from-dark-background/40 from-65%
		   via-dark-background/90 via-[90%] to-dark-background'
			/>
			{
				<HeroBg
					imageKey={`prev-${previousImageIndex}`}
					src={
						getBackgroundImagePath(popularMovies[previousImageIndex])
							?.backgroundImage || ''
					}
				/>
			}
			<HeroBg
				imageKey={`curr-${currentImageIndex}`}
				src={
					getBackgroundImagePath(popularMovies[currentImageIndex])
						?.backgroundImage || ''
				}
			/>

			{popularMovies[currentImageIndex] && (
				<MovieInfoHero movie={popularMovies[currentImageIndex]} />
			)}
		</section>
	);
};