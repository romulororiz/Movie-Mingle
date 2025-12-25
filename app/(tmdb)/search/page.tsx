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

	if (isLoading) {
		return (
			<div className="relative z-10 min-h-screen pt-28 pb-12">
				<div className="container">
					<div className="mb-10">
						<div className="h-12 bg-gray-800/50 animate-pulse rounded-lg w-96 mb-4" />
						<div className="h-6 bg-gray-800/50 animate-pulse rounded w-64" />
					</div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
						{Array.from({ length: 12 }).map((_, i) => (
							<div key={i} className="space-y-3">
								<div className="w-full aspect-[2/3] bg-gray-800/50 animate-pulse rounded-lg" />
								<div className="h-4 bg-gray-800/50 animate-pulse rounded w-3/4" />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}

	if (!data) return notFound();

	const searchData = (data as any)?.pages?.flatMap((page: any) => page.results ?? []);

	return (
		<Section
			route='#'
			title={`Search results for "${query}" - (${((data as any)?.pages?.[0] as any)?.total_results || 0})`}
			seeMore={false}
			icon='Search'
		>
			{searchData?.map((item: any, i: number) => (
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
