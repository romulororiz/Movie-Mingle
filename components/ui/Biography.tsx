'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BiographyProps {
	biography: string;
	className?: string;
}

export function Biography({ biography, className }: BiographyProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const [showToggle, setShowToggle] = useState(false);
	const [contentHeight, setContentHeight] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			const height = contentRef.current.scrollHeight;
			setContentHeight(height);
			// Show toggle if content is taller than 5 lines (~160px)
			setShowToggle(height > 160);
		}
	}, [biography]);

	// Format biography: split into paragraphs and clean up
	const formatBiography = (text: string) => {
		if (!text) return [];

		const paragraphs = text
			.split(/\n\n+/)
			.map((p) => p.trim())
			.filter((p) => p.length > 0);

		return paragraphs;
	};

	const paragraphs = formatBiography(biography);

	if (!biography || paragraphs.length === 0) {
		return (
			<div className={cn('text-gray-400 italic text-sm', className)}>No biography available.</div>
		);
	}

	return (
		<div className={cn('relative w-full', className)}>
			{/* Biography Content Container */}
			<div className="relative">
				<motion.div
					initial={false}
					animate={{
						height: isExpanded ? contentHeight : showToggle ? 160 : 'auto',
					}}
					transition={{
						duration: 0.8,
						ease: [0.25, 0.1, 0.25, 1], // Smoother, slower easing
					}}
					className="relative overflow-hidden"
				>
					<div
						ref={contentRef}
						className="space-y-4 text-gray-300 leading-relaxed text-[15px] sm:text-base"
					>
						{paragraphs.map((paragraph, index) => (
							<p key={index} className="first:mt-0">
								{paragraph}
							</p>
						))}
					</div>
				</motion.div>
				{/* Fade Out Overlay - Outside the overflow container */}
				<AnimatePresence>
					{!isExpanded && showToggle && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.6, ease: 'easeInOut' }}
							className="absolute bottom-0 -left-2 -right-2 h-24 
									  pointer-events-none bg-gradient-to-b 
									  from-transparent via-dark-background/90 to-dark-background"
						/>
					)}
				</AnimatePresence>
			</div>

			{/* Toggle Button */}
			{showToggle && (
				<motion.button
					onClick={() => setIsExpanded(!isExpanded)}
					className={cn(
						'inline-flex items-center gap-2 mt-6',
						'text-accent-primary hover:text-accent-secondary',
						'transition-colors duration-200 font-semibold group'
					)}
					whileHover={{ scale: 0.95 }}
					aria-label={isExpanded ? 'Show less' : 'Read more'}
				>
					<span className="text-sm sm:text-base tracking-wide">
						{isExpanded ? 'Show Less' : 'Read More'}
					</span>
					<motion.div
						animate={{ rotate: isExpanded ? 180 : 0 }}
						transition={{ duration: 0.6, ease: 'easeInOut' }}
					>
						<ChevronDown className="w-5 h-5" />
					</motion.div>
				</motion.button>
			)}
		</div>
	);
}
