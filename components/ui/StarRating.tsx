'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface StarRatingProps {
	rating: number;
	onRatingChange?: (rating: number) => void;
	readonly?: boolean;
	size?: 'sm' | 'md' | 'lg';
	showLabel?: boolean;
	className?: string;
}

const RATING_LABELS = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

const sizeClasses = {
	sm: 'w-4 h-4',
	md: 'w-6 h-6',
	lg: 'w-8 h-8',
};

export function StarRating({
	rating,
	onRatingChange,
	readonly = false,
	size = 'md',
	showLabel = false,
	className,
}: StarRatingProps) {
	const [hoverRating, setHoverRating] = useState(0);

	const displayRating = hoverRating || rating;

	const handleClick = (value: number) => {
		if (!readonly && onRatingChange) {
			onRatingChange(value);
		}
	};

	return (
		<div className={cn('flex items-center gap-2', className)}>
			<div className="flex items-center gap-1">
				{[1, 2, 3, 4, 5].map((value) => (
					<motion.button
						key={value}
						type="button"
						disabled={readonly}
						onClick={() => handleClick(value)}
						onMouseEnter={() => !readonly && setHoverRating(value)}
						onMouseLeave={() => setHoverRating(0)}
						whileHover={!readonly ? { scale: 1.2 } : undefined}
						whileTap={!readonly ? { scale: 0.9 } : undefined}
						className={cn(
							'transition-colors duration-150',
							readonly ? 'cursor-default' : 'cursor-pointer'
						)}
					>
						<Star
							className={cn(
								sizeClasses[size],
								'transition-all duration-150',
								value <= displayRating
									? 'fill-yellow-400 text-yellow-400'
									: 'fill-transparent text-gray-500 hover:text-gray-400'
							)}
						/>
					</motion.button>
				))}
			</div>
			{showLabel && displayRating > 0 && (
				<span className="text-sm text-gray-400 font-medium">
					{RATING_LABELS[displayRating]}
				</span>
			)}
		</div>
	);
}

// Compact version for cards/lists
export function StarRatingDisplay({
	rating,
	size = 'sm',
	className,
}: {
	rating: number;
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}) {
	return (
		<div className={cn('flex items-center gap-1', className)}>
			<Star className={cn(sizeClasses[size], 'fill-yellow-400 text-yellow-400')} />
			<span className="text-sm font-semibold text-gray-200">{rating.toFixed(1)}</span>
		</div>
	);
}

