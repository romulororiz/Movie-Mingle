import Image from 'next/image';
import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';
import { SkeletonCard } from '@/components/Cards';
import { Icon } from '@/components/Icon';
import { Heading, Ratings } from '@/components/ui';
import { cva } from 'class-variance-authority';

import {
	blurData,
	cn,
	createSlug,
	formatDate,
	getAbsoluteUrl,
	handleMobileImg,
	normalizePopularityScore,
} from '@/lib/utils';

import { CastResponse, MovieOrActor, MovieResponse } from '@/types/tmdb';

import { isCastResponseItem, isMovieResponseItem, isPeopleResponseItem } from '@/utils/typeGuards';
import useWindowSize from '@/hooks/useWindowSize';

interface CardInfoProps {
	item: MovieOrActor | CastResponse;
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

const CardInfo = ({ item, ratings, className, isCurrSlide, isSlider }: CardInfoProps) => {
	if (!isMovieResponseItem(item) && !isPeopleResponseItem(item) && !isCastResponseItem(item))
		return null;

	return (
		<div
			className={cn(
				'mt-3 w-full z-10 flex justify-between items-start max-[380px]:text-[14px]',
				isCurrSlide && 'mt-6 animate-in fade-in duration-1000 md:hidden',
				isSlider && !isCurrSlide && 'hidden',
				className
			)}
		>
			<div className="flex flex-col truncate gap-1">
				<Link href={createSlug(item) || '/'}>
					<Heading
						element="h2"
						truncate={true}
						title={isMovie(item) ? item.title : item.name}
						size="sm"
						id={isMovie(item) ? `movie-title-${item.id}` : `actor-name-${item.id}`}
						className="hover:text-accent-primary transition"
					/>
				</Link>

				{ratings ? (
					isMovie(item) ? (
						<span className="max-[380px]:text-xs text-sm flex gap-1 items-center justify-start ">
							<Icon name="Calendar" size={16} className="shrink-0" />
							{item.release_date ? formatDate(item.release_date.toString()) : 'N/A'}
						</span>
					) : (
						<span className="flex gap-1 items-center text-sm ">
							<Icon name="Star" size={16} fill="#FDBB30" />
							<span className="text-white">
								{normalizePopularityScore(item.popularity || 0)}{' '}
								<span className="text-[#9CA3AF] text-xs">/ 100</span>
							</span>
						</span>
					)
				) : null}
			</div>

			{ratings
				? isMovie(item) && <Ratings movie={item} className="flex items-center gap-[2px]" />
				: null}
		</div>
	);
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
	key?: string;
	ratings?: boolean;
	item: MovieOrActor | CastResponse;
	isLoading?: boolean;
	isSlider?: boolean;
	isCurrSlide?: boolean;
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
	isCurrSlide = false,
}) => {
	const windowSize = useWindowSize();

	if (!isMovieResponseItem(item) && !isPeopleResponseItem(item) && !isCastResponseItem(item))
		return null;

	const cardClasses = cva(
		cn(
			'group transition-all duration-500 cursor-pointer relative aspect-[2/3] overflow-hidden w-full h-full rounded-lg',
			'shadow-xl shadow-black/50',
			'hover:shadow-2xl hover:shadow-accent-primary/20',
			'after:absolute after:inset-0 after:rounded-lg',
			'after:bg-gradient-to-t after:from-black/80 after:via-black/20 after:to-transparent',
			'after:opacity-60 hover:after:opacity-30 after:transition-opacity after:duration-500',
			'before:absolute before:inset-0 before:rounded-lg before:ring-1 before:ring-white/10',
			'hover:before:ring-accent-primary/50 before:transition-all before:duration-500',
			'focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background',
			!isCurrSlide
				? 'after:absolute after:inset-0 after:bg-black/90 after:z-10 after:transition-opacity after:duration-500 after:rounded-lg after:pointer-events-none'
				: ''
		)
	);

	if (isLoading) return <SkeletonCard />;

	return (
		<div
			className={cn(
				'flex flex-col justify-between h-full w-full group/card',
				!isSlider && 'hover:scale-[1.05] duration-500 ease-out'
			)}
		>
			<Link
				href={createSlug(item) || '/'}
				onClick={(e) => {
					isSlider && e.preventDefault();
				}}
				className="relative"
			>
				<figure className={cn(cardClasses({ className }))}>
					<Image
						src={getAbsoluteUrl(
							`https://image.tmdb.org/t/p/${handleMobileImg(windowSize)}`,
							isMovie(item) ? item.poster_path : item.profile_path
						)}
						alt={isMovie(item) ? item.title : item.name}
						fill
						className={cn(
							'h-full w-full object-cover',
							'transition-transform duration-700 ease-out',
							'group-hover/card:scale-110'
						)}
						blurDataURL={blurData}
						placeholder="blur"
						sizes="(min-width: 1024px) 300px, (min-width: 768px) 200px, (min-width: 640px) 200px, 200px"
					/>
					{/* Accent glow effect on hover */}
					<div className="absolute inset-0 bg-accent-primary/0 group-hover/card:bg-accent-primary/5 transition-colors duration-500 rounded-lg" />
				</figure>
			</Link>
			<CardInfo item={item} ratings={ratings} isSlider={isSlider} isCurrSlide={isCurrSlide} />
		</div>
	);
};

Card.displayName = ' Card';

export default Card;
