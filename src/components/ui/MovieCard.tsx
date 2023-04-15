import { MovieResponse } from '@/types/tmdb';
import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const cardVariants = cva(
	'transition duration-700 relative w-[350px] min-w-[200px] h-[260px] grow bg-cover bg-no-repeat bg-center cursor-pointer rounded-2xl relative after:border-2 after:border-transparent after:content after:rounded-2xl after:absolute after:inset-0 after:bg-dark-background/30 hover:after:bg-transparent after:transition after:hover:border-accent-default'
);

interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {
	movie: MovieResponse;
	isLoading?: boolean;
	className?: string;
	key?: string;
}

const MovieCard = forwardRef<HTMLDivElement, CardProps>(
	({ className, movie, isLoading, ...props }, ref) => {
		if (!movie) return null;
		return (
			<div
				className={cn(cardVariants({ className }), 'grow')}
				style={{
					backgroundImage: `${
						movie.backdrop_path
							? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
							: `url(/assets/no-image.jpg)`
					}`,
				}}
				{...props}
				ref={ref}
			>
				{/* //todo paragraph component */}
				<p className='absolute text-center bottom-4 font-semibold font-robotoSans w-full text-md leading-tight tracking-tight opacity-80'>
					{movie.title}
				</p>
			</div>
		);
	}
);

MovieCard.displayName = 'MovieCard';

export default MovieCard;
