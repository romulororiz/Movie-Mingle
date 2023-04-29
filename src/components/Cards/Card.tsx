import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { Icon } from '@/components/Icon';
import { Heading } from '@/components/ui';
import { Ratings } from '@/components/ui';
import { SkeletonCard } from '@/components/Cards';
import { getImagePath } from '@/utils/getPath';
import { MovieOrActor, MovieResponse } from '@/types/tmdb';
import { FC, HTMLAttributes } from 'react';
import {
	createSlug,
	formatDate,
	normalizePopularityScore,
} from '@/utils/formaters';

import Link from 'next/link';
import Image from 'next/image';
import { isMovieResponseItem, isPeopleResponseItem } from '@/utils/typeGuards';

interface CardInfoProps {
	item: MovieOrActor;
	options?: {
		isMovie?: boolean;
	};
}

const isMovie = (item: MovieOrActor): item is MovieResponse => {
	return isMovieResponseItem(item);
};

const CardInfo = ({ item }: CardInfoProps) => {
	if (!isMovieResponseItem(item) && !isPeopleResponseItem(item)) return null;

	return (
		<div className='mt-2 w-full z-10 flex justify-between items-start'>
			<div className='flex flex-col truncate gap-1'>
				<Link href={createSlug(item) || '/'}>
					<Heading
						element='h2'
						title={isMovie(item) ? item.title : item.name}
						size='sm'
						id={
							isMovie(item) ? `movie-title-${item.id}` : `actor-name-${item.id}`
						}
						className='hover:text-accent-primary transition truncate'
					/>
				</Link>
				{isMovie(item) ? (
					<span className='text-sm flex gap-1 items-center justify-start'>
						<Icon name='Calendar' size={16} />
						{formatDate(item.release_date.toString(), 'MMM yyyy')}
					</span>
				) : (
					<span className='flex gap-1 items-center text-sm'>
						<Icon name='Star' size={16} fill='#FDBB30' />
						<span className='text-white'>
							{normalizePopularityScore(item.popularity)}
						</span>
					</span>
				)}
			</div>
			{isMovie(item) && (
				<Ratings movie={item} className='flex items-center gap-2' />
			)}
		</div>
	);
};

const generateArialLabel = (item: MovieOrActor): string | undefined => {
	if (!isMovieResponseItem(item) && !isPeopleResponseItem(item)) return;

	if (isMovie(item))
		return `${item.title}, released on ${formatDate(
			item.release_date.toString(),
			'MMMM yyyy'
		)}, IMDB rating: ${item.vote_average}`;

	return `${item.name}, IMDB rating: ${item.popularity}`;
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	key?: string;
	item: MovieOrActor;
	isLoading?: boolean;
	isSlider?: boolean;
	options?: {
		isMovie?: boolean;
	};
}

const Card: FC<CardProps> = ({
	item,
	className,
	isLoading,
	isSlider = false,
}) => {
	if (!isMovieResponseItem(item) && !isPeopleResponseItem(item)) return null;

	const cardClasses = cva(
		cn(
			'transition shadow-black shadow-md duration-700 cursor-pointer relative aspect-[2/3] overflow-hidden w-full h-full rounded-md after:rounded-md after:absolute after:inset-0 after:bg-dark-background/30 hover:after:bg-transparent after:transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary'
		)
	);

	if (isLoading) return <SkeletonCard />;

	return (
		<div className='h-full w-full flex flex-col justify-between'>
			<Link
				href={createSlug(item) || '/'}
				onClick={e => {
					isSlider && e.preventDefault();
				}}
				aria-label={generateArialLabel(item)}
				aria-labelledby={
					isMovie(item) ? `movie-title-${item.id}` : `actor-name-${item.id}`
				}
			>
				<figure className={cn(cardClasses({ className }))}>
					<Image
						src={getImagePath(item)}
						alt={isMovie(item) ? item.title : item.name}
						width='0'
						height='0'
						sizes='100vw'
						className='w-full h-full'
						priority
					/>
				</figure>
			</Link>
			{!isSlider && <CardInfo item={item} />}
		</div>
	);
};

Card.displayName = ' Card';

export default Card;
