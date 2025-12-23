'use client';

import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';

export default function Loading() {
	return (
		<div className="min-h-screen">
			{/* Hero skeleton */}
			<div className="absolute top-0 left-0 right-0 w-full h-[400px] md:h-[600px] bg-gradient-to-b from-zinc-900/50 to-dark-background animate-pulse" />

			{/* Content skeletons */}
			<div className="relative z-10">
				<Section
					icon="Flame"
					title="Hottest Right Now"
					className="mt-[7rem] md:-mt-[22rem] z-50 text-center"
					container={false}
					route="/movies/trending"
					seeMore={false}
				>
					<RenderSkeletonCards isMovie={true} isCardSlider={true} />
				</Section>

				<Section
					icon="Users"
					className="mt-14 md:mt-24"
					title="Trending Actors"
					route="/actors/popular"
					isActor={true}
				>
					<RenderSkeletonCards isMovie={false} isActor={true} />
				</Section>

				<Section
					icon="ThumbsUp"
					className="mt-16 md:mt-40"
					title="Popular"
					route="/movies/popular"
				>
					<RenderSkeletonCards />
				</Section>

				<Section
					icon="Clapperboard"
					className="mt-16 md:mt-40"
					title="Coming up next"
					route="/movies/coming-up"
				>
					<RenderSkeletonCards isMovie={true} />
				</Section>

				<Section
					icon="Star"
					className="mt-16 md:mt-40 mb-16"
					title="All Time Best"
					route="/movies/top-rated"
				>
					<RenderSkeletonCards isMovie={true} />
				</Section>
			</div>
		</div>
	);
}

