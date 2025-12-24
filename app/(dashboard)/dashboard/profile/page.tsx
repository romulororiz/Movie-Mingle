'use client';

import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { Heading } from '@/components/ui';
import { UserAvatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { User, Mail, Calendar, Film, Heart, Users, Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface UserStats {
	bookmarks: number;
	friends: number;
}

export default function ProfilePage() {
	const { user, loading } = useSupabaseUser();
	const router = useRouter();
	const [stats, setStats] = useState<UserStats>({ bookmarks: 0, friends: 0 });
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
				// Add friends API when ready
			])
				.then(([bookmarks]) => {
					setStats({
						bookmarks: Array.isArray(bookmarks) ? bookmarks.length : 0,
						friends: 0, // TODO: Implement friends count
					});
				})
				.catch((error) => console.error('Error fetching stats:', error))
				.finally(() => setIsLoadingStats(false));
		}
	}, [user]);

	if (loading || !user) {
		return (
			<div className="container py-20 min-h-screen flex items-center justify-center">
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
		<div className="min-h-screen">
			{/* Hero Section with Gradient */}
			<section className="relative py-16 md:py-24 bg-gradient-to-b from-accent-primary/10 via-dark-background to-dark-background">
				<div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5" />
				<div className="container relative z-10">
					<div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
						{/* Avatar */}
						<div className="relative">
							<div className="absolute inset-0 bg-accent-primary/20 blur-3xl rounded-full" />
							<UserAvatar
								user={{
									name: userDisplayName,
									image: user.user_metadata?.avatar_url || null,
								}}
								className="w-32 h-32 md:w-40 md:h-40 border-4 border-accent-primary/30 shadow-2xl shadow-accent-primary/20 relative z-10"
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
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Watchlist Stat */}
					<Link href="/dashboard/watchlist">
						<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent-primary/10 to-transparent border border-accent-primary/20 p-6 hover:border-accent-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/10 cursor-pointer">
							<div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<Film className="w-8 h-8 text-accent-primary" />
									{isLoadingStats ? (
										<div className="w-16 h-10 bg-gray-800 rounded animate-pulse" />
									) : (
										<span className="text-4xl font-bold text-accent-primary">
											{stats.bookmarks}
										</span>
									)}
								</div>
								<h3 className="text-lg font-semibold text-gray-200">Movies Watchlisted</h3>
								<p className="text-sm text-gray-400 mt-1">Your saved movies</p>
							</div>
						</div>
					</Link>

					{/* Friends Stat */}
					<Link href="/dashboard/friends">
						<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 p-6 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer">
							<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
							<div className="relative z-10">
								<div className="flex items-center justify-between mb-4">
									<Users className="w-8 h-8 text-blue-400" />
									{isLoadingStats ? (
										<div className="w-16 h-10 bg-gray-800 rounded animate-pulse" />
									) : (
										<span className="text-4xl font-bold text-blue-400">{stats.friends}</span>
									)}
								</div>
								<h3 className="text-lg font-semibold text-gray-200">Friends</h3>
								<p className="text-sm text-gray-400 mt-1">Connect with cinephiles</p>
							</div>
						</div>
					</Link>

					{/* Activity Stat */}
					<div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-6 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
						<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
						<div className="relative z-10">
							<div className="flex items-center justify-between mb-4">
								<Heart className="w-8 h-8 text-purple-400" />
								<span className="text-4xl font-bold text-purple-400">∞</span>
							</div>
							<h3 className="text-lg font-semibold text-gray-200">Movie Love</h3>
							<p className="text-sm text-gray-400 mt-1">Passion for cinema</p>
						</div>
					</div>
				</div>
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
