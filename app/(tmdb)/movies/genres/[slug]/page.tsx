'use client';

import { getIdFromSlug } from '@/lib/utils';
import { useMoviesByGenre } from '@/hooks/useTMDB';
import { notFound } from 'next/navigation';
import { Section } from '@/components/Layout';
import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';

interface PageProps {
	params: {
		slug: string;
	};
}

export default function GenrePage({ params }: PageProps) {
	const { slug } = params;

	const genreId = getIdFromSlug(slug);

	const { data, isLoading, hasNextPage, isFetching, fetchNextPage } =
		useMoviesByGenre(genreId);

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	return (
		<Section
			route='#'
			title={`
			${data.pages[0].total_results} movies found for "${slug.split('-')[0]}"
		`}
			seeMore={false}
			className='relative'
		>
			{data?.pages.map(movie =>
				movie?.results?.map(movie => (
					<Card key={`movie-${movie.id}`} item={movie} />
				))
			)}

			{hasNextPage && (
				<button
					onClick={() => {
						fetchNextPage();
					}}
					disabled={!hasNextPage || isFetching}
				>
					{isFetching ? 'Loading more...' : 'Load More'}
				</button>
			)}
		</Section>
	);
}
