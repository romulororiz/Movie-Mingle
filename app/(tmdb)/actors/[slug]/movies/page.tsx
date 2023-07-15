'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useActorDetail, useMovieCreditsInfinite } from '@/hooks/useTMDB';
import { getIdFromSlug } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		slug: string;
	};
}

export default function ActorMoviesPage({ params }: PageProps) {
	const { slug } = params;

	const actorId = getIdFromSlug(slug);

	const { data, isLoading, isFetching, hasNextPage, fetchNextPage } =
		useMovieCreditsInfinite(actorId);

	const { data: currActor } = useActorDetail(actorId);

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap(page => page.cast);

	return (
		<Section
			route='#'
			title={`${currActor?.name}'s Filmography (${currActor?.movie_credits?.cast?.length})`}
			seeMore={false}
		>
			{moviesData.map((movie, i) => (
				<Card key={`movie-${i}`} item={movie} />
			))}

			<LoadMore
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetching}
				hasNextPage={hasNextPage}
			/>
		</Section>
	);
}
