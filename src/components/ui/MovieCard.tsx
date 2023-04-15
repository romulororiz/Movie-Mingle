import { MovieResponse } from '@/types/tmdb';
import { cn } from '@/utils/cn';
import { getImgPath } from '@/utils/renderBg';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const cardVariants = cva(
	'transition duration-700 relative w-[230px] h-[400px] grow bg-cover bg-no-repeat bg-center cursor-pointer rounded-2xl relative after:border-2 after:border-transparent after:content after:rounded-2xl after:absolute after:inset-0 after:bg-dark-background/30 hover:after:bg-transparent after:transition after:hover:border-accent-default'
);

interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {
	movie: MovieResponse;
	isLoading?: boolean;
	key?: string;
}

const MovieCard = forwardRef<HTMLDivElement, CardProps>(
	({ className, movie, isLoading, ...props }, ref) => {
		if (!movie) return null;
		return (
			<div
				className={cn(cardVariants({ className }), 'grow aspect-square')}
				style={getImgPath(movie)}
				{...props}
				ref={ref}
			></div>
		);
	}
);

MovieCard.displayName = 'MovieCard';

export default MovieCard;
