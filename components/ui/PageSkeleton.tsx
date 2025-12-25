'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
	className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
	return (
		<div
			className={cn(
				'animate-pulse rounded-lg bg-gray-800/50',
				className
			)}
		/>
	);
}

// Grid skeleton for movie/actor cards
export function CardGridSkeleton({
	count = 12,
	isActor = false,
}: {
	count?: number;
	isActor?: boolean;
}) {
	return (
		<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
			{Array.from({ length: count }).map((_, i) => (
				<div key={i} className="space-y-3">
					<Skeleton className={cn('w-full', isActor ? 'aspect-square rounded-full' : 'aspect-[2/3] rounded-lg')} />
					<div className="space-y-2">
						<Skeleton className="h-4 w-3/4" />
						{!isActor && <Skeleton className="h-3 w-1/2" />}
					</div>
				</div>
			))}
		</div>
	);
}

// Page header skeleton
export function PageHeaderSkeleton() {
	return (
		<div className="mb-8 space-y-4">
			<Skeleton className="h-10 w-64" />
			<Skeleton className="h-5 w-48" />
		</div>
	);
}

// Full page loading skeleton for browse pages
export function BrowsePageSkeleton({ isActor = false }: { isActor?: boolean }) {
	return (
		<div className="container py-8">
			<PageHeaderSkeleton />
			<CardGridSkeleton count={18} isActor={isActor} />
		</div>
	);
}

// Movie detail page skeleton
export function MovieDetailSkeleton() {
	return (
		<div className="min-h-screen">
			{/* Background */}
			<div className="absolute top-0 left-0 right-0 w-full h-[600px] bg-gradient-to-b from-gray-900/50 to-dark-background" />
			
			{/* Content */}
			<div className="relative z-10 container pt-24">
				<div className="flex flex-col md:flex-row gap-8 md:gap-12">
					{/* Poster */}
					<Skeleton className="w-full md:w-[300px] lg:w-[400px] aspect-[2/3] rounded-xl flex-shrink-0" />
					
					{/* Info */}
					<div className="flex-1 space-y-6">
						<Skeleton className="h-10 w-3/4" />
						<div className="flex gap-2">
							{[1, 2, 3].map((i) => (
								<Skeleton key={i} className="h-8 w-20 rounded-full" />
							))}
						</div>
						<div className="flex gap-6">
							{[1, 2, 3, 4].map((i) => (
								<Skeleton key={i} className="h-12 w-16" />
							))}
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
						</div>
						<Skeleton className="h-12 w-40 rounded-lg" />
					</div>
				</div>
			</div>
		</div>
	);
}

// Actor detail page skeleton
export function ActorDetailSkeleton() {
	return (
		<div className="min-h-screen">
			<div className="container py-8">
				<div className="flex flex-col md:flex-row gap-8 md:gap-12">
					{/* Photo */}
					<Skeleton className="w-48 h-48 md:w-64 md:h-64 rounded-full mx-auto md:mx-0 flex-shrink-0" />
					
					{/* Info */}
					<div className="flex-1 space-y-6 text-center md:text-left">
						<Skeleton className="h-10 w-64 mx-auto md:mx-0" />
						<div className="flex gap-6 justify-center md:justify-start">
							{[1, 2, 3].map((i) => (
								<Skeleton key={i} className="h-16 w-20" />
							))}
						</div>
						<div className="space-y-2">
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-full" />
							<Skeleton className="h-4 w-3/4" />
						</div>
					</div>
				</div>
				
				{/* Movies Grid */}
				<div className="mt-12">
					<Skeleton className="h-8 w-48 mb-6" />
					<CardGridSkeleton count={6} />
				</div>
			</div>
		</div>
	);
}

// Section skeleton for home page sections
export function SectionSkeleton({ title = true }: { title?: boolean }) {
	return (
		<div className="mb-12">
			{title && (
				<div className="flex items-center justify-between mb-6">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-8 w-24" />
				</div>
			)}
			<div className="flex gap-4 overflow-hidden">
				{Array.from({ length: 6 }).map((_, i) => (
					<div key={i} className="flex-shrink-0 w-[180px] space-y-3">
						<Skeleton className="w-full aspect-[2/3] rounded-lg" />
						<Skeleton className="h-4 w-3/4" />
						<Skeleton className="h-3 w-1/2" />
					</div>
				))}
			</div>
		</div>
	);
}

// Dashboard page skeleton
export function DashboardSkeleton() {
	return (
		<div className="py-8 px-4">
			<div className="container">
				<PageHeaderSkeleton />
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
					{[1, 2, 3, 4].map((i) => (
						<Skeleton key={i} className="h-28 rounded-xl" />
					))}
				</div>
				<CardGridSkeleton count={6} />
			</div>
		</div>
	);
}

