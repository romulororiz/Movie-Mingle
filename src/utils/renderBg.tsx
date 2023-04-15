import { MovieResponse } from '@/types/tmdb';

export const renderBgImages = (
	movies: MovieResponse[],
	activeIndex: number
) => {
	if (!movies) return null;

	return movies.map((movie, index): JSX.Element => {
		const { backdrop_path } = movie;
		const bgImage = `https://image.tmdb.org/t/p/original${backdrop_path}`;
		const bgImageNoImage = 'assets/no-image.jpg';
		const bgImageStyle = {
			backgroundImage: `url(${bgImage ?? bgImageNoImage})`,
			opacity: activeIndex === index ? 1 : 0,
		};

		return (
			<div
				key={`bg-${movie.id}`}
				className='absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-700'
				style={bgImageStyle}
			></div>
		);
	});
};
