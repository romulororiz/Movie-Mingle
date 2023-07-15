'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useMovieDetail, useRecommendedMoviesInfinite } from '@/hooks/useTMDB';
import { getIdFromSlug } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		slug: string;
	};
}

export default function RecommendedMoviesPage({ params }: PageProps) {
	const { slug } = params;

	const movieId = getIdFromSlug(slug);

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useRecommendedMoviesInfinite(movieId);

	const { data: currMovie } = useMovieDetail(movieId);

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap(page => page.results);

	return (
		<Section
			route='#'
			title={`You might also like - (${currMovie?.recommendations?.total_results})`}
			seeMore={false}
			className='relative'
			icon='ThumbsUp'
		>
			{moviesData.map((movie, i) => (
				<Card key={`movie-${i}`} item={movie} />
			))}

			<LoadMore
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		</Section>
	);
}
