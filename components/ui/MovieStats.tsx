import { createSlug, formatDate } from '@/lib/utils';
import { MovieDetailResponse } from '@/types/tmdb';
import { FC } from 'react';
import { Icon } from '@/components/Icon';
import Ratings from '@/components/ui/Ratings';
import { Badge } from '@/components/ui/Badge';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';

const toolTipProps = {
	className: 'bg-dark-background text-slate-200 border-none',
};

interface Stat {
	name: string;
	icon?: string;
}

export const stats: Stat[] = [
	{
		name: 'budget',
		icon: 'DollarSign',
	},
	{
		name: 'revenue',
		icon: 'LineChart',
	},
	{
		name: 'runtime',
		icon: 'Clock',
	},
	{
		name: 'release_date',
		icon: 'Calendar',
	},
	{
		name: 'spoken_languages',
		icon: 'Globe',
	},
	{
		name: 'vote_average',
	},
];

const renderStat = (stat: Stat, item: MovieDetailResponse) => {
	switch (stat.name) {
		case 'budget':
			return (
				<>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Icon name={stat.icon || ''} size={20} />
							</TooltipTrigger>
							<TooltipContent className={toolTipProps.className}>
								{stat.name}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<span className='text-sm md:text-md font-normal'>
						{item?.budget?.toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
							notation: 'compact',
						})}
					</span>
				</>
			);
		case 'revenue':
			return (
				<>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Icon name={stat.icon || ''} size={20} />
							</TooltipTrigger>
							<TooltipContent className={toolTipProps.className}>
								{stat.name}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<span className='text-sm md:text-md font-normal'>
						{item?.revenue?.toLocaleString('en-US', {
							style: 'currency',
							currency: 'USD',
							notation: 'compact',
						})}
					</span>
				</>
			);
		case 'runtime':
			return (
				<>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Icon name={stat.icon || ''} size={20} />
							</TooltipTrigger>
							<TooltipContent className={toolTipProps.className}>
								{stat.name}
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<span className='text-sm md:text-md font-normal'>
						{Math.floor(item.runtime / 60)}h {item.runtime % 60}m
					</span>
				</>
			);
		case 'vote_average':
			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Ratings movie={item} className='flex items-center gap-2' />
						</TooltipTrigger>
						<TooltipContent className={toolTipProps.className}>
							{stat.name}
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			);
			return <Ratings movie={item} className='flex items-center gap-2' />;
		case 'release_date':
			return (
				<>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Icon name={stat.icon || ''} size={20} />
							</TooltipTrigger>
							<TooltipContent className={toolTipProps.className}>
								release date
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<span className='text-sm md:text-md font-normal'>
						{item?.release_date ? formatDate(item.release_date) : 'N/A'}
					</span>
				</>
			);
		case 'spoken_languages': {
			return item?.spoken_languages?.length > 0 ? (
				<>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Icon name={stat.icon || ''} size={20} />
							</TooltipTrigger>
							<TooltipContent className={toolTipProps.className}>
								languages
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<span className='text-sm md:text-md font-normal uppercase'>
						{item.spoken_languages.map(lang => lang.iso_639_1).join(', ')}
					</span>
				</>
			) : (
				'N/A'
			);
		}
		default:
			return null;
	}
};

export const GenreItem = ({ item }: { item: MovieDetailResponse }) => {
	return (
		<div className='flex flex-wrap-reverse gap-2 justify-center md:justify-start'>
			{item?.genres
				? item?.genres?.map(genre => (
						<Link href={createSlug(genre) || '/'} key={genre.id}>
							<Badge
								key={genre.id}
								className='bg-accent-primary text-dark-background uppercase text-[10px] md:text-[12px] font-semibold'
							>
								{genre.name}
							</Badge>
						</Link>
				  ))
				: 'N/A'}
		</div>
	);
};

interface MovieStatsProps {
	item: MovieDetailResponse;
}

const MovieStats: FC<MovieStatsProps> = ({ item }: MovieStatsProps) => {
	return (
		<div className='grid place-content-start grid-rows-2 grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto md:mx-0'>
			{stats.map(stat => (
				<div key={stat.name} className='flex items-center gap-2'>
					{renderStat(stat, item)}
				</div>
			))}
		</div>
	);
};

export default MovieStats;
