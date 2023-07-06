'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import { useActorDetail } from '@/hooks/useTMDB';
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

	const { data, isLoading } = useActorDetail(actorId);

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	return (
		<Section
			route={`/actors/${encodeURIComponent(slug)}/movies`}
			title={`${data.name}'s Filmography (${data.movie_credits.cast.length})`}
			spotlight={false}
			seeMore={false}
		>
			{!isLoading ? (
				data.movie_credits.cast.map(movie => (
					<Card key={`movie-${movie.id}`} item={movie} />
				))
			) : (
				<RenderSkeletonCards
					isActor={false}
					isMovie={true}
					isCardSlider={false}
				/>
			)}
		</Section>
	);
}
