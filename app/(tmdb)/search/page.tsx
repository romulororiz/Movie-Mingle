'use client';

import { Card, SearchCard } from '@/components/Cards';
import { Section } from '@/components/Layout';
import LoadMore from '@/components/ui/LoadMore';
import { useSearchInfinite } from '@/hooks/useTMDB';
import { notFound, useSearchParams } from 'next/navigation';

const SearchPage = () => {
	const searchParams = useSearchParams();

	const query = searchParams.get('q');

	const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
		useSearchInfinite(query || '');

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const searchData = data?.pages?.flatMap(page => page.results);

	return (
		<Section
			route='#'
			title={`Search results for "${query}" - (${data?.pages?.map(
				page => page.total_results
			)})`}
			seeMore={false}
			icon='Search'
		>
			{searchData.map((item, i) => (
				<SearchCard item={item} key={`item-${i}`} />
			))}

			<LoadMore
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		</Section>
	);
};

export default SearchPage;
