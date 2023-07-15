'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useUpcomingInfinite } from '@/hooks/useTMDB';
import { notFound } from 'next/navigation';

export default function ComingUpMoviesPage() {
	const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
		useUpcomingInfinite();

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap(page => page.results);

	return (
		<Section
			route='#'
			title='Coming up next'
			seeMore={false}
			icon='Clapperboard'
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
