import { blurData, cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Icon } from '@/components/Icon';
import { Heading } from '@/components/ui';
import { Ratings } from '@/components/ui';
import { SkeletonCard } from '@/components/Cards';
import { getAbsoluteUrl } from '@/lib/utils';
import { CastResponse, MovieOrActor, MovieResponse } from '@/types/tmdb';
import { FC, HTMLAttributes, useState } from 'react';
import { createSlug, formatDate, normalizePopularityScore } from '@/lib/utils';

import Link from 'next/link';
import Image from 'next/image';
import {
	isCastResponseItem,
	isMovieResponseItem,
	isPeopleResponseItem,
} from '@/utils/typeGuards';

interface CardInfoProps {
	item: MovieOrActor | CastResponse;
	ratings?: boolean;
	options?: {
		isMovie?: boolean;
	};
}

const isMovie = (item: MovieOrActor | CastResponse): item is MovieResponse => {
	return isMovieResponseItem(item);
};

const CardInfo = ({ item, ratings }: CardInfoProps) => {
	if (
		!isMovieResponseItem(item) &&
		!isPeopleResponseItem(item) &&
		!isCastResponseItem(item)
	)
		return null;

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

				{ratings ? (
					isMovie(item) ? (
						<span className='text-sm flex gap-1 items-center justify-start'>
							<Icon name='Calendar' size={16} />
							{formatDate(item.release_date.toString())}
						</span>
					) : (
						<span className='flex gap-1 items-center text-sm'>
							<Icon name='Star' size={16} fill='#FDBB30' />
							<span className='text-white'>
								{normalizePopularityScore(item.popularity)}
							</span>
						</span>
					)
				) : null}
			</div>

			{ratings
				? isMovie(item) && (
						<Ratings movie={item} className='flex items-center gap-2' />
				  )
				: null}
		</div>
	);
};

const generateArialLabel = (
	item: MovieOrActor | CastResponse
): string | undefined => {
	if (
		!isMovieResponseItem(item) &&
		!isPeopleResponseItem(item) &&
		!isCastResponseItem(item)
	)
		return;

	if (isMovie(item))
		return `${item.title}, released on ${formatDate(
			item.release_date.toString(),
			'MMMM yyyy'
		)}, IMDB rating: ${item.vote_average}`;

	return `${item.name}, IMDB rating: ${item.popularity}`;
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	key?: string;
	ratings?: boolean;
	item: MovieOrActor | CastResponse;
	isLoading?: boolean;
	isSlider?: boolean;
	options?: {
		isMovie?: boolean;
	};
}

const Card: FC<CardProps> = ({
	item,
	ratings = true,
	className,
	isLoading,
	isSlider = false,
}) => {
	const [isImgLoading, setIsImgLoading] = useState(true);

	if (
		!isMovieResponseItem(item) &&
		!isPeopleResponseItem(item) &&
		!isCastResponseItem(item)
	)
		return null;

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
						src={getAbsoluteUrl(
							'https://image.tmdb.org/t/p/w780',
							isMovie(item) ? item.poster_path : item.profile_path
						)}
						alt={isMovie(item) ? item.title : item.name}
						width='0'
						height='0'
						className={cn(
							'h-full w-full transition',
							isImgLoading
								? 'grayscale blur-2xl scale-105 duration-200'
								: 'grayscale-0 blur-0 scale-100 duration-200'
						)}
						sizes='(min-width: 1024px) 300px, (min-width: 768px) 200px, (min-width: 640px) 150px'
						placeholder='blur'
						blurDataURL={blurData}
						onLoadingComplete={() => setIsImgLoading(false)}
					/>
				</figure>
			</Link>
			{!isSlider && <CardInfo item={item} ratings={ratings} />}
		</div>
	);
};

Card.displayName = ' Card';

export default Card;
