'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useTopRatedInfinite, useUpcomingInfinite } from '@/hooks/useTMDB';
import { notFound } from 'next/navigation';

export default function TopRatedMoviesPage() {
	const { data, isFetchingNextPage, fetchNextPage, isLoading } =
		useTopRatedInfinite();

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap(page => page.results!);

	return (
		<Section route='#' title='All Time Best' seeMore={false} icon='Star'>
			{!isLoading ? (
				moviesData.map((movie, i) => <Card item={movie} key={`movie-${i}`} />)
			) : (
				<RenderSkeletonCards
					isActor={false}
					isMovie={true}
					isCardSlider={false}
				/>
			)}

			<LoadMore
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
			/>
		</Section>
	);
}
