'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, MessageSquare, Send, ChevronDown } from 'lucide-react';
import { UserAvatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { StarRating } from './index';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';
import Link from 'next/link';
import type { User } from '@supabase/supabase-js';
import type { ReviewWithUser, DbReview } from '@/lib/supabase/db';

interface ReviewDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	movieId: string;
	movieTitle: string;
	moviePoster: string | null;
	user: User | null;
}

export function ReviewDrawer({
	isOpen,
	onClose,
	movieId,
	movieTitle,
	moviePoster,
	user,
}: ReviewDrawerProps) {
	const [reviews, setReviews] = useState<ReviewWithUser[]>([]);
	const [userReview, setUserReview] = useState<DbReview | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');
	const [showWriteReview, setShowWriteReview] = useState(false);
	const drawerRef = useRef<HTMLDivElement>(null);

	// Form state
	const [rating, setRating] = useState(0);
	const [content, setContent] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

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
				if (data) {
					setRating(data.rating);
					setContent(data.content);
				}
			}
		} catch (error) {
			console.error('Error fetching user review:', error);
		}
	};

	useEffect(() => {
		if (isOpen) {
			fetchReviews();
			fetchUserReview();
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen, movieId]);

	// Handle ESC key
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		window.addEventListener('keydown', handleEsc);
		return () => window.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	const handleSubmitReview = async () => {
		if (!user) {
			toast.error('Please sign in to write a review');
			return;
		}

		if (rating === 0 || content.length < 10) {
			toast.error('Please add a rating and write at least 10 characters');
			return;
		}

		setIsSubmitting(true);
		try {
			const response = await fetch('/api/reviews', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					movieId,
					movieTitle,
					moviePoster,
					rating,
					content,
				}),
			});

			if (!response.ok) {
				const errorData = (await response.json()) as { error?: string };
				throw new Error(errorData.error || 'Failed to submit review');
			}

			toast.success(userReview ? 'Review updated!' : 'Review posted!');
			fetchReviews();
			fetchUserReview();
			setShowWriteReview(false);
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to submit review';
			toast.error(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDeleteReview = async (reviewId: string) => {
		if (!confirm('Delete this review?')) return;

		try {
			const response = await fetch(`/api/reviews/${reviewId}`, { method: 'DELETE' });
			if (!response.ok) throw new Error('Failed to delete');

			toast.success('Review deleted');
			fetchReviews();
			setUserReview(null);
			setRating(0);
			setContent('');
		} catch {
			toast.error('Failed to delete review');
		}
	};

	// Sort reviews
	const sortedReviews = [...reviews].sort((a, b) => {
		if (sortBy === 'rating') return b.rating - a.rating;
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});

	// Calculate stats
	const averageRating =
		reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

	const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
		star,
		count: reviews.filter((r) => r.rating === star).length,
		percentage: reviews.length > 0 ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
	}));

	if (typeof window === 'undefined') return null;

	return createPortal(
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
						onClick={onClose}
					/>

					{/* Drawer */}
					<motion.div
						ref={drawerRef}
						initial={{ x: '100%' }}
						animate={{ x: 0 }}
						exit={{ x: '100%' }}
						transition={{ type: 'spring', damping: 30, stiffness: 300 }}
						className="fixed right-0 top-0 bottom-0 w-full max-w-xl bg-dark-background border-l border-gray-800 z-[100] flex flex-col shadow-2xl"
					>
						{/* Header */}
						<div className="flex-shrink-0 p-6 border-b border-gray-800">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-bold text-white">Reviews</h2>
								<button
									onClick={onClose}
									className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
								>
									<X className="w-5 h-5 text-gray-400" />
								</button>
							</div>

							{/* Movie Title */}
							<p className="text-gray-400 text-sm line-clamp-1">{movieTitle}</p>

							{/* Stats Row */}
							{reviews.length > 0 && (
								<div className="flex items-center gap-6 mt-4">
									<div className="flex items-center gap-2">
										<Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
										<span className="text-2xl font-bold text-white">
											{averageRating.toFixed(1)}
										</span>
									</div>
									<div className="text-sm text-gray-400">
										{reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
									</div>
								</div>
							)}
						</div>

						{/* Rating Distribution */}
						{reviews.length > 0 && (
							<div className="flex-shrink-0 p-6 border-b border-gray-800 bg-gray-900/30">
								<div className="space-y-2">
									{ratingDistribution.map(({ star, count, percentage }) => (
										<div key={star} className="flex items-center gap-3 text-sm">
											<span className="w-3 text-gray-400">{star}</span>
											<Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
											<div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
												<motion.div
													initial={{ width: 0 }}
													animate={{ width: `${percentage}%` }}
													transition={{ duration: 0.5, delay: 0.1 }}
													className="h-full bg-yellow-400 rounded-full"
												/>
											</div>
											<span className="w-8 text-right text-gray-500">{count}</span>
										</div>
									))}
								</div>
							</div>
						)}

						{/* Write Review Section */}
						<div className="flex-shrink-0 p-6 border-b border-gray-800">
							{!user ? (
								<div className="text-center py-4">
									<p className="text-gray-400 mb-3">Sign in to share your thoughts</p>
									<Link href="/sign-in">
										<Button variant="default" size="sm">
											Sign In
										</Button>
									</Link>
								</div>
							) : showWriteReview || userReview ? (
								<div className="space-y-4">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<UserAvatar
												user={{
													name: user.user_metadata?.full_name || user.email || 'You',
													image: user.user_metadata?.picture || user.user_metadata?.avatar_url || null,
												}}
												className="w-8 h-8"
											/>
											<span className="text-sm font-medium text-gray-200">
												{userReview ? 'Your Review' : 'Write a Review'}
											</span>
										</div>
										{!showWriteReview && userReview && (
											<div className="flex gap-2">
												<button
													onClick={() => setShowWriteReview(true)}
													className="text-xs text-accent-primary hover:underline"
												>
													Edit
												</button>
												<button
													onClick={() => handleDeleteReview(userReview.id)}
													className="text-xs text-red-400 hover:underline"
												>
													Delete
												</button>
											</div>
										)}
									</div>

									{showWriteReview || !userReview ? (
										<>
											<div>
												<label className="text-xs text-gray-400 mb-2 block">Your Rating</label>
												<StarRating rating={rating} onRatingChange={setRating} size="md" showLabel />
											</div>
											<textarea
												value={content}
												onChange={(e) => setContent(e.target.value)}
												placeholder="Share your thoughts about this movie..."
												rows={3}
												className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-sm focus:border-accent-primary focus:outline-none resize-none"
											/>
											<div className="flex justify-end gap-2">
												{(showWriteReview || userReview) && (
													<Button
														variant="outline"
														size="sm"
														onClick={() => {
															setShowWriteReview(false);
															if (userReview) {
																setRating(userReview.rating);
																setContent(userReview.content);
															}
														}}
													>
														Cancel
													</Button>
												)}
												<Button
													variant="default"
													size="sm"
													onClick={handleSubmitReview}
													isLoading={isSubmitting}
													disabled={rating === 0 || content.length < 10}
													className="gap-2"
												>
													<Send className="w-3.5 h-3.5" />
													{userReview ? 'Update' : 'Post'}
												</Button>
											</div>
										</>
									) : (
										<div className="bg-gray-800/30 rounded-lg p-3">
											<StarRating rating={userReview.rating} readonly size="sm" />
											<p className="text-sm text-gray-300 mt-2">{userReview.content}</p>
											<p className="text-xs text-gray-500 mt-2">
												{formatDistanceToNow(new Date(userReview.created_at), { addSuffix: true })}
											</p>
										</div>
									)}
								</div>
							) : (
								<Button
									variant="outline"
									size="sm"
									onClick={() => setShowWriteReview(true)}
									className="w-full gap-2"
								>
									<MessageSquare className="w-4 h-4" />
									Write a Review
								</Button>
							)}
						</div>

						{/* Sort Controls */}
						{reviews.length > 1 && (
							<div className="flex-shrink-0 px-6 py-3 border-b border-gray-800 flex items-center gap-2">
								<span className="text-xs text-gray-500">Sort:</span>
								<button
									onClick={() => setSortBy('recent')}
									className={`px-2 py-1 text-xs rounded transition-colors ${
										sortBy === 'recent'
											? 'bg-accent-primary/20 text-accent-primary'
											: 'text-gray-400 hover:text-white'
									}`}
								>
									Recent
								</button>
								<button
									onClick={() => setSortBy('rating')}
									className={`px-2 py-1 text-xs rounded transition-colors ${
										sortBy === 'rating'
											? 'bg-accent-primary/20 text-accent-primary'
											: 'text-gray-400 hover:text-white'
									}`}
								>
									Top Rated
								</button>
							</div>
						)}

						{/* Reviews List */}
						<div className="flex-1 overflow-y-auto">
							{isLoading ? (
								<div className="p-6 space-y-4">
									{[1, 2, 3].map((i) => (
										<div key={i} className="animate-pulse">
											<div className="flex items-center gap-3 mb-3">
												<div className="w-8 h-8 rounded-full bg-gray-800" />
												<div className="w-24 h-4 bg-gray-800 rounded" />
											</div>
											<div className="w-full h-16 bg-gray-800 rounded" />
										</div>
									))}
								</div>
							) : sortedReviews.length === 0 ? (
								<div className="p-6 text-center">
									<MessageSquare className="w-12 h-12 text-gray-700 mx-auto mb-3" />
									<p className="text-gray-400">No reviews yet</p>
									<p className="text-sm text-gray-500">Be the first to share your thoughts!</p>
								</div>
							) : (
								<div className="p-6 space-y-6">
									{sortedReviews.map((review) => (
										<ReviewItem
											key={review.id}
											review={review}
											isOwn={user?.id === review.user_id}
											onDelete={() => handleDeleteReview(review.id)}
										/>
									))}
								</div>
							)}
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>,
		document.body
	);
}

// Individual review item in the drawer
function ReviewItem({
	review,
	isOwn,
	onDelete,
}: {
	review: ReviewWithUser;
	isOwn: boolean;
	onDelete: () => void;
}) {
	const [expanded, setExpanded] = useState(false);
	const isLong = review.content.length > 200;

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="group"
		>
			{/* Header */}
			<div className="flex items-start justify-between mb-2">
				<Link href={`/user/${review.user_id}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
					<UserAvatar
						user={{
							name: review.user?.name || 'User',
							image: review.user?.image || null,
						}}
						className="w-8 h-8"
					/>
					<div>
						<p className="text-sm font-medium text-gray-200">
							{review.user?.name || 'Anonymous'}
							{isOwn && <span className="ml-2 text-xs text-accent-primary">(You)</span>}
						</p>
						<p className="text-xs text-gray-500">
							{formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
						</p>
					</div>
				</Link>
				<StarRating rating={review.rating} readonly size="sm" />
			</div>

			{/* Content */}
			<div className="pl-11">
				<p className={`text-sm text-gray-300 leading-relaxed ${!expanded && isLong ? 'line-clamp-3' : ''}`}>
					{review.content}
				</p>
				{isLong && (
					<button
						onClick={() => setExpanded(!expanded)}
						className="text-xs text-accent-primary hover:underline mt-1 flex items-center gap-1"
					>
						{expanded ? 'Show less' : 'Read more'}
						<ChevronDown className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`} />
					</button>
				)}
			</div>
		</motion.div>
	);
}

