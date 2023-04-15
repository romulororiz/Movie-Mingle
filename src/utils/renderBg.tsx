import { MovieResponse } from '@/types/tmdb';

export const renderBgImages = (
	movies: MovieResponse[],
	activeIndex: number
) => {
	if (!movies) return null;

	// fix key error
	return movies.map((movie, index) => (
		<div
			key={`bg-${movie.id}`}
			className='absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-700'
			style={{
				opacity: index === activeIndex ? 1 : 0,
				backgroundImage: `${
					movie.backdrop_path
						? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
						: `url(/assets/no-image.jpg)`
				}`,
			}}
		></div>
	));
};
