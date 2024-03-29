import { FC } from 'react';
import { Overlay } from '@/components/ui';

interface SkeletonHeroProps {}

const SkeletonHero: FC<SkeletonHeroProps> = ({}) => {
	return (
		<section className='hidden md:block relative overflow-hidden h-screen md:h-[750px] bg-gray-500 animate-pulse'>
			<Overlay
				className='md:bg-gradient-to-b md:from-dark-background/40 md:from-35%
					   md:via-dark-background md:via-65% md:to-dark-background z-[1]
					    bg-gradient-to-b from-dark-background/40 from-65%
						   via-dark-background/90 via-[90%] to-dark-background'
			/>
			<div className='absolute bottom-[15%] md:top-[25%] left-0 right-0 container w-full flex flex-col items-start gap-4 max-w-7xl opacity-80 max-h-[300px]'>
				<div className='w-[50%] h-8 bg-gray-400 rounded animate-pulse'></div>
				<div className='w-[50%] h-5 bg-gray-400 rounded animate-pulse'></div>
				<div className='w-[30%] h-5 bg-gray-400 rounded animate-pulse'></div>
			</div>
		</section>
	);
};

export default SkeletonHero;
