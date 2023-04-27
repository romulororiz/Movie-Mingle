import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/utils/cn';
import { Icon } from '@/components/Icon';
import { Heading } from '@/components/ui';
import { getActorPath } from '@/utils/getPath';
import { PeopleResponse } from '@/types/tmdb';
import { VariantProps, cva } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';
import { normalizePopularityScore, slugify } from '@/utils/formaters';

const ActorInfo = ({ actor }: { actor: PeopleResponse }) => {
	return (
		<div className='mt-2 w-full z-10 flex justify-between items-start'>
			<Heading
				element='h2'
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
			>
				<figure className={cn(cardClasses({ className }))}>
					<Image
						src={getActorPath(actor).backgroundImage || ''}
						alt={actor.name}
						width='0'
						height='0'
						sizes='100vw'
						className='w-full h-full'
						priority
					/>
				</figure>
			</Link>
			<ActorInfo actor={actor} />
		</div>
	);
};

ActorCard.displayName = 'ActorCard';

export default ActorCard;
