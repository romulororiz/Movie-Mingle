'use client';

import { SearchCard } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import { Icon } from '@/components/Icon';
import { Button, Heading, Input, Paragraph } from '@/components/ui';
import { useDebounce } from '@/hooks/use-debounce';
import { useSearchInfinite } from '@/hooks/useTMDB';
import { SearchDataResponse } from '@/types/tmdb';
import { useRouter, useSearchParams } from 'next/navigation';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';

const FILTERS: { key: SearchDataResponse['media_type']; label: string }[] = [
        { key: 'movie', label: 'Movies' },
        { key: 'tv', label: 'TV Shows' },
        { key: 'person', label: 'People' },
];

const formatResultCount = (count: number) => {
        const formatter = new Intl.NumberFormat('en-US');
        return `${formatter.format(count)} result${count === 1 ? '' : 's'}`;
};

const SearchPage = () => {
        const router = useRouter();
        const searchParams = useSearchParams();
        const initialQuery = searchParams.get('q') ?? '';

        const [searchValue, setSearchValue] = useState(initialQuery);
        const [activeTypes, setActiveTypes] = useState<Set<SearchDataResponse['media_type']>>(
                new Set(['movie', 'tv', 'person'])
        );

        const debouncedQuery = useDebounce(searchValue.trim(), 400);

        useEffect(() => {
                setSearchValue(initialQuery);
        }, [initialQuery]);

        const {
                data,
                isFetchingNextPage,
                fetchNextPage,
                isLoading,
                hasNextPage,
                isError,
                refetch,
        } = useSearchInfinite(debouncedQuery, { enabled: debouncedQuery.length > 0 });

        const allResults = useMemo(
                () => data?.pages?.flatMap(page => page.results || []) ?? [],
                [data]
        );

        const mediaTypeCounts = useMemo(() => {
                return allResults.reduce((acc, item) => {
                        const type = item.media_type ?? 'other';
                        acc[type] = (acc[type] ?? 0) + 1;
                        return acc;
                }, {} as Record<string, number>);
        }, [allResults]);

        const filteredResults = useMemo(() => {
                if (!activeTypes.size) return allResults;

                return allResults.filter(item => {
                        const type = item.media_type as SearchDataResponse['media_type'];
                        return activeTypes.has(type);
                });
        }, [activeTypes, allResults]);

        const totalResults = data?.pages?.[0]?.total_results ?? 0;
        const showEmptyQuery = debouncedQuery.length === 0;
        const showSkeleton = isLoading && !data;

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const nextQuery = searchValue.trim();

                router.replace(nextQuery ? `/search?q=${encodeURIComponent(nextQuery)}` : '/search');
        };

        const handleClear = () => {
                setSearchValue('');
                router.replace('/search');
        };

        const toggleFilter = (type: SearchDataResponse['media_type']) => {
                setActiveTypes(prev => {
                        const next = new Set(prev);

                        if (next.has(type)) {
                                next.delete(type);

                                return next.size ? next : prev;
                        }

                        next.add(type);
                        return next;
                });
        };

        return (
                <div className='space-y-8'>
                        <div className='rounded-2xl border border-white/10 bg-dark-background/60 p-5 shadow-2xl shadow-black/30 backdrop-blur-md md:p-7'>
                                <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                                        <div className='space-y-2'>
                                                <Heading element='h1' title='Search the catalog' size='lg' icon='Search' />
                                                <Paragraph className='max-w-2xl text-left text-slate-200'>
                                                        Find movies, TV shows, and people. Adjust filters to narrow your results and
                                                        load more when you reach the bottom.
                                                </Paragraph>
                                        </div>

                                        <form
                                                onSubmit={handleSubmit}
                                                className='flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-end md:w-auto'
                                        >
                                                <Input
                                                        value={searchValue}
                                                        onChange={event => setSearchValue(event.target.value)}
                                                        placeholder='Search for a title, genre, or person'
                                                        aria-label='Search movies, shows, and people'
                                                        className='w-full min-w-[250px] sm:w-80'
                                                />
                                                <div className='flex gap-2'>
                                                        <Button type='submit' size='md' disabled={!searchValue.trim()}>
                                                                Search
                                                        </Button>
                                                        {searchValue && (
                                                                <Button
                                                                        type='button'
                                                                        variant='ghost'
                                                                        size='md'
                                                                        onClick={handleClear}
                                                                >
                                                                        Clear
                                                                </Button>
                                                        )}
                                                </div>
                                        </form>
                                </div>

                                <div className='mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-200'>
                                        <div className='flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs sm:text-sm'>
                                                <Icon name='TrendingUp' size={16} />
                                                <span>
                                                        {showEmptyQuery
                                                                ? 'Start typing to explore the catalog'
                                                                : formatResultCount(totalResults)}
                                                </span>
                                        </div>

                                        <div className='flex flex-wrap items-center gap-2'>
                                                {FILTERS.map(filter => (
                                                        <Button
                                                                key={filter.key}
                                                                type='button'
                                                                variant={activeTypes.has(filter.key) ? 'subtle' : 'outline'}
                                                                size='sm'
                                                                className='capitalize'
                                                                onClick={() => toggleFilter(filter.key)}
                                                        >
                                                                {filter.label}
                                                                <span className='ml-2 text-xs text-slate-900/80'>
                                                                        {mediaTypeCounts[filter.key] ?? 0}
                                                                </span>
                                                        </Button>
                                                ))}
                                        </div>
                                </div>
                        </div>

                        {showEmptyQuery ? (
                                <div className='rounded-xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/20'>
                                        <Heading element='h2' size='md' title='Nothing to show yet' icon='Sparkles' />
                                        <Paragraph className='mt-3 text-slate-200'>
                                                Try a movie title, TV show, or actor name to get personalized results.
                                        </Paragraph>
                                </div>
                        ) : isError ? (
                                <div className='rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-center shadow-lg shadow-red-900/30'>
                                        <Heading element='h2' size='md' title='We could not load results' icon='AlertTriangle' />
                                        <Paragraph className='mt-3 text-slate-200'>
                                                Please check your connection and try again.
                                        </Paragraph>
                                        <div className='mt-4 flex justify-center'>
                                                <Button onClick={() => refetch()} size='md'>
                                                        Retry search
                                                </Button>
                                        </div>
                                </div>
                        ) : showSkeleton ? (
                                <Section
                                        route='#'
                                        title={debouncedQuery ? `Searching for "${debouncedQuery}"` : 'Searching...'}
                                        seeMore={false}
                                        icon='Search'
                                >
                                        <RenderSkeletonCards isMovie={true} />
                                </Section>
                        ) : filteredResults.length === 0 ? (
                                <div className='rounded-xl border border-white/10 bg-white/5 p-8 text-center shadow-xl shadow-black/20'>
                                        <Heading element='h2' size='md' title='No matches found' icon='SearchX' />
                                        <Paragraph className='mt-3 text-slate-200'>
                                                We could not find results for “{debouncedQuery}” with the current filters.
                                        </Paragraph>
                                        <div className='mt-4 flex flex-wrap justify-center gap-3'>
                                                <Button onClick={handleClear} size='md'>
                                                        Reset search
                                                </Button>
                                                <Button
                                                        variant='outline'
                                                        size='md'
                                                        onClick={() => setActiveTypes(new Set(FILTERS.map(filter => filter.key)))}
                                                >
                                                        Show all types
                                                </Button>
                                        </div>
                                </div>
                        ) : (
                                <Section
                                        route='#'
                                        title={`Search results for "${debouncedQuery}"`}
                                        seeMore={false}
                                        icon='Search'
                                >
                                        {filteredResults.map((item, index) => (
                                                <SearchCard item={item} key={`item-${item.id}-${index}`} />
                                        ))}

                                        <div className='col-span-full mt-10 flex justify-center'>
                                                {hasNextPage ? (
                                                        <Button
                                                                onClick={() => fetchNextPage()}
                                                                isLoading={isFetchingNextPage}
                                                                size='md'
                                                                className='px-6'
                                                        >
                                                                {isFetchingNextPage ? 'Loading more' : 'Load more results'}
                                                        </Button>
                                                ) : (
                                                        <Paragraph className='text-slate-200'>
                                                                You have reached the end of the results.
                                                        </Paragraph>
                                                )}
                                        </div>
                                </Section>
                        )}
                </div>
        );
};

export default SearchPage;
