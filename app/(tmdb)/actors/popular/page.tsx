'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Icon } from '@/components/Icon';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { usePopularActorsInfinite } from '@/hooks/useTMDB';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';

export default function ActorsPage() {
	const { data, isFetchingNextPage, fetchNextPage, isLoading } =
		usePopularActorsInfinite();

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const actors = data?.pages?.flatMap(page => page.results!);

	return (
		<Section
			route='#'
			title='Popular Actors Right Now'
			seeMore={false}
			icon='Users'
		>
			{!isLoading ? (
				actors.map((actor, i) => <Card item={actor} key={`actor-${i}`} />)
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
