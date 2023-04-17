import { MovieResponse } from '@/types/tmdb';
import Image from 'next/image';
import { FC } from 'react';

interface RatingsProps {
	movie: MovieResponse;
	className?: string;
}

const Ratings: FC<RatingsProps> = ({
	movie,
	className,
	...props
}: RatingsProps) => {
	return (
		<div className={className} {...props}>
			<Image
				src='/assets/imdb.svg'
				alt='imdb icon'
				width={45}
				height={35}
				quality={100}
			/>
			<span className='text-white text-lg'>
				{movie.vote_average}/<span className='text-xs'>10</span>
			</span>
		</div>
	);
};

export default Ratings;
