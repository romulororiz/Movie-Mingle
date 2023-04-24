import { FC, HTMLAttributes } from 'react';
import { MovieResponse } from '@/types/tmdb';
import { cn } from '@/utils/cn';
import { formatDate, slugify } from '@/utils/formaters';
import { cva } from 'class-variance-authority';
import { getMoviePath } from '@/utils/getPath';
import Link from 'next/link';
import Icon from '../Icon';
import Heading from './Heading';
import Ratings from './Ratings';
import SkeletonCard from './SkeletonCard';
import Image from 'next/image';

const MovieInfo = ({ movie }: { movie: MovieResponse }) => {
	return (
		<div className='mt-2 w-full z-10 flex gap-x-1 justify-between items-start'>
			<div className='flex flex-col truncate gap-1'>
				<Link href={slugify(`/movies/${movie.title}`)}>
					<Heading
						element='h3'
						title={movie.title}
						size='small'
						id={`movie-title-${movie.id}`}
						className='hover:text-primaryAccent-default transition truncate'
					/>
				</Link>
				<span className='text-sm flex gap-1 items-center justify-start'>
					<Icon name='Calendar' size={16} />
					{formatDate(movie.release_date.toString())}
				</span>
			</div>
			<Ratings movie={movie} className='flex items-center gap-2' />
		</div>
	);
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	movie: MovieResponse;
	isLoading?: boolean;
	route: string;
	key?: string;
	isSlider?: boolean;
	isCurrentSlide?: boolean;
}

const generateArialLabel = (movie: MovieResponse) => {
	return `${movie.title}, released on ${formatDate(
		movie.release_date.toString()
	)}, IMDB rating: ${movie.vote_average}`;
};

const MovieCard: FC<CardProps> = ({
	className,
	movie,
	isLoading,
	isSlider = false,
	route,
}) => {
	const cardClasses = cva(
		cn(
			'transition shadow-black shadow-md duration-700 cursor-pointer relative aspect-[2/3] overflow-hidden w-full h-full rounded-md after:rounded-md after:absolute after:inset-0 after:bg-dark-background/30 hover:after:bg-transparent after:transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryAccent-default'
		)
	);

	if (!movie) return null;

	if (isLoading) return <SkeletonCard />;

	return (
		<div className='h-full w-full flex flex-col justify-between'>
			<Link
				href={slugify(route)}
				aria-label={generateArialLabel(movie)}
				aria-labelledby={`movie-title-${movie.id}`}
				tabIndex={0}
			>
				<figure className={cn(cardClasses({ className }))}>
					<Image
						src={getMoviePath(movie).backgroundImage || ''}
						alt={movie.title}
						width='0'
						height='0'
						sizes='100vw'
						className='w-full h-full'
					/>
				</figure>
			</Link>
			{!isSlider && <MovieInfo movie={movie} />}
		</div>
	);
};

MovieCard.displayName = 'MovieCard';

export default MovieCard;
