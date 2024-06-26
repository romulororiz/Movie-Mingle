'use client';

import { Card } from '@/components/Cards';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { usePopularMoviesInfinite } from '@/hooks/useTMDB';
import { notFound, useSearchParams } from 'next/navigation';

export default function PopularMoviesPage() {
	const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
		usePopularMoviesInfinite();

	const searchParams = useSearchParams();

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap(page => page.results!);

	return (
		// <div className='flex container'>
		// <div className='flex px-24 z-[200]'>FILTER</div>
		<Section
			route='#'
			title='Popular Movies Right Now'
			seeMore={false}
			icon='ThumbsUp'
			className='flex-1 mb-24'
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
		// </div>
	);
}
