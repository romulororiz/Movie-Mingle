'use client';

import { useRouter } from 'next/navigation';
import { cn, createSlug } from '@/lib/utils';
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
import { SearchData, SearchDataItem } from '@/types/tmdb';
import { Icon } from '@/components/Icon';
import { isMovieResponseItem, isPeopleResponseItem } from '@/utils/typeGuards';
import { Skeleton } from './Skeleton';
import Image from 'next/image';

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

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setIsOpen(isOpen => !isOpen);
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, []);

	const handleSelect = useCallback((callback: () => unknown) => {
		setIsOpen(false);
		callback();
	}, []);

	useEffect(() => {
		if (!isOpen) {
			setQuery('');
		}
	}, [isOpen]);

	const itemTypeGuardRouteHandler = (item: SearchDataItem) => {
		if (isMovieResponseItem(item)) {
			return `${createSlug(item)}`;
		} else if (isPeopleResponseItem(item)) {
			return `${createSlug(item)}`;
		} else {
			return '';
		}
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
												width={100}
												height={100}
												className='rounded'
											/>
										</div>
									) : isPeopleResponseItem(item) &&
									  item.profile_path !== null ? (
										<div className='flex items-center space-x-2 flex-shrink-0'>
											<Image
												src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
												alt={item.name || 'No name available'}
												width={100}
												height={100}
												className='rounded'
											/>
										</div>
									) : (
										<div className='flex items-center space-x-2 flex-shrink-0'>
											<Image
												src='/assets/no-image.jpg'
												alt='No image available'
												width={100}
												height={100}
												className='rounded'
											/>
										</div>
									)}
									<CommandItem
										key={item.id}
										onSelect={() =>
											handleSelect(() =>
												router.push(itemTypeGuardRouteHandler(item))
											)
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
			</CommandDialog>
		</>
	);
};
export default Combobox;
