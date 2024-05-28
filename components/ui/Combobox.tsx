'use client';

import { useRouter } from 'next/navigation';
import { blurData, cn, createSlug } from '@/lib/utils';
import { useDebounce } from '@/hooks/use-debounce';
import { Button } from '@/components/ui/Button';

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/Command';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { useSearch } from '@/hooks/useTMDB';
import { SearchData, SearchDataResponse } from '@/types/tmdb';
import { Icon } from '@/components/Icon';
import { isMovieResponseItem, isPeopleResponseItem } from '@/utils/typeGuards';
import { Skeleton } from './Skeleton';
import Image from 'next/image';
import Link from 'next/link';
import slugify from 'slugify';

const Combobox = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState('');
	const debouncedQuery = useDebounce(query, 300);
	const [data, setData] = useState<{
		results: SearchData['results'];
	} | null>(null);

	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const { data: queryResult } = useSearch(debouncedQuery);

	useEffect(() => {
		if (debouncedQuery.length === 0) setData(null);

		if (debouncedQuery.length > 0) {
			startTransition(() => {
				setData({
					results: queryResult?.results!,
				});
			});
		}
	}, [debouncedQuery, queryResult]);

	const handleSelect = useCallback((callback: () => unknown) => {
		setIsOpen(false);
		callback();
	}, []);

	useEffect(() => {
		if (!isOpen) {
			setQuery('');
		}
	}, [isOpen]);

	const routeHandler = (item: SearchDataResponse) => {
		const { media_type } = item;
		if (media_type === 'movie') {
			return `/movies/${slugify(item.title as string)}-${item.id}`;
		}
		if (media_type === 'tv') {
			return `/tv/${slugify(item.name as string)}-${item.id}`;
		}
		if (media_type === 'person') {
			return `/actors/${slugify(item.name as string)}-${item.id}`;
		}

		return '/';
	};

	return (
		<>
			<Icon
				name='Search'
				size={20}
				aria-hidden='true'
				className='cursor-pointer shrink-0'
				onClick={() => setIsOpen(true)}
			/>
			<CommandDialog position='top' open={isOpen} onOpenChange={setIsOpen}>
				<CommandInput
					placeholder='Search...'
					value={query}
					onValueChange={setQuery}
				/>
				<CommandList>
					<CommandEmpty
						className={cn(isPending ? 'hidden' : 'py-6 text-center text-sm')}
					>
						Nothing to show.
					</CommandEmpty>
					{isPending ? (
						<div className='space-y-1 overflow-hidden px-1 py-2'>
							<Skeleton className='h-4 w-10 rounded' />
							<div className='flex w-full gap-x-1'>
								<Skeleton className='h-40 w-[100px] rounded-sm' />
								<div className='flex flex-col justify-center gap-3'>
									<Skeleton className='h-5 w-40 rounded-sm' />
									<Skeleton className='h-5 w-32 rounded-sm' />
								</div>
							</div>
						</div>
					) : (
						data?.results?.map(item => (
							<CommandGroup
								key={item.id}
								heading={item.media_type === 'movie' ? 'Movies' : 'People'}
								className='capitalize'
							>
								<div className='flex items-center'>
									{isMovieResponseItem(item) && item.poster_path !== null ? (
										<div className='flex items-center space-x-2 flex-shrink-0'>
											<Image
												src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
												alt={item.title || 'No title available'}
												width={85}
												height={100}
												placeholder='blur'
												blurDataURL={blurData}
												className='rounded'
											/>
										</div>
									) : isPeopleResponseItem(item) &&
									  item.profile_path !== null ? (
										<div className='flex items-center space-x-2 flex-shrink-0'>
											<Image
												src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
												alt={item.name || 'No name available'}
												width={85}
												height={100}
												placeholder='blur'
												blurDataURL={blurData}
												className='rounded'
											/>
										</div>
									) : (
										<div className='flex items-center space-x-2 flex-shrink-0'>
											<Image
												src='/assets/no-image.jpg'
												alt='No image available'
												width={85}
												height={100}
												placeholder='blur'
												blurDataURL={blurData}
												className='rounded'
											/>
										</div>
									)}
									<CommandItem
										key={item.id}
										onSelect={() =>
											handleSelect(() => router.push(routeHandler(item)))
										}
										className='-mt-3 cursor-pointer hover:text-accent-secondary transition'
									>
										{isMovieResponseItem(item) ? item.title : item.name}
									</CommandItem>
								</div>
							</CommandGroup>
						))
					)}
				</CommandList>
				{data && data?.results?.length > 0 && (
					<div className='flex justify-center my-4'>
						<Button variant='link' size='sm' onClick={() => setIsOpen(false)}>
							<Link href={`/search?q=${query}`}>See all</Link>
						</Button>
					</div>
				)}
			</CommandDialog>
		</>
	);
};
export default Combobox;
