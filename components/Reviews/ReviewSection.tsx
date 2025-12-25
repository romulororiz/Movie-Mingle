'use client';

import { useState, useEffect } from 'react';
import { ReviewForm } from './ReviewForm';
import { ReviewCard } from './ReviewCard';
import { Heading } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { MessageSquare, Star, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ReviewWithUser, DbReview } from '@/lib/supabase/db';

interface ReviewSectionProps {
	movieId: string;
	movieTitle: string;
	moviePoster: string | null;
}

export function ReviewSection({ movieId, movieTitle, moviePoster }: ReviewSectionProps) {
	const { user } = useSupabaseUser();
	const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
	const [userReview, setUserReview] = useState<DbReview | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');

	const fetchReviews = async () => {
		try {
			setIsLoading(true);
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

	const fetchUserReview = async () => {
		if (!user) return;
		try {
			const response = await fetch(`/api/reviews?movieId=${movieId}&userId=${user.id}`);
			if (response.ok) {
				const data = (await response.json()) as DbReview | null;
				setUserReview(data);
			}
		} catch (error) {
			console.error('Error fetching user review:', error);
		}
	};

	useEffect(() => {
		fetchReviews();
	}, [movieId]);

	useEffect(() => {
		fetchUserReview();
	}, [movieId, user]);

	const handleReviewSubmit = () => {
		fetchReviews();
		fetchUserReview();
		setIsEditing(false);
	};

	const handleDeleteReview = () => {
		fetchReviews();
		setUserReview(null);
	};

	// Calculate stats
	const averageRating =
		reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

	// Sort reviews
	const sortedReviews = [...reviews].sort((a, b) => {
		if (sortBy === 'rating') {
			return b.rating - a.rating;
		}
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});

	// Filter out user's own review from the list (it's shown separately in the form area)
	const otherReviews = user ? sortedReviews.filter((r) => r.user_id !== user.id) : sortedReviews;

	return (
		<section className="mt-16">
			{/* Header */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
				<div>
					<Heading
						element="h2"
						title="Reviews & Ratings"
						className="text-2xl md:text-3xl font-bold mb-2"
					/>
					<p className="text-gray-400">
						{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'} from the community
					</p>
				</div>

				{/* Stats */}
				{reviews.length > 0 && (
					<div className="flex items-center gap-6">
						<div className="flex items-center gap-2">
							<div className="flex items-center gap-1">
								<Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
								<span className="text-2xl font-bold text-white">{averageRating.toFixed(1)}</span>
							</div>
							<span className="text-sm text-gray-400">avg rating</span>
						</div>
					</div>
				)}
			</div>

			{/* Review Form / User's Review */}
			<div className="mb-8">
				{user && userReview && !isEditing ? (
					// Show user's existing review
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-gray-400">Your Review</p>
							<Button
								variant="outline"
								size="sm"
								onClick={() => setIsEditing(true)}
								className="gap-2"
							>
								Edit Review
							</Button>
						</div>
						<ReviewCard
							review={{
								...userReview,
								user: {
									id: user.id,
									name: user.user_metadata?.full_name || user.email || 'You',
									image: user.user_metadata?.picture || user.user_metadata?.avatar_url || null,
								},
							}}
							currentUserId={user.id}
							onEdit={() => setIsEditing(true)}
							onDelete={handleDeleteReview}
						/>
					</div>
				) : (
					// Show review form
					<ReviewForm
						user={user}
						movieId={movieId}
						movieTitle={movieTitle}
						moviePoster={moviePoster}
						existingReview={
							isEditing && userReview
								? {
										rating: userReview.rating,
										content: userReview.content,
								  }
								: null
						}
						onReviewSubmit={handleReviewSubmit}
						onCancel={isEditing ? () => setIsEditing(false) : undefined}
					/>
				)}
			</div>

			{/* Sort Controls */}
			{otherReviews.length > 0 && (
				<div className="flex items-center gap-2 mb-6">
					<span className="text-sm text-gray-400">Sort by:</span>
					<button
						onClick={() => setSortBy('recent')}
						className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
							sortBy === 'recent'
								? 'bg-accent-primary/20 text-accent-primary'
								: 'text-gray-400 hover:text-gray-200'
						}`}
					>
						Most Recent
					</button>
					<button
						onClick={() => setSortBy('rating')}
						className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
							sortBy === 'rating'
								? 'bg-accent-primary/20 text-accent-primary'
								: 'text-gray-400 hover:text-gray-200'
						}`}
					>
						Highest Rated
					</button>
				</div>
			)}

			{/* Reviews List */}
			{isLoading ? (
				<div className="space-y-4">
					{[1, 2, 3].map((i) => (
						<div key={i} className="bg-gray-800/20 rounded-xl p-5 animate-pulse">
							<div className="flex items-center gap-3 mb-4">
								<div className="w-10 h-10 rounded-full bg-gray-700" />
								<div className="space-y-2">
									<div className="w-32 h-4 bg-gray-700 rounded" />
									<div className="w-20 h-3 bg-gray-700 rounded" />
								</div>
							</div>
							<div className="space-y-2">
								<div className="w-full h-4 bg-gray-700 rounded" />
								<div className="w-3/4 h-4 bg-gray-700 rounded" />
							</div>
						</div>
					))}
				</div>
			) : otherReviews.length === 0 ? (
				<div className="text-center py-12 bg-gray-800/20 rounded-2xl border border-gray-700/30">
					<MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
					<p className="text-gray-400 mb-2">No reviews yet</p>
					<p className="text-sm text-gray-500">Be the first to share your thoughts!</p>
				</div>
			) : (
				<AnimatePresence mode="popLayout">
					<div className="space-y-4">
						{otherReviews.map((review) => (
							<ReviewCard
								key={review.id}
								review={review}
								currentUserId={user?.id}
								onDelete={handleDeleteReview}
							/>
						))}
					</div>
				</AnimatePresence>
			)}
		</section>
	);
}
