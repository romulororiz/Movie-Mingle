import { PeopleResponse } from '@/types/tmdb';
import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const cardVariants = cva(
	'relative  max-w-[200px] h-[350px] bg-cover bg-no-repeat bg-center cursor-pointer rounded-2xl relative after:border-2 after:border-transparent after:content after:rounded-2xl after:absolute after:inset-0 after:bg-dark-background/20 hover:after:bg-transparent after:transition after:hover:border-accent-default',
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
	actor: PeopleResponse;
	isLoading?: boolean;
}

const ActorCard = forwardRef<HTMLDivElement, CardProps>(
	({ className, size, actor, isLoading, ...props }, ref) => {
		if (!actor) return null;

		return (
			<div
				className={cn(cardVariants({ size, className }))}
				style={{
					backgroundImage: `
                url(https://image.tmdb.org/t/p/original${actor.profile_path})
            `,
				}}
				{...props}
				ref={ref}
			>
				<p className='absolute bottom-4 left-4 font-semibold font-robotoSans w-full text-md leading-tight tracking-tight'>
					{actor.name}
				</p>
			</div>
		);
	}
);

ActorCard.displayName = 'ActorCard';

export default ActorCard;
