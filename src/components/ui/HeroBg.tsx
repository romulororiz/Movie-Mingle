import { cn } from '@/utils/cn';
import React from 'react';
import SkeletonHero from './SkeletonHero';

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
				'absolute inset-0 h-[750px] bg-cover bg-no-repeat bg-[center_-80px] md:bg-center',
				{
					'transition-opacity duration-700': isSlider,
					'animate-fadeIn': isSlider && active,
					'animate-fadeOut': isSlider && !active,
				},
				className
			)}
			style={{ backgroundImage: src }}
		></div>
	);
};

export default React.memo(HeroBg);
