'use client';

import { useState } from 'react';
import { StarRating } from '@/components/ui/StarRating';
import { UserAvatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { MoreHorizontal, Edit2, Trash2, Flag } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import type { ReviewWithUser } from '@/lib/supabase/db';

interface ReviewCardProps {
	review: ReviewWithUser;
	currentUserId?: string;
	onEdit?: () => void;
	onDelete?: () => void;
}

export function ReviewCard({ review, currentUserId, onEdit, onDelete }: ReviewCardProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const isOwnReview = currentUserId === review.user_id;

	const handleDelete = async () => {
		if (!confirm('Are you sure you want to delete this review?')) return;

		setIsDeleting(true);
		try {
			const response = await fetch(`/api/reviews/${review.id}`, {
				method: 'DELETE',
			});

			if (!response.ok) {
				throw new Error('Failed to delete review');
			}

			toast.success('Review deleted');
			onDelete?.();
		} catch (error) {
			toast.error('Failed to delete review');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			className="bg-gray-800/20 border border-gray-700/30 rounded-xl p-5 hover:border-gray-600/50 transition-all duration-200"
		>
			{/* Header */}
			<div className="flex items-start justify-between mb-4">
				<Link
					href={`/user/${review.user_id}`}
					className="flex items-center gap-3 group"
				>
					<UserAvatar
						user={{
							name: review.user?.name || 'User',
							image: review.user?.image || null,
						}}
						className="w-10 h-10 border-2 border-transparent group-hover:border-accent-primary/50 transition-colors"
					/>
					<div>
						<p className="font-semibold text-gray-200 group-hover:text-accent-primary transition-colors">
							{review.user?.name || 'Anonymous'}
						</p>
						<p className="text-sm text-gray-500">
							{formatDistanceToNow(new Date(review.created_at), { addSuffix: true })}
							{review.updated_at !== review.created_at && ' (edited)'}
						</p>
					</div>
				</Link>

				<div className="flex items-center gap-3">
					<StarRating rating={review.rating} readonly size="sm" />

					{/* Menu */}
					<Menu as="div" className="relative">
						<Menu.Button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
							<MoreHorizontal className="w-4 h-4 text-gray-400" />
						</Menu.Button>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-gray-800 border border-gray-700 shadow-xl focus:outline-none z-10 overflow-hidden">
								{isOwnReview ? (
									<>
										<Menu.Item>
											{({ active }) => (
												<button
													onClick={onEdit}
													className={`${
														active ? 'bg-gray-700/50' : ''
													} flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300`}
												>
													<Edit2 className="w-4 h-4" />
													Edit Review
												</button>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<button
													onClick={handleDelete}
													disabled={isDeleting}
													className={`${
														active ? 'bg-red-950/30' : ''
													} flex items-center gap-3 w-full px-4 py-3 text-sm text-red-400`}
												>
													<Trash2 className="w-4 h-4" />
													Delete Review
												</button>
											)}
										</Menu.Item>
									</>
								) : (
									<Menu.Item>
										{({ active }) => (
											<button
												onClick={() => toast.message('Report feature coming soon')}
												className={`${
													active ? 'bg-gray-700/50' : ''
												} flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-300`}
											>
												<Flag className="w-4 h-4" />
												Report Review
											</button>
										)}
									</Menu.Item>
								)}
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>

			{/* Content */}
			<p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{review.content}</p>
		</motion.div>
	);
}

