import { FC } from 'react';
import { MovieResponse } from '@/types/tmdb';

const StarPercentage = ({ percentage }: { percentage: number }) => {
	const id = `star-gradient-${Math.random().toString(36).substr(2, 9)}`;

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width='24'
			height='24'
		>
			<defs>
				<linearGradient id={id} x1='0%' y1='0%' x2='100%' y2='0%'>
					<stop offset='0%' stopColor='#FDBB30' />
					<stop offset={`${percentage}%`} stopColor='#FDBB30' />
					<stop offset={`${percentage}%`} stopColor='gray' />
					<stop offset='100%' stopColor='gray' />
				</linearGradient>
			</defs>
			<polygon
				points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'
				fill={`url(#${id})`}
				stroke='currentColor'
				strokeWidth='0'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
};

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
			<StarPercentage percentage={(movie.vote_average / 10) * 100} />
			<span className='text-md'>{movie.vote_average.toFixed(1)} </span>
		</div>
	);
};

export default Ratings;
