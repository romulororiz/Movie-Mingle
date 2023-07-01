import { GenreResponse, MovieDetailResponse } from '@/types/tmdb';
import { FC } from 'react';
import { Icon } from '../Icon';
import { formatDate } from '@/lib/utils';
import Ratings from './Ratings';

interface Stat {
	name: string;
	icon?: string;
}

const stats: Stat[] = [
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
					<Icon name={stat.icon || ''} size={20} />
					<span className='text-sm md:text-md font-normal'>
						{item.budget.toLocaleString('en-US', {
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
					<Icon name={stat.icon || ''} size={20} />
					<span className='text-sm md:text-md font-normal'>
						{item.revenue.toLocaleString('en-US', {
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
					<Icon name={stat.icon || ''} size={20} />
					<span className='text-sm md:text-md font-normal'>
						{item.runtime} min
					</span>
				</>
			);
		case 'vote_average':
			return <Ratings movie={item} className='flex items-center gap-2' />;
		case 'release_date':
			return (
				<>
					<Icon name={stat.icon || ''} size={20} />
					<span className='text-sm md:text-md font-normal'>
						{formatDate(item.release_date)}
					</span>
				</>
			);
		case 'spoken_languages': {
			return (
				item.spoken_languages.length > 0 && (
					<>
						<Icon name={stat.icon || ''} size={20} />
						<span className='text-sm md:text-md font-normal uppercase'>
							{item.spoken_languages.map(lang => lang.iso_639_1).join(', ')}
						</span>
					</>
				)
			);
		}
		default:
			return null;
	}
};

export const GenreItem = ({ item }: { item: MovieDetailResponse }) => {
	return (
		<div className='flex flex-wrap-reverse gap-3 justify-center md:justify-start'>
			{item.genres.map(genre => (
				<span
					key={genre.id}
					className={
						'p-2 px-4 rounded-full bg-accent-primary text-dark-background text-[10px] uppercase font-semibold'
					}
				>
					{genre.name}
				</span>
			))}
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
