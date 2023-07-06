'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Icon } from '@/components/Icon';
import { Section } from '@/components/Layout';
import { useMovieDetail } from '@/hooks/useTMDB';
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

	const { data, isLoading } = useMovieDetail(movieId);

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	return (
		<Section
			route={`/movies/${encodeURIComponent(slug)}/recommended`}
			title={`Because you saw  '${data.title}' (${data.similar.results.length})`}
			spotlight={false}
			seeMore={false}
			className='relative'
		>
			{!isLoading ? (
				data.similar.results.map(movie => (
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
