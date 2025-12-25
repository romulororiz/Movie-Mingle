'use client';

import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { Heading } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/Avatar';
import { Users, UserPlus, Search, UserCheck, Clock, X, Check, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import type { PublicUser, FriendRequestWithUser } from '@/lib/supabase/db';

interface FriendsData {
	friends: PublicUser[];
	pendingIncoming: FriendRequestWithUser[];
	pendingOutgoing: FriendRequestWithUser[];
}

export default function FriendsPage() {
	const { user, loading } = useSupabaseUser();
	const router = useRouter();
	const [data, setData] = useState<FriendsData | null>(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<'all' | 'incoming' | 'outgoing'>('all');
	const [actionLoading, setActionLoading] = useState<string | null>(null);

	const fetchFriends = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('/api/friends');
			if (response.ok) {
				const friendsData = await response.json() as FriendsData;
				setData(friendsData);
			}
		} catch (error) {
			console.error('Error fetching friends:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!loading && !user) {
			router.push('/');
		}
	}, [user, loading, router]);

	useEffect(() => {
		if (user) {
			fetchFriends();
		}
	}, [user]);

	const handleAcceptRequest = async (requestId: string) => {
		setActionLoading(requestId);
		try {
			const response = await fetch(`/api/friends/${requestId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: 'accepted' }),
			});

			if (!response.ok) throw new Error('Failed to accept request');

			toast.success('Friend request accepted!');
			fetchFriends();
		} catch (error) {
			toast.error('Failed to accept request');
		} finally {
			setActionLoading(null);
		}
	};

	const handleRejectRequest = async (requestId: string) => {
		setActionLoading(requestId);
		try {
			const response = await fetch(`/api/friends/${requestId}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ status: 'rejected' }),
			});

			if (!response.ok) throw new Error('Failed to reject request');

			toast.success('Friend request declined');
			fetchFriends();
		} catch (error) {
			toast.error('Failed to decline request');
		} finally {
			setActionLoading(null);
		}
	};

	if (loading || !user) {
		return (
			<div className="container py-8 px-4">
				<div className="space-y-6">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />
					))}
				</div>
			</div>
		);
	}

	const friends = data?.friends || [];
	const pendingIncoming = data?.pendingIncoming || [];
	const pendingOutgoing = data?.pendingOutgoing || [];

	const filteredFriends = friends.filter(
		(friend) =>
			searchQuery === '' ||
			friend.name?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const totalPendingCount = pendingIncoming.length + pendingOutgoing.length;

	return (
		<div className="py-8 px-4">
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

					{/* Search */}
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
					</div>

					{/* Tabs */}
					<div className="flex gap-2 mb-6 border-b border-gray-700 overflow-x-auto">
						<button
							onClick={() => setActiveTab('all')}
							className={`px-6 py-3 font-medium transition-colors relative whitespace-nowrap ${
								activeTab === 'all'
									? 'text-accent-primary'
									: 'text-gray-400 hover:text-gray-200'
							}`}
						>
							Friends ({friends.length})
							{activeTab === 'all' && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />
							)}
						</button>
						<button
							onClick={() => setActiveTab('incoming')}
							className={`px-6 py-3 font-medium transition-colors relative whitespace-nowrap ${
								activeTab === 'incoming'
									? 'text-accent-primary'
									: 'text-gray-400 hover:text-gray-200'
							}`}
						>
							Incoming Requests
							{pendingIncoming.length > 0 && (
								<span className="ml-2 px-2 py-0.5 text-xs bg-accent-primary/20 text-accent-primary rounded-full">
									{pendingIncoming.length}
								</span>
							)}
							{activeTab === 'incoming' && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />
							)}
						</button>
						<button
							onClick={() => setActiveTab('outgoing')}
							className={`px-6 py-3 font-medium transition-colors relative whitespace-nowrap ${
								activeTab === 'outgoing'
									? 'text-accent-primary'
									: 'text-gray-400 hover:text-gray-200'
							}`}
						>
							Sent Requests ({pendingOutgoing.length})
							{activeTab === 'outgoing' && (
								<div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />
							)}
						</button>
					</div>

					{/* Content */}
					{isLoading ? (
						<div className="space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="h-24 bg-gray-800 rounded-xl animate-pulse" />
							))}
						</div>
					) : activeTab === 'all' ? (
						// Friends List
						filteredFriends.length === 0 ? (
							<div className="flex flex-col items-center justify-center min-h-[40vh]">
								<div className="w-24 h-24 mb-6 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center">
									<Users className="w-12 h-12 text-gray-600" />
								</div>
								<Heading
									element="h3"
									title={friends.length === 0 ? 'No Friends Yet' : 'No Friends Found'}
									className="text-2xl font-bold mb-2"
								/>
								<p className="text-gray-400 mb-6 text-center max-w-md">
									{friends.length === 0
										? 'Connect with other movie lovers by visiting their profiles and sending friend requests'
										: 'Try a different search term'}
								</p>
							</div>
						) : (
							<AnimatePresence mode="popLayout">
								<div className="space-y-4">
									{filteredFriends.map((friend, index) => (
										<motion.div
											key={friend.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.05 }}
											className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-accent-primary/50 transition-all duration-300"
										>
											<div className="flex flex-col md:flex-row md:items-center gap-4">
												<Link
													href={`/user/${friend.id}`}
													className="flex items-center gap-4 flex-1"
												>
													<UserAvatar
														user={{
															name: friend.name || 'User',
															image: friend.image,
														}}
														className="w-16 h-16 border-2 border-accent-primary/30"
													/>
													<div className="flex-1">
														<h3 className="font-semibold text-lg text-gray-200 group-hover:text-accent-primary transition-colors">
															{friend.name || 'Anonymous User'}
														</h3>
														<div className="flex items-center gap-1 text-sm text-gray-400 mt-1">
															<UserCheck className="w-4 h-4 text-green-500" />
															<span>Friend</span>
														</div>
													</div>
												</Link>

												<div className="flex gap-2">
													<Link href={`/user/${friend.id}`}>
														<Button variant="outline" size="sm" className="gap-2">
															<ExternalLink className="w-4 h-4" />
															View Profile
														</Button>
													</Link>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</AnimatePresence>
						)
					) : activeTab === 'incoming' ? (
						// Incoming Requests
						pendingIncoming.length === 0 ? (
							<div className="flex flex-col items-center justify-center min-h-[40vh]">
								<div className="w-24 h-24 mb-6 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center">
									<Clock className="w-12 h-12 text-gray-600" />
								</div>
								<Heading
									element="h3"
									title="No Pending Requests"
									className="text-2xl font-bold mb-2"
								/>
								<p className="text-gray-400">You don't have any incoming friend requests</p>
							</div>
						) : (
							<AnimatePresence mode="popLayout">
								<div className="space-y-4">
									{pendingIncoming.map((request, index) => (
										<motion.div
											key={request.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.05 }}
											className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6"
										>
											<div className="flex flex-col md:flex-row md:items-center gap-4">
												<Link
													href={`/user/${request.requester.id}`}
													className="flex items-center gap-4 flex-1"
												>
													<UserAvatar
														user={{
															name: request.requester.name || 'User',
															image: request.requester.image,
														}}
														className="w-16 h-16 border-2 border-yellow-500/30"
													/>
													<div className="flex-1">
														<h3 className="font-semibold text-lg text-gray-200 group-hover:text-accent-primary transition-colors">
															{request.requester.name || 'Anonymous User'}
														</h3>
														<p className="text-sm text-gray-400">wants to be your friend</p>
													</div>
												</Link>

												<div className="flex gap-2">
													<Button
														variant="default"
														size="sm"
														onClick={() => handleAcceptRequest(request.id)}
														isLoading={actionLoading === request.id}
														className="gap-2"
													>
														<Check className="w-4 h-4" />
														Accept
													</Button>
													<Button
														variant="outline"
														size="sm"
														onClick={() => handleRejectRequest(request.id)}
														disabled={actionLoading === request.id}
														className="gap-2"
													>
														<X className="w-4 h-4" />
														Decline
													</Button>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</AnimatePresence>
						)
					) : (
						// Outgoing Requests
						pendingOutgoing.length === 0 ? (
							<div className="flex flex-col items-center justify-center min-h-[40vh]">
								<div className="w-24 h-24 mb-6 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center">
									<UserPlus className="w-12 h-12 text-gray-600" />
								</div>
								<Heading
									element="h3"
									title="No Pending Requests"
									className="text-2xl font-bold mb-2"
								/>
								<p className="text-gray-400">You haven't sent any friend requests</p>
							</div>
						) : (
							<AnimatePresence mode="popLayout">
								<div className="space-y-4">
									{pendingOutgoing.map((request, index) => (
										<motion.div
											key={request.id}
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: index * 0.05 }}
											className="group bg-gray-800/50 border border-gray-700 rounded-xl p-6"
										>
											<div className="flex flex-col md:flex-row md:items-center gap-4">
												<Link
													href={`/user/${request.addressee.id}`}
													className="flex items-center gap-4 flex-1"
												>
													<UserAvatar
														user={{
															name: request.addressee.name || 'User',
															image: request.addressee.image,
														}}
														className="w-16 h-16 border-2 border-gray-600"
													/>
													<div className="flex-1">
														<h3 className="font-semibold text-lg text-gray-200 group-hover:text-accent-primary transition-colors">
															{request.addressee.name || 'Anonymous User'}
														</h3>
														<div className="flex items-center gap-1 text-sm text-yellow-500 mt-1">
															<Clock className="w-4 h-4" />
															<span>Request pending</span>
														</div>
													</div>
												</Link>

												<Link href={`/user/${request.addressee.id}`}>
													<Button variant="outline" size="sm" className="gap-2">
														<ExternalLink className="w-4 h-4" />
														View Profile
													</Button>
												</Link>
											</div>
										</motion.div>
									))}
								</div>
							</AnimatePresence>
						)
					)}
				</div>
			</div>
		</div>
	);
}
