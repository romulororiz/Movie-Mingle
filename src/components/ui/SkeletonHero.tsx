import { FC } from 'react';
import Overlay from './Overlay';

interface SkeletonHeroProps {}

const SkeletonHero: FC<SkeletonHeroProps> = ({}) => {
	return (
		<section className='relative overflow-hidden h-[750px] bg-gray-500 animate-pulse'>
			<Overlay
				className='bg-gradient-to-b from-dark-background/40 from-35%
					   via-dark-background via-45% md:via-65% to-dark-background z-[1]'
			/>
			<div className='absolute top-[15%] md:top-[25%] left-0 right-0 container w-full flex flex-col items-start gap-4 max-w-7xl opacity-80 max-h-[300px]'>
				<div className='w-[50%] h-8 bg-gray-400 rounded animate-pulse'></div>
				<div className='w-[50%] h-5 bg-gray-400 rounded animate-pulse'></div>
				<div className='w-[30%] h-5 bg-gray-400 rounded animate-pulse'></div>
			</div>
		</section>
	);
};

export default SkeletonHero;

// bg-gradient-to-b from-dark-background/40 from-35%
// 						   via-dark-background via-45% md:via-65% to-dark-background z-[1]
