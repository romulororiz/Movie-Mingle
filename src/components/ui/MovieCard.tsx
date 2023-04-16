import { MovieResponse } from '@/types/tmdb';
import { cn } from '@/utils/cn';
import { formatDate } from '@/utils/formaters';
import { getMoviePath } from '@/utils/renderBg';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { HTMLAttributes, forwardRef } from 'react';
import Heading from './Heading';
import Link from 'next/link';

const MovieInfo = ({
	movie,
	isSlider,
}: {
	movie: MovieResponse;
	isSlider: boolean;
}) => {
	if (isSlider) return null;

	return (
		<div className='absolute -bottom-12 left-0 w-full z-10 flex justify-between items-start'>
			<div className='flex flex-col mr-2'>
				<Heading
					element='h3'
					title={movie.title}
					size='small'
					id={`movie-title-${movie.id}`}
				/>
				<span className='text-sm'>
					{formatDate(movie.release_date.toString())}
				</span>
			</div>
			<span className='flex gap-2 items-center'>
				<Image
					src='/assets/imdb.svg'
					alt='imdb icon'
					width={35}
					height={35}
					quality={100}
				/>
				<span className='text-white text-md'>{movie.vote_average}</span>
			</span>
		</div>
	);
};

interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {
	movie: MovieResponse;
	isLoading?: boolean;
	key?: string;
	isSlider?: boolean;
	isCurrentSlide?: boolean;
	route: string;
}

const cardVariants = cva(
	'transition shadow-black shadow-lg duration-700 grow relative w-[230px] aspect-square h-[380px] bg-cover bg-no-repeat bg-center cursor-pointer rounded-2xl after:content after:rounded-2xl after:absolute after:inset-0 after:bg-dark-background/30 hover:after:bg-transparent after:transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-default'
);

const generateArialLabel = (movie: MovieResponse) => {
	return `${movie.title}, released on ${formatDate(
		movie.release_date.toString()
	)}, IMDB rating: ${movie.vote_average}`;
};

const MovieCard = forwardRef<HTMLDivElement, CardProps>(
	(
		{
			className,
			movie,
			isLoading,
			isSlider = false,
			isCurrentSlide,
			route,
			...props
		},
		ref
	) => {
		if (!movie) return null;

		return (
			//todo check div with props and ref
			<Link
				href={route}
				className={cn(cardVariants({ className }), {
					'after:hover:border-accent-default after:border-2 after:border-transparent':
						!isCurrentSlide,
				})}
				style={getMoviePath(movie)}
				aria-label={generateArialLabel(movie)}
				aria-labelledby={`movie-title-${movie.id}`}
			>
				<div {...props} ref={ref}>
					<MovieInfo movie={movie} isSlider={isSlider} />
				</div>
			</Link>
		);
	}
);

MovieCard.displayName = 'MovieCard';

export default MovieCard;
