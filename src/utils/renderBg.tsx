import { MovieResponse } from '@/types/tmdb';

const NoImage = 'assets/no-image.jpg';

export const getImgPath = (
	movie: MovieResponse,
	options: {
		isBG?: boolean;
		index?: number;
		activeIndex?: number;
	} = {}
) => {
	const { backdrop_path, poster_path } = movie;

	const bgImage =
		backdrop_path !== null
			? `url(https://image.tmdb.org/t/p/original${backdrop_path})`
			: `url(${NoImage})`;

	const posterImg =
		poster_path !== null
			? `url(https://image.tmdb.org/t/p/original${poster_path})`
			: `url(${NoImage})`;

	const { isBG, index, activeIndex } = options;
	const opacity = activeIndex !== undefined && activeIndex === index ? 1 : 0;

	if (isBG) {
		return {
			backgroundImage: bgImage,
			opacity,
		};
	}

	return {
		backgroundImage: posterImg,
	};
};

export const renderHeaderImages = (
	movies: MovieResponse[],
	activeIndex: number
) => {
	if (!movies) return null;

	return movies.map((movie, index): JSX.Element => {
		return (
			<div
				key={`bg-${movie.id}`}
				className='absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-700'
				style={getImgPath(movie, { isBG: true, index, activeIndex })}
			></div>
		);
	});
};
