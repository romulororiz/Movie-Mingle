import { PeopleResponse } from '@/types/tmdb';
import { cn } from '@/utils/cn';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import { HTMLAttributes, forwardRef } from 'react';
import Heading from './Heading';
import Icon from '../Icon';
import { normalizePopularityScore, slugify } from '@/utils/formaters';
import Link from 'next/link';
import { getActorPath } from '@/utils/renderBg';

const ActorInfo = ({ actor }: { actor: PeopleResponse }) => {
	return (
		<div className='absolute -bottom-8 left-0 w-full z-10 flex justify-between items-start'>
			<Heading element='h3' title={actor.name} size='small' />
			<span className='flex gap-1 items-center text-sm'>
				<Icon name='Star' size={16} fill='#FDBB30' />
				<span className='text-white'>
					{normalizePopularityScore(actor.popularity)}
				</span>
			</span>
		</div>
	);
};

const cardVariants = cva(
	'relative w-[150px] h-[280px] min-w-[150px] bg-cover bg-no-repeat bg-center cursor-pointer rounded-2xl relative after:border-2 after:border-transparent after:content after:rounded-2xl after:absolute after:inset-0 after:bg-dark-background/20 hover:after:bg-transparent after:transition after:hover:border-accent-default'
);

interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardVariants> {
	key?: string;
	actor: PeopleResponse;
	isLoading?: boolean;
	route: string;
}

const ActorCard = forwardRef<HTMLDivElement, CardProps>(
	({ className, actor, isLoading, route, ...props }, ref) => {
		if (!actor) return null;

		return (
			<Link
				href={slugify(route)}
				className={cn(cardVariants({ className }), 'grow')}
				style={getActorPath(actor)}
			>
				<div {...props} ref={ref}>
					<ActorInfo actor={actor} />
				</div>
			</Link>
		);
	}
);

ActorCard.displayName = 'ActorCard';

export default ActorCard;
