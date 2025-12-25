'use client';

import { Card } from '@/components/Cards';
import { Heading } from '@/components/ui';
import { BrowsePageSkeleton, CardGridSkeleton } from '@/components/ui/PageSkeleton';
import LoadMore from '@/components/ui/LoadMore';
import { usePopularActorsInfinite } from '@/hooks/useTMDB';
import { notFound } from 'next/navigation';
import { Users } from 'lucide-react';

export default function ActorsPage() {
	const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
		usePopularActorsInfinite();

	if (isLoading) {
		return <BrowsePageSkeleton isActor />;
	}

	if (!data) return notFound();

	const actors = data?.pages?.flatMap((page: any) => page.results ?? []) ?? [];
	const totalResults = (data?.pages?.[0] as any)?.total_results ?? 0;

	return (
		<div className="relative z-10 min-h-screen pt-28 pb-12">
			<div className="container">
				{/* Header */}
				<div className="mb-10">
					<div className="flex items-center gap-3 mb-3">
						<div className="p-3 rounded-xl bg-accent-primary/10 border border-accent-primary/20">
							<Users className="w-7 h-7 text-accent-primary" />
						</div>
						<Heading
							element="h1"
							title="Popular Actors"
							className="text-4xl md:text-5xl font-bold"
						/>
					</div>
					<p className="text-gray-400 text-lg">
						{totalResults > 0 ? `${totalResults.toLocaleString()}+ actors • ` : ''}
						Discover the most popular actors right now
					</p>
				</div>

				{/* Actors Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{actors.map((actor, i) => (
						<Card item={actor} key={`actor-${i}`} />
					))}
				</div>

				{/* Load More */}
				{isFetchingNextPage && (
					<div className="mt-8">
						<CardGridSkeleton count={6} isActor />
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
