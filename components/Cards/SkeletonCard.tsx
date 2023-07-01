import { cn } from '@/lib/utils';
import { FC } from 'react';
import { CardPerView } from '@/utils/cardPerView';

import useWindowSize from '@/hooks/useWindowSize';

interface SkeletonCardProps {
	key?: string;
	isMovie?: boolean;
	isActor?: boolean;
	isSlider?: boolean;
}

const SkeletonCard: FC<SkeletonCardProps> = ({
	isActor = false,
	isSlider = false,
}) => {
	const skeletonClasses = cn(
		'mb-[1.5rem] grow relative rounded-md animate-pulse aspect-[2/3] w-full h-full flex flex-col',
		{ 'h-[250px] md:h-[360px]': isSlider }
	);

	return (
		<div className={skeletonClasses}>
			<div className='w-full h-full bg-gray-400 rounded-md'></div>

			{!isSlider && (
				<div className='w-full z-10 flex gap-x-1 justify-between items-start mt-2'>
					<div className='flex flex-col'>
						<div className='h-4 bg-gray-400 rounded w-24'></div>
						{!isActor && (
							<div className='h-3 bg-gray-400 rounded w-16 mt-2'></div>
						)}
					</div>
					<div className='flex items-center gap-2'>
						<div className='h-4 bg-gray-400 rounded w-8'></div>
						{!isActor && <div className='h-4 bg-gray-400 rounded w-6'></div>}
					</div>
				</div>
			)}
		</div>
	);
};

export default SkeletonCard;

interface RenderSkeletonCardsProps {
	isMovie?: boolean;
	isActor?: boolean;
	isCardSlider?: boolean;
}

export const RenderSkeletonCards = ({
	isMovie = true,
	isActor = false,
	isCardSlider = false,
}: RenderSkeletonCardsProps) => {
	const windowSize = useWindowSize();

	const cards = [
		...Array(CardPerView(windowSize, { isActor: isActor, isMovie: isMovie })),
	];

	return (
		<>
			{isCardSlider ? (
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
