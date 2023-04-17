'use client';

import { useAppState } from '@/context/stateContext';
import { getMoviePath } from '@/utils/renderBg';
import { isMovieResponse } from '@/utils/typeGuards';
import { useQuery } from '@tanstack/react-query';
import { fetchFromHandler } from '@/helpers/tmdb';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const BackgroundImage = ({
	src,
	active,
	imageKey,
}: {
	src: string;
	active: boolean;
	imageKey: string | number;
}) => {
	return (
		<div
			key={imageKey}
			className={`absolute inset-0 h-[750px] bg-cover bg-no-repeat bg-center transition-opacity duration-700 ${
				active ? 'animate-fadeIn' : 'animate-fadeOut'
			}`}
			style={{ backgroundImage: src }}
		/>
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
			<div className='absolute inset-0 bg-gradient-to-b from-transparent from-35% via-dark-background via-[75%] to-dark-background'></div>
			{/* Your other components */}
		</header>
	);
};
