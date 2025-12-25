'use client';

import { useState } from 'react';
import { StarRating } from '@/components/ui/StarRating';
import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/Avatar';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

interface ReviewFormProps {
	user: User | null;
	movieId: string;
	movieTitle: string;
	moviePoster: string | null;
	existingReview?: {
		rating: number;
		content: string;
	} | null;
	onReviewSubmit: () => void;
	onCancel?: () => void;
}

export function ReviewForm({
	user,
	movieId,
	movieTitle,
	moviePoster,
	existingReview,
	onReviewSubmit,
	onCancel,
}: ReviewFormProps) {
	const [rating, setRating] = useState(existingReview?.rating || 0);
	const [content, setContent] = useState(existingReview?.content || '');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isFocused, setIsFocused] = useState(false);

	const isEditing = !!existingReview;
	const canSubmit = rating > 0 && content.length >= 10;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			toast.error('Please sign in to write a review');
			return;
		}

		if (!canSubmit) {
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

			toast.success(isEditing ? 'Review updated!' : 'Review posted!');
			onReviewSubmit();

			if (!isEditing) {
				setRating(0);
				setContent('');
			}
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Failed to submit review';
			toast.error(message);
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!user) {
		return (
			<div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6 text-center">
				<p className="text-gray-400 mb-4">Sign in to share your thoughts on this movie</p>
				<Button variant="default" size="md" onClick={() => (window.location.href = '/sign-in')}>
					Sign In to Review
				</Button>
			</div>
		);
	}

	return (
		<motion.form
			onSubmit={handleSubmit}
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-6"
		>
			{/* Header */}
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center gap-3">
					<UserAvatar
						user={{
							name: user.user_metadata?.full_name || user.email || 'User',
							image: user.user_metadata?.picture || user.user_metadata?.avatar_url || null,
						}}
						className="w-10 h-10 border-2 border-accent-primary"
					/>
					<div>
						<p className="font-semibold text-gray-200">
							{user.user_metadata?.full_name || user.email?.split('@')[0]}
						</p>
						<p className="text-sm text-gray-400">
							{isEditing ? 'Editing your review' : 'Write a review'}
						</p>
					</div>
				</div>
				{onCancel && (
					<button
						type="button"
						onClick={onCancel}
						className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
					>
						<X className="w-5 h-5 text-gray-400" />
					</button>
				)}
			</div>

			{/* Rating */}
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-300 mb-3">Your Rating</label>
				<StarRating rating={rating} onRatingChange={setRating} size="lg" showLabel />
			</div>

			{/* Content */}
			<div className="mb-6">
				<label className="block text-sm font-medium text-gray-300 mb-3">Your Review</label>
				<div
					className={`relative rounded-xl transition-all duration-200 ${
						isFocused ? 'ring-2 ring-accent-primary/50' : ''
					}`}
				>
					<textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						placeholder="Share your thoughts about this movie... What did you like or dislike? Would you recommend it?"
						rows={4}
						className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-accent-primary focus:outline-none resize-none transition-colors"
					/>
					<div className="absolute bottom-3 right-3 text-xs text-gray-500">
						{content.length}/500
					</div>
				</div>
				{content.length > 0 && content.length < 10 && (
					<p className="text-sm text-red-400 mt-2">Review must be at least 10 characters</p>
				)}
			</div>

			{/* Submit */}
			<div className="flex items-center justify-end gap-3">
				{onCancel && (
					<Button type="button" variant="outline" onClick={onCancel}>
						Cancel
					</Button>
				)}
				<Button
					type="submit"
					variant="default"
					disabled={!canSubmit || isSubmitting}
					isLoading={isSubmitting}
					className="gap-2"
				>
					<Send className="w-4 h-4" />
					{isEditing ? 'Update Review' : 'Post Review'}
				</Button>
			</div>
		</motion.form>
	);
}
