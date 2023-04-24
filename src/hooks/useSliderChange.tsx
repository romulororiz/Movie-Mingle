'use client';

import { useAppState } from '@/context/stateContext';
import { useEffect, useState } from 'react';
import { MovieResponse } from '@/types/tmdb';
import { formatDate, slugify } from '@/utils/formaters';
import Heading from '@/components/ui/Heading';
import Paragraph from '@/components/ui/Paragraph';
import Icon from '@/components/Icon';
import Ratings from '@/components/ui/Ratings';
import SeeMore from '@/components/ui/SeeMore';

export const MovieInfo = ({ movie }: { movie: MovieResponse }) => {
	return (
		<div className='gap-2 text-th text-slate-100/80 absolute md:max-w-7xl left-0 right-0 md:container p-6 pb-2 md:backdrop-blur-0 backdrop-blur-sm bg-dark-background/50 md:bg-transparent bottom-0 md:top-[25%] flex flex-col justify-between h-auto md:h-[230px] w-auto z-50'>
			<Heading
				element='h1'
				title={movie.title}
				className=' text-slate-100/80 text-md md:text-xl lg:text-3xl font-semibold text-primaryAccent-default'
			/>
			<div className='flex flex-col max-w-lg gap-4 md:gap-1'>
				<Paragraph
					className='font-light md:font-normal text-justify line-clamp-3 md:line-clamp-4'
					size='sm'
				>
					{movie.overview}
				</Paragraph>
				<div className='flex justify-between md:justify-start gap-4 md:gap-8 mt-2'>
					<div className='flex gap-3 md:gap-5 items-center'>
						<span className='flex items-center gap-1 text-sm md:text-md'>
							<Icon name='Calendar' size={20} />
							{formatDate(movie.release_date.toString())}
						</span>
						<Ratings movie={movie} className='flex items-center gap-2' />
					</div>
					<SeeMore route={`/movies/${slugify(movie.title)}`} icon={true} />
				</div>
			</div>
		</div>
	);
};

const useBgChange = () => {
	const { activeIndex } = useAppState();

	const [currentImageIndex, setCurrentImageIndex] = useState(activeIndex);
	const [previousImageIndex, setPreviousImageIndex] = useState<number>(0);

	useEffect(() => {
		if (activeIndex !== currentImageIndex) {
			setPreviousImageIndex(currentImageIndex);
			const timer = setTimeout(() => {
				setCurrentImageIndex(activeIndex);
			});
			return () => clearTimeout(timer);
		}
	}, [activeIndex, currentImageIndex]);

	return { currentImageIndex, previousImageIndex };
};

export default useBgChange;
