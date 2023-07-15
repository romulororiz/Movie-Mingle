'use client';

import { Card } from '@/components/Cards';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useTopRatedInfinite } from '@/hooks/useTMDB';
import { notFound } from 'next/navigation';

export default function TopRatedMoviesPage() {
	const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
		useTopRatedInfinite();

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap(page => page.results);

	return (
		<Section route='#' title='All Time Best' seeMore={false} icon='Star'>
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
