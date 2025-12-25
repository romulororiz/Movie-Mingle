'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ChevronRight, Users } from 'lucide-react';
import { ReviewDrawer } from './ReviewDrawer';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import type { ReviewWithUser } from '@/lib/supabase/db';

interface ReviewSummaryProps {
	movieId: string;
	movieTitle: string;
	moviePoster: string | null;
}

export function ReviewSummary({ movieId, movieTitle, moviePoster }: ReviewSummaryProps) {
	const { user } = useSupabaseUser();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchReviews = async () => {
			try {
				const response = await fetch(`/api/reviews?movieId=${movieId}`);
				if (response.ok) {
					const data = (await response.json()) as ReviewWithUser[];
					setReviews(data);
				}
			} catch (error) {
				console.error('Error fetching reviews:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchReviews();
	}, [movieId]);

	const averageRating =
		reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

	// Get rating breakdown for mini chart
	const ratingCounts = [5, 4, 3, 2, 1].map(
		(star) => reviews.filter((r) => r.rating === star).length
	);
	const maxCount = Math.max(...ratingCounts, 1);

	return (
		<>
			<motion.button
				onClick={() => setIsDrawerOpen(true)}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="w-full bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-5 hover:border-accent-primary/30 transition-all duration-300 text-left group"
			>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<MessageSquare className="w-5 h-5 text-accent-primary" />
						<span className="font-semibold text-gray-200">Community Reviews</span>
					</div>
					<ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-accent-primary group-hover:translate-x-1 transition-all" />
				</div>

				{isLoading ? (
					<div className="flex items-center gap-4">
						<div className="w-16 h-16 bg-gray-800 rounded-xl animate-pulse" />
						<div className="flex-1 space-y-2">
							<div className="w-24 h-5 bg-gray-800 rounded animate-pulse" />
							<div className="w-16 h-4 bg-gray-800 rounded animate-pulse" />
						</div>
					</div>
				) : reviews.length === 0 ? (
					<div className="flex items-center gap-4">
						<div className="w-14 h-14 rounded-xl bg-gray-800/50 flex items-center justify-center">
							<Star className="w-7 h-7 text-gray-600" />
						</div>
						<div>
							<p className="text-gray-400 text-sm">No reviews yet</p>
							<p className="text-accent-primary text-sm font-medium group-hover:underline">
								Be the first to review →
							</p>
						</div>
					</div>
				) : (
					<div className="flex items-center gap-5">
						{/* Big Rating */}
						<div className="text-center">
							<div className="flex items-center gap-1 mb-1">
								<Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
								<span className="text-3xl font-bold text-white">{averageRating.toFixed(1)}</span>
							</div>
							<p className="text-xs text-gray-500">{reviews.length} reviews</p>
						</div>

						{/* Mini Rating Chart */}
						<div className="flex-1 flex items-end gap-1 h-10">
							{ratingCounts.map((count, index) => (
								<div
									key={5 - index}
									className="flex-1 bg-gray-700/50 rounded-t relative overflow-hidden"
									style={{ height: '100%' }}
								>
									<motion.div
										initial={{ height: 0 }}
										animate={{ height: `${(count / maxCount) * 100}%` }}
										transition={{ duration: 0.5, delay: index * 0.05 }}
										className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-t"
									/>
								</div>
							))}
						</div>

						{/* Recent Reviewers */}
						<div className="flex items-center">
							<div className="flex -space-x-2">
								{reviews.slice(0, 3).map((review, i) => (
									<div
										key={review.id}
										className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-700 overflow-hidden"
										style={{ zIndex: 3 - i }}
									>
										{review.user?.image ? (
											<img src={review.user.image} alt="" className="w-full h-full object-cover" />
										) : (
											<div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
												{review.user?.name?.[0] || '?'}
											</div>
										)}
									</div>
								))}
							</div>
							{reviews.length > 3 && (
								<span className="ml-2 text-xs text-gray-500">+{reviews.length - 3}</span>
							)}
						</div>
					</div>
				)}
			</motion.button>

			{/* Review Drawer */}
			<ReviewDrawer
				isOpen={isDrawerOpen}
				onClose={() => setIsDrawerOpen(false)}
				movieId={movieId}
				movieTitle={movieTitle}
				moviePoster={moviePoster}
				user={user}
			/>
		</>
	);
}
