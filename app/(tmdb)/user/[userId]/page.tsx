'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { UserAvatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui';
import { StarRating } from '@/components/Reviews';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { formatDistanceToNow, format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import {
	UserPlus,
	UserCheck,
	Clock,
	Star,
	Bookmark,
	Film,
	Calendar,
	ArrowLeft,
	MessageSquare,
	XCircle,
} from 'lucide-react';
import type { PublicUser, DbReview, FriendRequestStatus } from '@/lib/supabase/db';
import { getAbsoluteUrl } from '@/lib/utils';

interface ProfileData {
	user: PublicUser;
	reviews: DbReview[];
	friendshipStatus: {
		status: FriendRequestStatus | 'none';
		request?: { id: string };
		isRequester: boolean;
	} | null;
	isOwnProfile: boolean;
}

export default function PublicUserProfilePage() {
	const params = useParams();
	const router = useRouter();
	const { user: currentUser } = useSupabaseUser();
	const userId = params.userId as string;

	const [profileData, setProfileData] = useState<ProfileData | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isActionLoading, setIsActionLoading] = useState(false);

	const fetchProfile = async () => {
		try {
			setIsLoading(true);
			const response = await fetch(`/api/users/${userId}`);
			if (!response.ok) {
				if (response.status === 404) {
					router.push('/');
					return;
				}
				throw new Error('Failed to fetch profile');
			}
			const data = await response.json() as ProfileData;
			setProfileData(data);
		} catch (error) {
			console.error('Error fetching profile:', error);
			toast.error('Failed to load profile');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProfile();
	}, [userId]);

	const handleFriendAction = async () => {
		if (!currentUser) {
			router.push('/sign-in');
			return;
		}

		setIsActionLoading(true);
		try {
			const status = profileData?.friendshipStatus;

			if (status?.status === 'none') {
				// Send friend request
				const response = await fetch('/api/friends', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ addresseeId: userId }),
				});

				if (!response.ok) {
					const errorData = await response.json() as { error?: string };
					throw new Error(errorData.error);
				}

				toast.success('Friend request sent!');
			} else if (status?.status === 'pending' && !status.isRequester && status.request) {
				// Accept incoming request
				const response = await fetch(`/api/friends/${status.request.id}`, {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ status: 'accepted' }),
				});

				if (!response.ok) throw new Error('Failed to accept request');

				toast.success('Friend request accepted!');
			}

			fetchProfile();
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Action failed';
			toast.error(message);
		} finally {
			setIsActionLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className="min-h-screen">
				<div className="container py-12">
					<div className="max-w-4xl mx-auto">
						{/* Loading skeleton */}
						<div className="animate-pulse">
							<div className="flex items-center gap-6 mb-8">
								<div className="w-24 h-24 rounded-full bg-gray-800" />
								<div className="space-y-3">
									<div className="w-48 h-8 bg-gray-800 rounded" />
									<div className="w-32 h-4 bg-gray-800 rounded" />
								</div>
							</div>
							<div className="grid grid-cols-3 gap-4 mb-8">
								{[1, 2, 3].map((i) => (
									<div key={i} className="h-20 bg-gray-800 rounded-xl" />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!profileData) return null;

	const { user, reviews, friendshipStatus, isOwnProfile } = profileData;

	const renderFriendButton = () => {
		if (isOwnProfile) return null;

		const status = friendshipStatus?.status;

		if (status === 'accepted') {
			return (
				<Button variant="outline" disabled className="gap-2">
					<UserCheck className="w-4 h-4" />
					Friends
				</Button>
			);
		}

		if (status === 'pending') {
			if (friendshipStatus?.isRequester) {
				return (
					<Button variant="outline" disabled className="gap-2">
						<Clock className="w-4 h-4" />
						Request Pending
					</Button>
				);
			}
			return (
				<Button
					variant="default"
					onClick={handleFriendAction}
					isLoading={isActionLoading}
					className="gap-2"
				>
					<UserPlus className="w-4 h-4" />
					Accept Request
				</Button>
			);
		}

		return (
			<Button
				variant="default"
				onClick={handleFriendAction}
				isLoading={isActionLoading}
				className="gap-2"
			>
				<UserPlus className="w-4 h-4" />
				Add Friend
			</Button>
		);
	};

	return (
		<div className="min-h-screen">
			<div className="container py-12">
				<div className="max-w-4xl mx-auto">
					{/* Back button */}
					<button
						onClick={() => router.back()}
						className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
					>
						<ArrowLeft className="w-4 h-4" />
						Back
					</button>

					{/* Profile Header */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8 mb-8"
					>
						<div className="flex flex-col md:flex-row items-center md:items-start gap-6">
							<UserAvatar
								user={{
									name: user.name || 'User',
									image: user.image,
								}}
								className="w-24 h-24 md:w-32 md:h-32 border-4 border-accent-primary/30"
							/>
							<div className="flex-1 text-center md:text-left">
								<Heading
									element="h1"
									title={user.name || 'Anonymous User'}
									className="text-2xl md:text-3xl font-bold mb-2"
								/>
								<p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-4">
									<Calendar className="w-4 h-4" />
									Member since {format(new Date(user.created_at), 'MMMM yyyy')}
								</p>
								{renderFriendButton()}
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
							<div className="bg-gray-900/50 rounded-xl p-4 text-center">
								<div className="flex items-center justify-center gap-2 text-accent-primary mb-1">
									<MessageSquare className="w-5 h-5" />
									<span className="text-2xl font-bold">{user.review_count}</span>
								</div>
								<p className="text-sm text-gray-400">Reviews</p>
							</div>
							<div className="bg-gray-900/50 rounded-xl p-4 text-center">
								<div className="flex items-center justify-center gap-2 text-accent-secondary mb-1">
									<Bookmark className="w-5 h-5" />
									<span className="text-2xl font-bold">{user.bookmark_count}</span>
								</div>
								<p className="text-sm text-gray-400">Watchlist</p>
							</div>
							<div className="bg-gray-900/50 rounded-xl p-4 text-center col-span-2 md:col-span-1">
								<div className="flex items-center justify-center gap-2 text-yellow-400 mb-1">
									<Star className="w-5 h-5" />
									<span className="text-2xl font-bold">
										{reviews.length > 0
											? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
											: '—'}
									</span>
								</div>
								<p className="text-sm text-gray-400">Avg Rating</p>
							</div>
						</div>
					</motion.div>

					{/* Reviews */}
					<section>
						<div className="flex items-center justify-between mb-6">
							<Heading
								element="h2"
								title="Recent Reviews"
								className="text-xl font-bold"
							/>
						</div>

						{reviews.length === 0 ? (
							<div className="text-center py-12 bg-gray-800/20 rounded-2xl border border-gray-700/30">
								<MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
								<p className="text-gray-400">No reviews yet</p>
							</div>
						) : (
							<AnimatePresence mode="popLayout">
								<div className="space-y-4">
									{reviews.map((review, index) => (
										<motion.div
											key={review.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.05 }}
										>
											<ReviewMovieCard review={review} />
										</motion.div>
									))}
								</div>
							</AnimatePresence>
						)}
					</section>
				</div>
			</div>
		</div>
	);
}

// Component to show a review with movie info
function ReviewMovieCard({ review }: { review: DbReview }) {
	const movieSlug = `${review.movie_title.replace(/[^a-zA-Z0-9]/g, '-')}-${review.movie_id}`;

	return (
		<Link
			href={`/movies/${movieSlug}`}
			className="block bg-gray-800/20 border border-gray-700/30 rounded-xl p-5 hover:border-gray-600/50 hover:bg-gray-800/30 transition-all duration-200"
		>
			<div className="flex gap-4">
				{/* Movie Poster */}
				{review.movie_poster && (
					<div className="flex-shrink-0">
						<Image
							src={getAbsoluteUrl('https://image.tmdb.org/t/p/w92', review.movie_poster)}
							alt={review.movie_title}
							width={60}
							height={90}
							className="rounded-lg"
						/>
					</div>
				)}

				{/* Content */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-4 mb-2">
						<div>
							<h3 className="font-semibold text-gray-200 hover:text-accent-primary transition-colors">
								{review.movie_title}
							</h3>
							<p className="text-sm text-gray-500">
								{formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
							</p>
						</div>
						<StarRating rating={review.rating} readonly size="sm" />
					</div>
					<p className="text-gray-400 text-sm line-clamp-2">{review.content}</p>
				</div>
			</div>
		</Link>
	);
}

