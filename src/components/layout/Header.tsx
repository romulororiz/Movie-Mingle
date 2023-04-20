'use client';

import { useAppState } from '@/context/stateContext';
import { fetchFromHandler } from '@/helpers/tmdb';
import { MovieResponse } from '@/types/tmdb';
import { isMobile } from '@/utils/breakpoints';
import { formatDate, slugify } from '@/utils/formaters';
import { getMoviePath } from '@/utils/renderBg';
import { isMovieResponse } from '@/utils/typeGuards';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import Heading from '../ui/Heading';
import Paragraph from '../ui/Paragraph';
import Ratings from '../ui/Ratings';
import SeeMore from '../ui/SeeMore';
import SkeletonHeader from '../ui/SkeletonHeader';
import Icon from '../Icon';
import { cn } from '@/utils/cn';

const BackgroundImage = ({
	src,
	active,
	imageKey,
}: {
	src: string;
	active: boolean;
	imageKey: string;
}) => {
	return (
		<div
			key={imageKey}
			className={cn(
				'absolute inset-0 h-[750px] bg-cover bg-no-repeat bg-center transition-opacity duration-700',
				{
					'animate-fadeIn': active,
					'animate-fadeOut': !active,
				}
			)}
			style={{ backgroundImage: src }}
		></div>
	);
};

const MovieInfo = ({ movie }: { movie: MovieResponse }) => {
	const windowSize = useWindowSize();

	return (
		<div className='absolute max-w-7xl left-0 right-0 container top-[40%] flex flex-col justify-between gap-4 opacity-80 h-max z-[80]'>
			<Heading element='h1' title={movie.title} />
			<div className='flex flex-col max-w-lg text-justify'>
				<Paragraph className='font-normal text-left' size='md'>
					{movie.overview.slice(0, isMobile(windowSize) ? 120 : 200) + '...'}
				</Paragraph>
				<div className='flex gap-8 mt-2'>
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

export const Header = () => {
	const { activeIndex } = useAppState();

	const [currentImageIndex, setCurrentImageIndex] = useState(activeIndex);
	const [previousImageIndex, setPreviousImageIndex] = useState<number | null>(
		null
	);

	useEffect(() => {
		if (activeIndex !== currentImageIndex) {
			setPreviousImageIndex(currentImageIndex);
			const timer = setTimeout(() => {
				setCurrentImageIndex(activeIndex);
			});
			return () => clearTimeout(timer);
		}
	}, [activeIndex, currentImageIndex]);

	const {
		data: popularMovies,
		isLoading: isLoadingPopularMovies,
		error: errorPopularMovies,
	} = useQuery({
		queryKey: ['popularMovies'],
		queryFn: () => fetchFromHandler('popular'),
	});

	const isHome = usePathname() === '/';
	if (!isHome) return null;

	if (isLoadingPopularMovies) return <SkeletonHeader />;

	if (!isMovieResponse(popularMovies)) return null;

	return (
		<header
			className='h-[750px] relative overflow-hidden ml-0 md:ml-64 
						 after:absolute after:inset-0 after:bg-gradient-to-b 
						 after:via-dark-background after:from-transparent
						 after:from-35% after:via-85% after:to-dark-background'
		>
			{previousImageIndex !== null && (
				<BackgroundImage
					imageKey={`prev-${previousImageIndex}`}
					src={
						getMoviePath(popularMovies[previousImageIndex], { isBG: true })
							.backgroundImage
					}
					active={false}
				/>
			)}
			<BackgroundImage
				imageKey={`prev-${previousImageIndex}`}
				src={
					getMoviePath(popularMovies[currentImageIndex], { isBG: true })
						.backgroundImage
				}
				active={true}
			/>

			<MovieInfo movie={popularMovies[currentImageIndex]} />
		</header>
	);
};
