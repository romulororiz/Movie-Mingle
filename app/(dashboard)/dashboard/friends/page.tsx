'use client';

import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { Heading } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/Avatar';
import { Users, UserPlus, Search, Film, Heart, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Friend {
	id: string;
	name: string;
	email: string;
	avatarUrl: string | null;
	status: 'pending' | 'accepted';
	mutualFriends: number;
	watchlistCount: number;
}

export default function FriendsPage() {
	const { user, loading } = useSupabaseUser();
	const router = useRouter();
	const [friends, setFriends] = useState<Friend[]>([]);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');

	useEffect(() => {
		if (!loading && !user) {
			router.push('/');
		}
	}, [user, loading, router]);

	useEffect(() => {
		if (user) {
			// TODO: Fetch friends from API
			// For now, showing empty state
			setIsLoading(false);
		}
	}, [user]);

	if (loading || !user) {
		return (
			<div className="container py-20 min-h-screen">
				<div className="space-y-6">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />
					))}
				</div>
			</div>
		);
	}

	const filteredFriends = friends.filter(
		(friend) =>
			(activeTab === 'all' ? friend.status === 'accepted' : friend.status === 'pending') &&
			(searchQuery === '' ||
				friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
				friend.email.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	return (
		<div className="min-h-screen py-12 md:py-20">
			<div className="container">
				<div className="max-w-5xl mx-auto">
					{/* Header */}
					<div className="mb-8">
						<Heading
							element="h1"
							title="Friends"
							className="text-3xl md:text-4xl font-bold mb-2"
						/>
						<p className="text-gray-400">Connect with other movie enthusiasts</p>
					</div>

					{/* Search and Add Friend */}
					<div className="flex flex-col md:flex-row gap-4 mb-8">
						<div className="flex-1 relative">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
							<input
								type="text"
								placeholder="Search friends..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors"
							/>
						</div>
						<Button
							variant="default"
							size="lg"
							onClick={() => toast.message('Add friend feature coming soon')}
							className="gap-2"
						>
							<UserPlus className="w-5 h-5" />
							Add Friend
						</Button>
					</div>

					{/* Tabs */}
					<div className="flex gap-2 mb-6 border-b border-gray-700">
						<button
							onClick={() => setActiveTab('all')}
							className={`px-6 py-3 font-medium transition-colors relative ${
								activeTab === 'all'
									? 'text-accent-primary'
									: 'text-gray-400 hover:text-gray-200'
							}`}
						>
							All Friends
							{activeTab === 'all' && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />
							)}
						</button>
						<button
							onClick={() => setActiveTab('pending')}
							className={`px-6 py-3 font-medium transition-colors relative ${
								activeTab === 'pending'
									? 'text-accent-primary'
									: 'text-gray-400 hover:text-gray-200'
							}`}
						>
							Pending Requests
							{activeTab === 'pending' && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />
							)}
						</button>
					</div>

					{/* Friends List */}
					{isLoading ? (
						<div className="space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />
							))}
						</div>
					) : filteredFriends.length === 0 ? (
						<div className="text-center py-20">
							<div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center">
								<Users className="w-12 h-12 text-gray-600" />
							</div>
							<Heading
								element="h3"
								title={
									activeTab === 'pending'
										? 'No Pending Requests'
										: friends.length === 0
										? 'No Friends Yet'
										: 'No Friends Found'
								}
								className="text-2xl font-bold mb-2"
							/>
							<p className="text-gray-400 mb-6">
								{activeTab === 'pending'
									? "You don't have any pending friend requests"
									: friends.length === 0
									? 'Start connecting with other movie lovers'
									: 'Try a different search term'}
							</p>
							{friends.length === 0 && (
								<Button
									variant="default"
									size="lg"
									onClick={() => toast.message('Friend discovery feature coming soon')}
									className="gap-2"
								>
									<UserPlus className="w-5 h-5" />
									Discover Friends
								</Button>
							)}
						</div>
					) : (
						<div className="space-y-4">
							{filteredFriends.map((friend) => (
								<div
									key={friend.id}
									className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-accent-primary/50 transition-all duration-300"
								>
									<div className="flex flex-col md:flex-row md:items-center gap-4">
										{/* Avatar and Info */}
										<div className="flex items-center gap-4 flex-1">
											<UserAvatar
												user={{
													name: friend.name,
													image: friend.avatarUrl,
												}}
												className="w-16 h-16 border-2 border-accent-primary/30"
											/>

											<div className="flex-1">
												<h3 className="font-semibold text-lg text-gray-200 mb-1">
													{friend.name}
												</h3>
												<p className="text-sm text-gray-400 mb-2">{friend.email}</p>
												<div className="flex flex-wrap gap-3 text-sm text-gray-400">
													<div className="flex items-center gap-1">
														<Users className="w-4 h-4" />
														<span>{friend.mutualFriends} mutual</span>
													</div>
													<div className="flex items-center gap-1">
														<Film className="w-4 h-4" />
														<span>{friend.watchlistCount} movies</span>
													</div>
												</div>
											</div>
										</div>

										{/* Actions */}
										<div className="flex gap-2">
											{friend.status === 'pending' ? (
												<>
													<Button
														variant="default"
														size="sm"
														onClick={() => toast.success('Friend request accepted')}
													>
														Accept
													</Button>
													<Button
														variant="outline"
														size="sm"
														onClick={() => toast.message('Friend request declined')}
													>
														Decline
													</Button>
												</>
											) : (
												<>
													<Button
														variant="outline"
														size="sm"
														onClick={() => toast.message('View profile feature coming soon')}
													>
														View Profile
													</Button>
													<Button
														variant="outline"
														size="sm"
														onClick={() => toast.message('Remove friend feature coming soon')}
													>
														Remove
													</Button>
												</>
											)}
										</div>
									</div>
								</div>
							))}
						</div>
					)}

					{/* Suggested Friends (Future Feature) */}
					{friends.length === 0 && !isLoading && (
						<section className="mt-12">
							<Heading
								element="h2"
								title="Suggested Friends"
								className="text-2xl font-bold mb-6"
							/>
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
								{[...Array(3)].map((_, i) => (
									<div
										key={i}
										className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center hover:border-accent-primary/50 transition-all duration-300"
									>
										<div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-700 flex items-center justify-center">
											<Users className="w-8 h-8 text-gray-500" />
										</div>
										<h3 className="font-semibold text-gray-200 mb-2">Coming Soon</h3>
										<p className="text-sm text-gray-400 mb-4">
											We'll suggest friends based on your movie taste
										</p>
										<Button
											variant="outline"
											size="sm"
											disabled
											className="w-full"
										>
											Connect
										</Button>
									</div>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</div>
	);
}
