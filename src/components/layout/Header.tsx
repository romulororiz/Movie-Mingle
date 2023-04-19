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
			className={`absolute inset-0 h-[750px] bg-cover bg-no-repeat bg-center transition-opacity duration-700 ${
				active ? 'animate-fadeIn' : 'animate-fadeOut'
			}`}
			style={{ backgroundImage: src }}
		></div>
	);
};

const MovieInfo = ({ movie }: { movie: MovieResponse }) => {
	const windowSize = useWindowSize();

	return (
		<div
			className='absolute max-w-7xl left-0 right-0 container w-full top-[45%] md:top-[40%] flex flex-col items-start gap-4 opacity-80 max-h-[300px]
		'
		>
			<Heading
				element='h1'
				title={movie.title}
				className='text-2xl md:text-4xl'
			/>
			<div className='flex flex-col items-start max-w-lg text-justify'>
				<Paragraph className='text-md font-normal text-left' size='sm'>
					{movie.overview.slice(0, isMobile(windowSize) ? 120 : 200) + '...'}
				</Paragraph>
				<div className='flex gap-6 justify-between w-full'>
					<div className='flex gap-4 items-center'>
						<Heading
							element='h3'
							title={formatDate(movie.release_date.toString())}
							size='small'
							className='text-md'
						/>
						<Ratings movie={movie} className='flex items-center gap-2' />
					</div>
					<SeeMore route={`/movies/${slugify(movie.title)}`} icon={false} />
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
		<header className='h-[750px] relative overflow-hidden ml-0 md:ml-64'>
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
			<div className='absolute inset-0 bg-gradient-to-b from-transparent from-35% via-dark-background via-[80%] to-dark-background'></div>

			<MovieInfo movie={popularMovies[currentImageIndex]} />
		</header>
	);
};
