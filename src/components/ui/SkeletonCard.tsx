import { FC } from 'react';
import { CardPerView } from '@/utils/cardPerView';
import { WindowSize } from '@/hooks/useWindowSize';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getSwiperOptions } from '@/lib/swiper';
import { cn } from '@/utils/cn';

interface SkeletonCardProps {
	key?: string;
	isMovie?: boolean;
	isActor?: boolean;
	isSlider?: boolean;
}

const SkeletonCard: FC<SkeletonCardProps> = ({
	isMovie = true,
	isActor = false,
	isSlider = false,
}) => {
	const skeletonClasses = cn(
		'mb-[1.5rem] shadow-black shadow-lg grow relative rounded-xl animate-pulse',
		{
			'w-[250px] aspect-square h-[380px]': isMovie,
			'w-[150px] grow h-[280px] min-w-[150px]': isActor,
		}
	);

	return (
		<div className={skeletonClasses}>
			<div className='absolute top-0 left-0 w-full h-full bg-gray-400 rounded-xl'></div>

			{!isSlider && (
				<div className='absolute -bottom-14 left-0 w-full z-10 flex gap-x-1 justify-between items-start'>
					<div className='flex flex-col'>
						<div className='h-4 bg-gray-400 rounded w-32'></div>
						<div className='h-3 bg-gray-400 rounded w-16 mt-2'></div>
					</div>
					<div className='flex items-center gap-2'>
						<div className='h-3 bg-gray-400 rounded w-8'></div>
						{!isActor && <div className='h-3 bg-gray-400 rounded w-6'></div>}
					</div>
				</div>
			)}
		</div>
	);
};

export default SkeletonCard;

interface RenderSkeletonCardsProps {
	windowSize: WindowSize;
	isMovie?: boolean;
	isActor?: boolean;
	isSlider?: boolean;
}

export const RenderSkeletonCards = ({
	windowSize,
	isMovie = true,
	isActor = false,
	isSlider = false,
}: RenderSkeletonCardsProps) => {
	const cards = [
		...Array(CardPerView(windowSize, { isActor: isActor, isMovie: isMovie })),
	];

	return (
		<>
			{isSlider ? (
				<div className='mt-12 relative flex gap-5 overflow-hidden'>
					{cards.map((_, i) => (
						<SkeletonCard key={`skeleton-${i}`} isSlider={true} />
					))}
					<div
						className='hidden xs:block absolute top-0 bottom-0 left-0 w-20 md:left-0 bg-gradient-to-r
						 from-dark-background from-0% via-dark-background via-20% z-[65]'
					></div>
					<div
						className='hidden xs:block absolute top-0 bottom-0 right-0 w-20 md:right-0 bg-gradient-to-l
						 from-dark-background from-0% via-dark-background via-20% z-[65]'
					></div>
				</div>
			) : (
				cards.map((_, i) => (
					<SkeletonCard
						key={`skeleton-${i}`}
						isActor={isActor}
						isMovie={isMovie}
					/>
				))
			)}
		</>
	);
};
