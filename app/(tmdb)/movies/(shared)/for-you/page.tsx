'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Icon } from '@/components/Icon';
import { Section } from '@/components/Layout';
import { usePopularActorsInfinite } from '@/hooks/useTMDB';
import { cn } from '@/lib/utils';
import { isMobile } from '@/utils/breakpoints';
import { notFound } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

export default function ForYouPage() {
	const { data, isFetchingNextPage, fetchNextPage, isLoading } =
		usePopularActorsInfinite();

	const windowSize = useWindowSize();

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	const actors = data?.pages?.flatMap(page => page.results!);

	return (
		<Section
			route='#'
			title='Popular Actors Right Now'
			seeMore={false}
			icon='ThumbsUp'
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

			<div
				className='w-fit rounded-full bg-accent-primary absolute -bottom-14 inset-x-0 mx-auto cursor-pointer hover:scale-105 duration-300 p-1'
				onClick={() => fetchNextPage()}
			>
				<Icon
					name={isFetchingNextPage ? 'Loader2' : 'ChevronDown'}
					color='#030e13'
					className={cn('transition', isFetchingNextPage ? 'animate-spin' : '')}
					size={isMobile(windowSize) ? 20 : 25}
				/>
			</div>
		</Section>
	);
}
