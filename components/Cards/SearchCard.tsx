import useWindowSize from '@/hooks/useWindowSize';
import {
	blurData,
	cn,
	formatDate,
	getAbsoluteUrl,
	handleMobileImg,
	normalizePopularityScore,
	searchCardSlugHandler,
} from '@/lib/utils';
import { SearchDataResponse } from '@/types/tmdb';
import { isSearchResponseItem } from '@/utils/typeGuards';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';
import { Heading, Ratings } from '@/components/ui';
import { Icon } from '../Icon';
import slugify from 'slugify';

interface SearchCardProps extends HTMLAttributes<HTMLDivElement> {
	item: SearchDataResponse;
}

const mediaTypes = {
	movie: 'poster_path',
	tv: 'poster_path',
	person: 'profile_path',
};

const SearchCard = ({ item, className }: SearchCardProps) => {
	const windowSize = useWindowSize();

	const cardClasses = cva(
		cn(
			'transition shadow-black shadow-md duration-700 cursor-pointer relative aspect-[2/3]',
			'overflow-hidden w-full h-full rounded-md after:rounded-md after:absolute after:inset-0',
			'after:bg-dark-background/30 group-hover:after:bg-transparent hover:after:bg-transparent after:transition focus:outline-none',
			'focus:ring-2 focus:ring-offset-2 focus:ring-accent-primary'
		)
	);

	return (
		<div
			className={cn(
				'flex flex-col justify-between h-full w-full hover:scale-[1.025] duration-300'
			)}
		>
			<Link href={searchCardSlugHandler(item) || '/'}>
				<figure className={cn(cardClasses({ className }))}>
					<Image
						src={getAbsoluteUrl(
							`https://image.tmdb.org/t/p/${handleMobileImg(windowSize)}`,
							item[mediaTypes[item.media_type!]]
						)}
						alt={`${item.media_type}-image`}
						fill
						className={cn('h-full w-full transition')}
						blurDataURL={blurData}
						placeholder='blur'
						sizes='(min-width: 1024px) 300px, (min-width: 768px) 200px, (min-width: 640px) 200px, 200px'
					/>
				</figure>
			</Link>
			<CardInfo item={item} className='group' />
		</div>
	);
};

export default SearchCard;

interface CardInfoProps {
	item: SearchDataResponse;
	className?: string;
}

const CardInfo = ({ item, className }: CardInfoProps) => {
	const { media_type } = item;

	const isMovie = media_type === 'movie';
	const isTv = media_type === 'tv';
	const isPerson = media_type === 'person';

	const titleHandler = () => {
		if (isMovie) return item.title;
		if (isTv) return item.name;
		if (isPerson) return item.name;
	};

	return (
		<div
			className={cn(
				'mt-3 w-full z-10 flex justify-between items-start max-[380px]:text-[14px]',
				className
			)}
		>
			<div className='flex flex-col truncate text-ellipsis overflow-hidden gap-1 w-full'>
				<div className='flex flex-row justify-between gap-1'>
					<Link href={searchCardSlugHandler(item) || '/'}>
						<Heading
							element='h2'
							truncate={true}
							title={titleHandler()}
							size='sm'
							id={titleHandler()}
							className='hover:text-accent-primary transition w-[140px]'
						/>
					</Link>

					<span className='flex gap-1 items-center text-sm min-w'>
						<Icon name='Star' size={16} fill='#FDBB30' />
						<span className='text-white'>
							{normalizePopularityScore(item.popularity || 0)}{' '}
							<span className='text-[#9CA3AF] text-xs'>/ 100</span>
						</span>
					</span>
				</div>

				{!isPerson && (
					<div className='flex flex-row-reverse justify-between'>
						{!isPerson && (
							<span className='max-[380px]:text-xs text-sm flex gap-1 items-center justify-start '>
								<Icon name='Calendar' size={16} className='shrink-0' />
								{formatDate(
									isMovie
										? item.release_date!
										: isTv
										? item.first_air_date!
										: isPerson
										? ''
										: ''
								) || 'N/A'}
							</span>
						)}

						{!isPerson && (
							<span className='max-[380px]:text-xs text-sm flex gap-1 items-center justify-start '>
								<Icon
									name={isMovie ? 'Film' : isTv ? 'Tv' : (isPerson && '') || ''}
									size={16}
									className='shrink-0'
								/>
								{isMovie ? 'Movie' : isTv ? 'Tv Show' : isPerson && ''}
							</span>
						)}
					</div>
				)}

				{isPerson && (
					// actor
					<span className='max-[380px]:text-xs text-sm flex gap-1 items-center justify-start '>
						<Icon name='User' size={16} className='shrink-0' />
						Actor
					</span>
				)}
			</div>
		</div>
	);
};
