'use client';

import { Card } from '@/components/Cards';
import { Heading } from '@/components/ui';
import { BrowsePageSkeleton, CardGridSkeleton } from '@/components/ui/PageSkeleton';
import LoadMore from '@/components/ui/LoadMore';
import { useMoviesByGenre } from '@/hooks/useTMDB';
import { getIdFromSlug } from '@/lib/utils';
import { notFound, useParams } from 'next/navigation';
import { Film } from 'lucide-react';

export default function MoviesByGenrePage() {
	const params = useParams();
	const slug = params?.slug as string;
	const genreId = getIdFromSlug(slug);
	const genreName = slug?.split('-')[0]?.replace(/%20/g, ' ') ?? '';

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useMoviesByGenre(genreId);

	if (isLoading) {
		return <BrowsePageSkeleton />;
	}

	if (!data) return notFound();

	const totalResults = (data?.pages?.[0] as any)?.total_results ?? 0;
	const moviesData = data?.pages?.flatMap((page: any) => page.results ?? []) ?? [];

	return (
		<div className="relative z-10 min-h-screen pt-28 pb-12">
			<div className="container">
				{/* Header */}
				<div className="mb-10">
					<div className="flex items-center gap-3 mb-3">
						<div className="p-3 rounded-xl bg-accent-primary/10 border border-accent-primary/20">
							<Film className="w-7 h-7 text-accent-primary" />
						</div>
						<Heading
							element="h1"
							title={genreName.charAt(0).toUpperCase() + genreName.slice(1)}
							className="text-4xl md:text-5xl font-bold"
						/>
					</div>
					<p className="text-gray-400 text-lg">
						{totalResults.toLocaleString()} movies in this genre
					</p>
				</div>

				{/* Movies Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
					{moviesData.map((movie) => (
						<Card key={`movie-${movie.id}`} item={movie} />
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
