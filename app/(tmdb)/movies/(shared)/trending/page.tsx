'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useNowPlayingInfinite } from '@/hooks/useTMDB';
import { notFound } from 'next/navigation';

export default function NowPlayingMoviesPage() {
	const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
		useNowPlayingInfinite();

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap(page => page.results);

	return (
		<Section
			route='#'
			title='Hottest Movies Right Now'
			seeMore={false}
			icon='Flame'
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
