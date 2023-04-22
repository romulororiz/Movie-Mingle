import { PeopleResponse } from '@/types/tmdb';
import { cn } from '@/utils/cn';
import { normalizePopularityScore, slugify } from '@/utils/formaters';
import { VariantProps, cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import Icon from '../Icon';
import Heading from './Heading';
import { getActorPath } from '@/utils/getPath';

const ActorInfo = ({ actor }: { actor: PeopleResponse }) => {
	return (
		<div className='mt-2 w-full z-10 flex justify-between items-start'>
			<Heading
				element='h3'
				title={actor.name}
				size='small'
				className='truncate'
			/>
			<span className='flex gap-1 items-center text-sm'>
				<Icon name='Star' size={16} fill='#FDBB30' />
				<span className='text-white'>
					{normalizePopularityScore(actor.popularity)}
				</span>
			</span>
		</div>
	);
};

const cardClasses = cva(
	'transition shadow-black shadow-md duration-700 cursor-pointer relative aspect-[2/3] overflow-hidden w-full h-full rounded-md after:rounded-md after:absolute after:inset-0 after:bg-dark-background/30 hover:after:bg-transparent after:transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryAccent-default'
);

interface CardProps
	extends HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cardClasses> {
	key?: string;
	actor: PeopleResponse;
	isLoading?: boolean;
	route: string;
}

const generateArialLabel = (actor: PeopleResponse) => {
	return `${actor.name}, Rating: ${actor.popularity}`;
};

const ActorCard: FC<CardProps> = ({ className, actor, isLoading, route }) => {
	if (!actor) return null;

	return (
		<div className='h-full w-full flex flex-col'>
			<Link
				href={slugify(route)}
				aria-label={generateArialLabel(actor)}
				aria-labelledby={`actor-title-${actor.id}`}
				tabIndex={0}
			>
				<figure className={cn(cardClasses({ className }))}>
					<Image
						src={getActorPath(actor).backgroundImage || ''}
						alt={actor.name}
						fill
						priority
						sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
					/>
				</figure>
			</Link>
			<ActorInfo actor={actor} />
		</div>
	);
};

ActorCard.displayName = 'ActorCard';

export default ActorCard;
