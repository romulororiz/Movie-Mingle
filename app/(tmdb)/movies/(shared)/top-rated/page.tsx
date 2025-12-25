'use client';

import { Card } from '@/components/Cards';
import { Heading } from '@/components/ui';
import { BrowsePageSkeleton, CardGridSkeleton } from '@/components/ui/PageSkeleton';
import LoadMore from '@/components/ui/LoadMore';
import { useTopRatedInfinite } from '@/hooks/useTMDB';
import type { MovieResponse } from '@/types/tmdb';
import { notFound } from 'next/navigation';
import { Star } from 'lucide-react';

export default function TopRatedMoviesPage() {
	const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } = useTopRatedInfinite();

	if (isLoading) {
		return <BrowsePageSkeleton />;
	}

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap((page: any) => page.results ?? []) ?? [];
	const totalResults = (data?.pages?.[0] as any)?.total_results ?? 0;

	return (
		<div className="relative z-10 min-h-screen pt-28 pb-12">
			<div className="container">
				{/* Header */}
				<div className="mb-10">
					<div className="flex items-center gap-3 mb-3">
						<div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
							<Star className="w-7 h-7 text-yellow-500" />
						</div>
						<Heading element="h1" title="Top Rated" className="text-4xl md:text-5xl font-bold" />
					</div>
					<p className="text-gray-400 text-lg">
						{totalResults > 0 ? `${totalResults.toLocaleString()}+ movies • ` : ''}
						The highest rated movies of all time
					</p>
				</div>

				{/* Movies Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{moviesData.map((movie: MovieResponse, i: number) => (
						<Card item={movie} key={`movie-${i}`} />
					))}
				</div>

				{/* Load More */}
				{isFetchingNextPage && (
					<div className="mt-8">
						<CardGridSkeleton count={6} />
					</div>
				)}

				{hasNextPage && (
					<div className="mt-12">
						<LoadMore
							fetchNextPage={fetchNextPage}
							isFetchingNextPage={isFetchingNextPage}
							hasNextPage={hasNextPage}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
