import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import { FC } from 'react';
import { isMobile } from '@/utils/breakpoints';
import { MovieResponse } from '@/types/tmdb';

interface RatingsProps {
	movie: MovieResponse;
	className?: string;
}

const Ratings: FC<RatingsProps> = ({
	movie,
	className,
	...props
}: RatingsProps) => {
	const windowSize = useWindowSize();

	return (
		<div className={className} {...props}>
			<Image
				src='/assets/imdb.svg'
				alt='imdb icon'
				width={isMobile(windowSize) ? 25 : 35}
				height={isMobile(windowSize) ? 25 : 35}
				quality={100}
			/>
			<span className='text-sm md:text-md font-normal'>
				{movie.vote_average}/<span className='text-xs'>10</span>
			</span>
		</div>
	);
};

export default Ratings;
