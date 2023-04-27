import { FC } from 'react';
import { Overlay } from '@/components/ui';

interface SkeletonHeroProps {}

const SkeletonHero: FC<SkeletonHeroProps> = ({}) => {
	return (
		<section className='relative overflow-hidden h-screen md:h-[750px] bg-gray-500 animate-pulse'>
			<Overlay
				className='md:bg-gradient-to-b md:from-dark-background/40 md:from-35%
					   md:via-dark-background md:via-65% md:to-dark-background z-[1]
					    bg-gradient-to-b from-dark-background/40 from-65%
						   via-dark-background/90 via-[90%] to-dark-background'
			/>
			<div className='absolute container max-w-7xl top-0 right-0 left-0 w-full mx-auto flex justify-end'>
				<div className='w-12 h-12 rounded-full bg-gray-400 animate-pulse mt-4'></div>
			</div>
			<div className='absolute bottom-[20%] md:top-[25%] left-0 right-0 container w-full flex flex-col items-start gap-4 max-w-7xl opacity-80 max-h-[300px]'>
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
