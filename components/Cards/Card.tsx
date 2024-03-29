import { blurData, cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import { Icon } from '@/components/Icon';
import { Heading } from '@/components/ui';
import { Ratings } from '@/components/ui';
import { SkeletonCard } from '@/components/Cards';
import { getAbsoluteUrl } from '@/lib/utils';
import { CastResponse, MovieOrActor, MovieResponse, TvResponse } from '@/types/tmdb';
import { FC, HTMLAttributes, useState } from 'react';
import { createSlug, formatDate, normalizePopularityScore } from '@/lib/utils';

import Link from 'next/link';
import Image from 'next/image';
import {
	isCastResponseItem,
	isMovieResponseItem,
	isPeopleResponseItem,
} from '@/utils/typeGuards';
import { useWindowSize } from 'usehooks-ts';

interface CardInfoProps {
	item: MovieOrActor | CastResponse | TvResponse;
	isCurrSlide?: boolean;
	isSlider?: boolean;
	className?: string;
	ratings?: boolean;
	options?: {
		isMovie?: boolean;
	};
}

const isMovie = (item: MovieOrActor | CastResponse): item is MovieResponse => {
	return isMovieResponseItem(item);
};

const CardInfo = ({
	item,
	ratings,
	className,
	isCurrSlide,
	isSlider,
}: CardInfoProps) => {
	if (
		!isMovieResponseItem(item) &&
		!isPeopleResponseItem(item) &&
		!isCastResponseItem(item)
	)
		return null;

	return (
		<div
			data-state={isCurrSlide ? 'open' : 'closed'}
			className={cn(
				'mt-3 w-full z-10 flex justify-between items-start max-[380px]:text-[14px]',
				isCurrSlide && 'mt-6 animate-in fade-in duration-1000 md:hidden',
				isSlider && !isCurrSlide && 'hidden',
				className
			)}
		>
			<div className='flex flex-col truncate gap-1'>
				<Link href={createSlug(item) || '/'}>
					<Heading
						element='h2'
						truncate={true}
						title={isMovie(item) ? item.title : item.name}
						size='sm'
						id={
							isMovie(item) ? `movie-title-${item.id}` : `actor-name-${item.id}`
						}
						className='hover:text-accent-primary transition'
					/>
				</Link>

				{ratings ? (
					isMovie(item) ? (
						<span className='max-[380px]:text-xs text-sm flex gap-1 items-center justify-start '>
							<Icon name='Calendar' size={16} className='shrink-0' />
							{formatDate(item.release_date.toString())}
						</span>
					) : (
						<span className='flex gap-1 items-center text-sm '>
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
						<Ratings movie={item} className='flex items-center gap-[2px]' />
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
			item .release_date.toString(),
			'MMMM yyyy'
		)}, IMDB rating: ${item.vote_average}`;

	return `${item.name}, IMDB rating: ${item.popularity}`;
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	key?: string;
	ratings?: boolean;
	item: MovieOrActor | CastResponse | TvResponse;
	isLoading?: boolean;
	isSlider?: boolean;
	isCurrSlide?: boolean;
	options?: {
		isMovie?: boolean;
	};
}

const handleMobileImg = (width: number) => {
	if (width! <= 768) {
		return 'w300';
	} else {
		return 'w780';
	}
};

const Card: FC<CardProps> = ({
	item,
	ratings = true,
	className,
	isLoading,
	isSlider = false,
	isCurrSlide = false,
}) => {
	const { width } = useWindowSize();

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
		<div
			className={cn(
				'flex flex-col justify-between h-full w-full',
				!isSlider && 'hover:scale-[1.025] duration-300'
			)}
		>
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
							`https://image.tmdb.org/t/p/${handleMobileImg(width)}`,
							isMovie(item) ? item.poster_path : item.profile_path
						)}
						alt={isMovie(item) ? item.title : item.name}
						fill
						className={cn('h-full w-full transition')}
						blurDataURL={blurData}
						placeholder='blur'
						sizes='(min-width: 1024px) 300px, (min-width: 768px) 200px, (min-width: 640px) 200px, 200px'
					/>
				</figure>
			</Link>
			<CardInfo
				item={item}
				ratings={ratings}
				isSlider={isSlider}
				isCurrSlide={isCurrSlide}
			/>
		</div>
	);
};

Card.displayName = ' Card';

export default Card;
