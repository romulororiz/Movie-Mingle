'use client';

import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { Heading } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/Avatar';
import {
	Bell,
	Users,
	Check,
	X,
	UserPlus,
	Clock,
	CheckCircle2,
	XCircle,
	ExternalLink,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import type { FriendRequestWithUser } from '@/lib/supabase/db';

type NotificationType = 'friend_request' | 'friend_accepted';

interface Notification {
	id: string;
	type: NotificationType;
	data: FriendRequestWithUser;
	createdAt: string;
	read: boolean;
}

export default function NotificationsPage() {
	const { user, loading } = useSupabaseUser();
	const router = useRouter();
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [actionLoading, setActionLoading] = useState<string | null>(null);

	useEffect(() => {
		if (!loading && !user) {
			router.push('/');
		}
	}, [user, loading, router]);

	const fetchNotifications = async () => {
		try {
			setIsLoading(true);
			const response = await fetch('/api/friends');
			if (response.ok) {
				const data = (await response.json()) as {
					pendingIncoming: FriendRequestWithUser[];
					pendingOutgoing: FriendRequestWithUser[];
					friends: unknown[];
				};

				// Transform friend requests into notifications
				const notifs: Notification[] = data.pendingIncoming.map((request) => ({
					id: request.id,
					type: 'friend_request' as NotificationType,
					data: request,
					createdAt: request.created_at,
					read: false,
				}));

				// Sort by date (newest first)
				notifs.sort(
					(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);

				setNotifications(notifs);
			}
		} catch (error) {
			console.error('Error fetching notifications:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			fetchNotifications();
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
			fetchNotifications();
		} catch {
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
			fetchNotifications();
		} catch {
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
						<div key={i} className="h-20 bg-gray-800 rounded-xl animate-pulse" />
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="py-8 px-4">
			<div className="container">
				<div className="max-w-3xl mx-auto">
					{/* Header */}
					<div className="flex items-center justify-between mb-8">
						<div>
							<Heading
								element="h1"
								title="Notifications"
								className="text-3xl md:text-4xl font-bold mb-2"
							/>
							<p className="text-gray-400">
								{notifications.length > 0
									? `${notifications.length} new notification${notifications.length !== 1 ? 's' : ''}`
									: 'Stay updated with your activity'}
							</p>
						</div>
						{notifications.length > 0 && (
							<div className="flex items-center gap-2 text-accent-primary">
								<Bell className="w-5 h-5" />
								<span className="text-sm font-medium">{notifications.length}</span>
							</div>
						)}
					</div>

					{/* Notifications List */}
					{isLoading ? (
						<div className="space-y-4">
							{[...Array(3)].map((_, i) => (
								<div key={i} className="h-20 bg-gray-800/50 rounded-xl animate-pulse" />
							))}
						</div>
					) : notifications.length === 0 ? (
						<div className="flex flex-col items-center justify-center min-h-[50vh]">
							<div className="w-24 h-24 mb-6 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center">
								<Bell className="w-12 h-12 text-gray-600" />
							</div>
							<Heading
								element="h3"
								title="All Caught Up!"
								className="text-2xl font-bold mb-2"
							/>
							<p className="text-gray-400 text-center max-w-sm">
								You don't have any new notifications. We'll let you know when something
								happens!
							</p>
						</div>
					) : (
						<AnimatePresence mode="popLayout">
							<div className="space-y-3">
								{notifications.map((notification, index) => (
									<motion.div
										key={notification.id}
										initial={{ opacity: 0, y: 10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, x: -100 }}
										transition={{ delay: index * 0.05 }}
									>
										{notification.type === 'friend_request' && (
											<FriendRequestNotification
												notification={notification}
												onAccept={() => handleAcceptRequest(notification.id)}
												onReject={() => handleRejectRequest(notification.id)}
												isLoading={actionLoading === notification.id}
											/>
										)}
									</motion.div>
								))}
							</div>
						</AnimatePresence>
					)}

					{/* Quick Links */}
					{notifications.length === 0 && !isLoading && (
						<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
							<Link href="/dashboard/friends">
								<div className="group p-5 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-accent-primary/30 transition-all">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
											<Users className="w-5 h-5 text-blue-400" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-200 group-hover:text-accent-primary transition-colors">
												View Friends
											</h3>
											<p className="text-sm text-gray-500">Manage your connections</p>
										</div>
									</div>
								</div>
							</Link>
							<Link href="/">
								<div className="group p-5 rounded-xl bg-gray-800/30 border border-gray-700/50 hover:border-accent-primary/30 transition-all">
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-lg bg-accent-primary/10 flex items-center justify-center">
											<ExternalLink className="w-5 h-5 text-accent-primary" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-200 group-hover:text-accent-primary transition-colors">
												Discover Movies
											</h3>
											<p className="text-sm text-gray-500">Find something to watch</p>
										</div>
									</div>
								</div>
							</Link>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

// Friend Request Notification Component
function FriendRequestNotification({
	notification,
	onAccept,
	onReject,
	isLoading,
}: {
	notification: Notification;
	onAccept: () => void;
	onReject: () => void;
	isLoading: boolean;
}) {
	const request = notification.data;

	return (
		<div className="group bg-gray-800/40 border border-gray-700/50 rounded-xl p-4 hover:border-gray-600/50 transition-all">
			<div className="flex items-start gap-4">
				{/* Icon */}
				<div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
					<UserPlus className="w-5 h-5 text-blue-400" />
				</div>

				{/* Content */}
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-4">
						<div>
							<Link
								href={`/user/${request.requester.id}`}
								className="inline-flex items-center gap-2 group/link"
							>
								<UserAvatar
									user={{
										name: request.requester.name || 'User',
										image: request.requester.image,
									}}
									className="w-6 h-6"
								/>
								<span className="font-semibold text-gray-200 group-hover/link:text-accent-primary transition-colors">
									{request.requester.name || 'Someone'}
								</span>
							</Link>
							<span className="text-gray-400"> wants to be your friend</span>
						</div>
						<span className="text-xs text-gray-500 whitespace-nowrap">
							{formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
						</span>
					</div>

					{/* Actions */}
					<div className="flex items-center gap-2 mt-3">
						<Button
							variant="default"
							size="sm"
							onClick={onAccept}
							isLoading={isLoading}
							className="gap-1.5"
						>
							<Check className="w-3.5 h-3.5" />
							Accept
						</Button>
						<Button
							variant="outline"
							size="sm"
							onClick={onReject}
							disabled={isLoading}
							className="gap-1.5"
						>
							<X className="w-3.5 h-3.5" />
							Decline
						</Button>
						<Link href={`/user/${request.requester.id}`} className="ml-auto">
							<Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
								View Profile
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

