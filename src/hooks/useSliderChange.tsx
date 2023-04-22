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
		<div className='absolute max-w-7xl left-0 right-0 container top-[15%] md:top-[25%] flex flex-col justify-between h-[150px] md:h-[180px] w-auto z-50'>
			<Heading
				element='h1'
				title={movie.title}
				className='h-fit mb-2'
				size='large'
			/>
			<div className='flex flex-col max-w-lg'>
				<Paragraph
					className='font-normal text-justify line-clamp-3 md:line-clamp-4'
					size='md'
				>
					{movie.overview}
				</Paragraph>
				<div className='flex gap-4 md:gap-8 mt-2'>
					<div className='flex gap-3 items-center'>
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
