'use client';

import useWindowSize, { WindowSize } from '@/hooks/useWindowSize';
import { MovieResponse } from '@/types/tmdb';
import { getSwiperOptions } from '@/utils/swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import MovieCard from './ui/MovieCard';

const SwiperComponent = ({ movies }: { movies: MovieResponse[] }) => {
	const windowSize: WindowSize = useWindowSize();

	if (!movies) return null;

	return (
		<>
			<Swiper {...getSwiperOptions(windowSize)}>
				{movies.map(movie => (
					<SwiperSlide key={`movie-${movie.id}`}>
						<div className='flex justify-center w-full'>
							<MovieCard movie={movie} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
};

export default SwiperComponent;
