'use client';

import { Card } from '@/components/Cards';
import { Icon } from '@/components/Icon';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useMoviesByGenre } from '@/hooks/useTMDB';
import { cn, getIdFromSlug } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		slug: string;
	};
}

export default function MoviesByGenrePage({ params }: PageProps) {
	const { slug } = params;

	const genreId = getIdFromSlug(slug);

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useMoviesByGenre(genreId);

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const totalResults = data?.pages?.[0]?.total_results ?? 0;
	const moviesData = data?.pages?.flatMap(page => page.results) ?? [];

	return (
		<Section
			route='#'
			title={`${totalResults} movies found for "${slug.split('-')[0] ?? ''}"`}
			seeMore={false}
			className='relative'
		>
			{moviesData.map(movie => (
				<Card key={`movie-${movie.id}`} item={movie} />
			))}

			<LoadMore
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		</Section>
	);
}
