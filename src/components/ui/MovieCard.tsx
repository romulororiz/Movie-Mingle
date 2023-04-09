import { MovieResponse } from '@/types/tmdb';
import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const cardVariants = cva(
	'relative min-w-[200px] h-[220px] bg-cover bg-no-repeat bg-center cursor-pointer rounded-2xl relative after:border-2 after:border-transparent after:content after:rounded-2xl after:absolute after:inset-0 after:bg-dark-background/40 hover:after:bg-transparent after:transition after:hover:border-accent-default',
	{
		variants: {
			size: {
				default: 'w-200 h-200',
				small: 'w-100 h-100',
				large: 'w-300 h-300',
			},
			defaultVariant: {
				size: 'default',
			},
		},
	}
);

interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {
	movie: MovieResponse;
	isLoading?: boolean;
}

const MovieCard = forwardRef<HTMLDivElement, CardProps>(
	({ className, size, movie, isLoading, ...props }, ref) => {
		if (!movie) return null;

		return (
			<>
				<div
					className={cn(cardVariants({ size, className }))}
					style={{
						backgroundImage: `
                url(https://image.tmdb.org/t/p/original${movie.backdrop_path})
            `,
					}}
					{...props}
					ref={ref}
				>
					<p className='absolute bottom-4 left-4 font-semibold font-robotoSans w-full text-md leading-tight tracking-tight opacity-80'>
						{movie.title}
					</p>
				</div>

				{/* dark gradient left and right */}
				<div className='absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-dark-background from-0% via-dark-background via-20% to-transparent'></div>
				<div className='absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-dark-background from-0% via-dark-background via-20% to-transparent'></div>
			</>
		);
	}
);

MovieCard.displayName = 'MovieCard';

export default MovieCard;
