'use client';

import { Card } from '@/components/Cards';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useMovieDetail, useSimilarMoviesInfinite } from '@/hooks/useTMDB';
import { getIdFromSlug } from '@/lib/utils';
import { notFound } from 'next/navigation';

interface PageProps {
	params: {
		slug: string;
	};
}

export default function SimilarMoviesPage({ params }: PageProps) {
	const { slug } = params;

	const movieId = getIdFromSlug(slug);

	const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useSimilarMoviesInfinite(movieId);

	const { data: currMovie } = useMovieDetail(movieId);

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap(page => page.results);

	return (
		<Section
			route='#'
			seeMore={false}
			className='relative'
			icon='ThumbsUp'
			title={`
					Similar movies to "${currMovie?.title}" - (${currMovie?.similar.total_results})`}
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
