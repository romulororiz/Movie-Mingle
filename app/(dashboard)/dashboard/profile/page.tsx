'use client';

import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { Heading } from '@/components/ui';
import { UserAvatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { StarRating } from '@/components/Reviews';
import { Mail, Calendar, Film, Star, Users, Settings, MessageSquare, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { getAbsoluteUrl } from '@/lib/utils';
import type { DbReview } from '@/lib/supabase/db';

interface UserStats {
	bookmarks: number;
	friends: number;
	reviews: number;
	averageRating: number;
}

interface FriendsResponse {
	friends: unknown[];
	pendingIncoming: unknown[];
	pendingOutgoing: unknown[];
}

export default function ProfilePage() {
	const { user, loading } = useSupabaseUser();
	const router = useRouter();
	const [stats, setStats] = useState<UserStats>({ bookmarks: 0, friends: 0, reviews: 0, averageRating: 0 });
	const [reviews, setReviews] = useState<DbReview[]>([]);
	const [isLoadingStats, setIsLoadingStats] = useState(true);

	useEffect(() => {
		if (!loading && !user) {
			router.push('/');
		}
	}, [user, loading, router]);

	useEffect(() => {
		if (user) {
			// Fetch user stats
			Promise.all([
				fetch('/api/bookmarks').then((res) => (res.ok ? res.json() : [])),
				fetch('/api/friends').then((res) => (res.ok ? res.json() : { friends: [] })),
				fetch(`/api/users/${user.id}`).then((res) => (res.ok ? res.json() : { reviews: [] })),
			])
				.then(([bookmarks, friendsData, userData]) => {
					const userReviews = (userData as { reviews?: DbReview[] }).reviews || [];
					const avgRating =
						userReviews.length > 0
							? userReviews.reduce((sum: number, r: DbReview) => sum + r.rating, 0) / userReviews.length
							: 0;

					setStats({
						bookmarks: Array.isArray(bookmarks) ? bookmarks.length : 0,
						friends: (friendsData as FriendsResponse).friends?.length || 0,
						reviews: userReviews.length,
						averageRating: avgRating,
					});
					setReviews(userReviews.slice(0, 5)); // Show last 5 reviews
				})
				.catch((error) => console.error('Error fetching stats:', error))
				.finally(() => setIsLoadingStats(false));
		}
	}, [user]);

	if (loading || !user) {
		return (
			<div className="container py-20 flex items-center justify-center">
				<div className="flex flex-col items-center gap-4">
					<div className="w-24 h-24 rounded-full bg-gray-800 animate-pulse" />
					<div className="w-48 h-6 bg-gray-800 rounded animate-pulse" />
				</div>
			</div>
		);
	}

	const userDisplayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Movie Fan';
	const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
		month: 'long',
		year: 'numeric',
	});

	return (
		<div className="px-4">
			{/* Hero Section with Gradient */}
			<section className="relative py-16 bg-dark-background rounded-xl border border-accent-primary border-opacity-30">
				<div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5" />
				<div className="container relative z-10">
					<div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
						{/* Avatar */}
						<div className="relative">
							<UserAvatar
								user={{
									name: userDisplayName,
									image:
										user.user_metadata?.picture || user.user_metadata?.avatar_url || null,
								}}
								className="w-32 h-32 md:w-40 md:h-40 border-2 border-accent-primary relative z-10"
							/>
						</div>

						{/* User Info */}
						<div className="flex-1 text-center md:text-left">
							<Heading
								element="h1"
								title={userDisplayName}
								className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent"
							/>
							<div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 mb-6">
								<div className="flex items-center gap-2">
									<Mail className="w-4 h-4" />
									<span>{user.email}</span>
								</div>
								<div className="flex items-center gap-2">
									<Calendar className="w-4 h-4" />
									<span>Joined {joinDate}</span>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="flex flex-wrap gap-3 justify-center md:justify-start">
								<Link href="/dashboard/settings">
									<Button variant="default" size="md" className="gap-2">
										<Settings className="w-4 h-4" />
										Edit Profile
									</Button>
								</Link>
								<Link href="/dashboard/friends">
									<Button variant="outline" size="md" className="gap-2">
										<Users className="w-4 h-4" />
										Friends
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Stats Section */}
			<section className="container py-12">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
					{/* Watchlist Stat */}
					<Link href="/dashboard/watchlist">
						<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-primary/10 to-transparent border border-accent-primary/20 p-5 hover:border-accent-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/10 cursor-pointer">
							<div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							<div className="relative z-10">
								<div className="flex items-center justify-between mb-3">
									<Film className="w-6 h-6 text-accent-primary" />
									{isLoadingStats ? (
										<div className="w-12 h-8 bg-gray-800 rounded animate-pulse" />
									) : (
										<span className="text-3xl font-bold text-accent-primary">
											{stats.bookmarks}
										</span>
									)}
								</div>
								<h3 className="text-sm font-semibold text-gray-200">Watchlist</h3>
								<p className="text-xs text-gray-400 mt-0.5">Movies saved</p>
							</div>
						</div>
					</Link>

					{/* Reviews Stat */}
					<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 p-5 hover:border-yellow-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10">
						<div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						<div className="relative z-10">
							<div className="flex items-center justify-between mb-3">
								<MessageSquare className="w-6 h-6 text-yellow-400" />
								{isLoadingStats ? (
									<div className="w-12 h-8 bg-gray-800 rounded animate-pulse" />
								) : (
									<span className="text-3xl font-bold text-yellow-400">{stats.reviews}</span>
								)}
							</div>
							<h3 className="text-sm font-semibold text-gray-200">Reviews</h3>
							<p className="text-xs text-gray-400 mt-0.5">Written by you</p>
						</div>
					</div>

					{/* Friends Stat */}
					<Link href="/dashboard/friends">
						<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 p-5 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							<div className="relative z-10">
								<div className="flex items-center justify-between mb-3">
									<Users className="w-6 h-6 text-blue-400" />
									{isLoadingStats ? (
										<div className="w-12 h-8 bg-gray-800 rounded animate-pulse" />
									) : (
										<span className="text-3xl font-bold text-blue-400">{stats.friends}</span>
									)}
								</div>
								<h3 className="text-sm font-semibold text-gray-200">Friends</h3>
								<p className="text-xs text-gray-400 mt-0.5">Connected</p>
							</div>
						</div>
					</Link>

					{/* Average Rating Stat */}
					<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-5 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
						<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						<div className="relative z-10">
							<div className="flex items-center justify-between mb-3">
								<Star className="w-6 h-6 text-purple-400" />
								{isLoadingStats ? (
									<div className="w-12 h-8 bg-gray-800 rounded animate-pulse" />
								) : (
									<span className="text-3xl font-bold text-purple-400">
										{stats.averageRating > 0 ? stats.averageRating.toFixed(1) : '—'}
									</span>
								)}
							</div>
							<h3 className="text-sm font-semibold text-gray-200">Avg Rating</h3>
							<p className="text-xs text-gray-400 mt-0.5">Your ratings</p>
						</div>
					</div>
				</div>
			</section>

			{/* Recent Reviews Section */}
			<section className="container pb-12">
				<div className="flex items-center justify-between mb-6">
					<Heading element="h2" title="Your Recent Reviews" className="text-2xl font-bold" />
				</div>

				{isLoadingStats ? (
					<div className="space-y-4">
						{[1, 2, 3].map((i) => (
							<div key={i} className="h-24 bg-gray-800/50 rounded-xl animate-pulse" />
						))}
					</div>
				) : reviews.length === 0 ? (
					<div className="text-center py-12 bg-gray-800/20 rounded-2xl border border-gray-700/30">
						<MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
						<p className="text-gray-400 mb-2">No reviews yet</p>
						<p className="text-sm text-gray-500 mb-6">
							Start reviewing movies to share your thoughts!
						</p>
						<Link href="/">
							<Button variant="default" size="md" className="gap-2">
								<Film className="w-4 h-4" />
								Discover Movies
							</Button>
						</Link>
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
									<ReviewCard review={review} />
								</motion.div>
							))}
						</div>
					</AnimatePresence>
				)}
			</section>

			{/* Quick Actions */}
			<section className="container pb-20">
				<Heading element="h2" title="Quick Actions" className="text-2xl font-bold mb-6" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Link href="/dashboard/watchlist">
						<div className="group p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-accent-primary/50 transition-all duration-300 cursor-pointer">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
									<Film className="w-6 h-6 text-accent-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-lg text-gray-200 group-hover:text-accent-primary transition-colors">
										View Watchlist
									</h3>
									<p className="text-sm text-gray-400">Browse your saved movies</p>
								</div>
							</div>
						</div>
					</Link>

					<Link href="/dashboard/settings">
						<div className="group p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-accent-primary/50 transition-all duration-300 cursor-pointer">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
									<Settings className="w-6 h-6 text-accent-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-lg text-gray-200 group-hover:text-accent-primary transition-colors">
										Preferences
									</h3>
									<p className="text-sm text-gray-400">Customize your experience</p>
								</div>
							</div>
						</div>
					</Link>
				</div>
			</section>
		</div>
	);
}

// Review Card for profile page
function ReviewCard({ review }: { review: DbReview }) {
	const movieSlug = `${review.movie_title.replace(/[^a-zA-Z0-9]/g, '-')}-${review.movie_id}`;

	return (
		<Link
			href={`/movies/${movieSlug}`}
			className="block bg-gray-800/30 border border-gray-700/30 rounded-xl p-4 hover:border-gray-600/50 hover:bg-gray-800/40 transition-all duration-200"
		>
			<div className="flex gap-4">
				{/* Movie Poster */}
				{review.movie_poster && (
					<div className="flex-shrink-0">
						<Image
							src={getAbsoluteUrl('https://image.tmdb.org/t/p/w92', review.movie_poster)}
							alt={review.movie_title}
							width={50}
							height={75}
							className="rounded-lg"
						/>
					</div>
				)}

				{/* Content */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-4 mb-2">
						<div>
							<h3 className="font-semibold text-gray-200 hover:text-accent-primary transition-colors line-clamp-1">
								{review.movie_title}
							</h3>
							<p className="text-xs text-gray-500">
								{formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
							</p>
						</div>
						<StarRating rating={review.rating} readonly size="sm" />
					</div>
					<p className="text-gray-400 text-sm line-clamp-2">{review.content}</p>
				</div>

				<ExternalLink className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
			</div>
		</Link>
	);
}
