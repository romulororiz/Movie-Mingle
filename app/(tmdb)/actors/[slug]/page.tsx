'use client';

import { Card } from '@/components/Cards';
import { Section } from '@/components/Layout';
import { Heading } from '@/components/ui';
import { Biography } from '@/components/ui/Biography';
import { useActorDetail } from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';
import { cn, getAbsoluteUrl, getIdFromSlug } from '@/lib/utils';
import { isTablet } from '@/utils/breakpoints';
import { CardPerView } from '@/utils/cardPerView';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { useState } from 'react';
import { Calendar, MapPin, Film as FilmIcon } from 'lucide-react';

export default function ActorPage() {
	const [isImgLoading, setIsImgLoading] = useState(true);
	const params = useParams();
	const slug = params?.slug as string;
	const windowSize = useWindowSize();
	const actorId = getIdFromSlug(slug);
	
	const { data, isLoading } = useActorDetail(actorId);

	if (isLoading) {
		return (
			<div className="min-h-screen">
				<div className="container relative z-[2] py-12">
					<div className="flex flex-col sm:flex-row gap-10">
						<div className="w-full sm:w-[400px] h-[500px] bg-gray-800 animate-pulse rounded-md shrink-0" />
						<div className="flex-1 space-y-6">
							<div className="h-10 bg-gray-800 animate-pulse rounded w-3/4" />
							<div className="h-32 bg-gray-800 animate-pulse rounded" />
							<div className="h-24 bg-gray-800 animate-pulse rounded" />
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!data) return notFound();

	return (
		<>
			<section
				className="flex-col md:flex-row flex gap-8 md:gap-10 items-start relative z-[2] container py-12
							bg-dark-background border border-accent-primary border-opacity-30 rounded-xl"
			>
				{/* Actor Image */}
				{/* center the image */}
				<figure className="w-full md:w-auto shrink-0">
					<Image
						src={getAbsoluteUrl('https://image.tmdb.org/t/p/w780', data.profile_path)}
						alt={data.name}
						className={cn(
							'rounded-xl shadow-2xl shadow-black/50 transition-all duration-500',
							'mx-auto',
							'ring-1 ring-white/10',
							isImgLoading ? 'grayscale blur-2xl scale-105' : 'grayscale-0 blur-0 scale-100'
						)}
						sizes="(max-width: 768px) 100vw, 400px"
						width={isTablet(windowSize) ? 300 : 400}
						height={isTablet(windowSize) ? 450 : 600}
						priority
						onLoad={() => setIsImgLoading(false)}
					/>
				</figure>

				{/* Actor Info */}
				<div className="flex flex-col gap-6 md:gap-8 w-full min-w-0">
					{/* Name */}
					<div>
						<Heading
							title={data.name}
							element="h1"
							className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2"
						/>
						{data.known_for_department && (
							<p className="text-accent-primary text-lg font-medium">{data.known_for_department}</p>
						)}
					</div>

					{/* Quick Facts */}
					<div className="flex flex-wrap gap-4 md:gap-6 text-sm sm:text-base">
						{data.birthday && (
							<div className="flex items-center gap-2 text-gray-300">
								<Calendar className="w-5 h-5 text-accent-primary shrink-0" />
								<span>
									{new Date(data.birthday).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
									{data.deathday &&
										` - ${new Date(data.deathday).toLocaleDateString('en-US', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}`}
								</span>
							</div>
						)}

						{data.place_of_birth && (
							<div className="flex items-center gap-2 text-gray-300">
								<MapPin className="w-5 h-5 text-accent-primary shrink-0" />
								<span>{data.place_of_birth}</span>
							</div>
						)}

						{data.movie_credits?.cast && (
							<div className="flex items-center gap-2 text-gray-300">
								<FilmIcon className="w-5 h-5 text-accent-primary shrink-0" />
								<span>{data.movie_credits.cast.length} Credits</span>
							</div>
						)}
					</div>

					{/* Biography */}
					<div>
						<h2 className="text-xl sm:text-2xl font-bold text-white mb-4">Biography</h2>
						<Biography biography={data.biography} />
					</div>
				</div>
			</section>

			{data?.movie_credits?.cast?.length > 0 && (
				<Section
					route={`/actors/${encodeURIComponent(slug)}/movies`}
					title={`Filmography`}
					icon="Film"
					className="mt-20 mb-28"
				>
					{data?.movie_credits?.cast
						.map((movie) => <Card key={`movie-${movie.id}`} item={movie} />)
						.sort((a, b) => b.props.item.popularity - a.props.item.popularity)
						.slice(0, CardPerView(windowSize, { isActor: false, isMovie: true }))}
				</Section>
			)}
		</>
	);
}
