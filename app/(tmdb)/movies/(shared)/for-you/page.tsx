'use client';

import { Card } from '@/components/Cards';
import { Heading } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { BrowsePageSkeleton, CardGridSkeleton } from '@/components/ui/PageSkeleton';
import LoadMore from '@/components/ui/LoadMore';
import { usePopularMoviesInfinite } from '@/hooks/useTMDB';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Wand2, LogIn } from 'lucide-react';

export default function ForYouPage() {
	const { user, loading: userLoading } = useSupabaseUser();
	const { data, isFetchingNextPage, fetchNextPage, isLoading, hasNextPage } =
		usePopularMoviesInfinite();

	if (isLoading || userLoading) {
		return <BrowsePageSkeleton />;
	}

	if (!data) return notFound();

	const moviesData = data?.pages?.flatMap((page: any) => page.results ?? []) ?? [];

	return (
		<div className="container py-8">
			{/* Header */}
			<div className="mb-8">
				<div className="flex items-center gap-3 mb-2">
					<div className="p-2 rounded-lg bg-gradient-to-r from-accent-primary/20 to-purple-500/20">
						<Wand2 className="w-6 h-6 text-accent-primary" />
					</div>
					<Heading
						element="h1"
						title="For You"
						className="text-3xl md:text-4xl font-bold"
					/>
				</div>
				<p className="text-gray-400">
					{user
						? 'Personalized recommendations based on your taste'
						: 'Sign in to get personalized movie recommendations'}
				</p>
			</div>

			{/* Sign in prompt if not logged in */}
			{!user && (
				<div className="mb-8 p-6 bg-gray-800/30 border border-gray-700/50 rounded-2xl">
					<div className="flex flex-col md:flex-row items-center gap-4">
						<div className="flex-1">
							<h3 className="font-semibold text-gray-200 mb-1">
								Get Better Recommendations
							</h3>
							<p className="text-sm text-gray-400">
								Sign in to receive personalized movie suggestions based on your watchlist
								and reviews.
							</p>
						</div>
						<Link href="/sign-in">
							<Button variant="default" className="gap-2">
								<LogIn className="w-4 h-4" />
								Sign In
							</Button>
						</Link>
					</div>
				</div>
			)}

			{/* Movies Grid */}
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
				{moviesData.map((movie, i) => (
					<Card item={movie} key={`movie-${i}`} />
				))}
			</div>

			{/* Load More */}
			{isFetchingNextPage && (
				<div className="mt-8">
					<CardGridSkeleton count={6} />
				</div>
			)}

			<LoadMore
				fetchNextPage={fetchNextPage}
				isFetchingNextPage={isFetchingNextPage}
				hasNextPage={hasNextPage}
			/>
		</div>
	);
}
