'use client';

import { Card } from '@/components/Cards';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useMovieDetail, useSimilarMoviesInfinite } from '@/hooks/useTMDB';
import { getIdFromSlug } from '@/lib/utils';
import { notFound, useParams } from 'next/navigation';

export default function SimilarMoviesPage() {
	const params = useParams();
	const slug = params?.slug as string;
	const movieId = getIdFromSlug(slug);

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useSimilarMoviesInfinite(movieId);

	const { data: currMovie } = useMovieDetail(movieId);

	if (isLoading) {
		return (
			<div className="relative z-10 min-h-screen pt-28 pb-12">
				<div className="container">
					<div className="mb-10">
						<div className="h-10 bg-gray-800/50 animate-pulse rounded-lg w-96" />
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
						{Array.from({ length: 12 }).map((_, i) => (
							<div key={i} className="space-y-3">
								<div className="w-full aspect-[2/3] bg-gray-800/50 animate-pulse rounded-lg" />
								<div className="h-4 bg-gray-800/50 animate-pulse rounded w-3/4" />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap((page: any) => page.results ?? []);

	console.log(moviesData);

	return (
		<Section
			route="#"
			seeMore={false}
			className="relative"
			icon="ThumbsUp"
			title={`
					Similar movies to "${currMovie?.title}" - (${currMovie?.similar.total_results})`}
		>
			{moviesData.map((movie, i) => (
				<Card item={movie} key={`movie-${i}`} />
			))}

			<LoadMore
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		</Section>
	);
}
