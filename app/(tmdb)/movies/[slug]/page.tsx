'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import { Heading, HeroBg, Overlay, Paragraph } from '@/components/ui';
import MovieStats, { GenreItem, stats } from '@/components/ui/MovieStats';
import { useMovieDetail } from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';
import { cn, getAbsoluteUrl, getIdFromSlug } from '@/lib/utils';
import { MovieDetailResponse } from '@/types/tmdb';
import { isTablet } from '@/utils/breakpoints';
import { CardPerView } from '@/utils/cardPerView';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Fragment, useState } from 'react';

interface PageProps {
	params: {
		slug: string;
	};
}

const MovieDetailInfo = ({ item }: { item: MovieDetailResponse }) => {
	return (
		<div className='w-full flex flex-col gap-5 md:gap-6 mt-4 h-full'>
			<Heading
				element='h1'
				title={item.title}
				className='text-accent-primary flex text-md md:text-2xl justify-center md:justify-start w-full text-center md:text-left uppercase'
			/>

			<GenreItem item={item} />

			<MovieStats item={item} />

			<div className='w-full'>
				<Paragraph className='text-center md:text-left max-w-none text-sm md:text-base'>
					{item.overview}
				</Paragraph>
			</div>
		</div>
	);
};

export default function MoviePage({ params }: PageProps) {
	const [isImgLoading, setIsImgLoading] = useState(true);

	const { slug } = params;

	const windowSize = useWindowSize();

	const movieId = getIdFromSlug(slug);

	const { data, isLoading } = useMovieDetail(movieId);

	if (isLoading) return;

	if (!data) return notFound();

	return (
		<div className='min-h-screen'>
			<section className='absolute top-0 left-0 right-0 mx-auto w-full md:min-h-screen'>
				<HeroBg
					imageKey={`movie-${movieId}`}
					isLocalAsset={true}
					src={getAbsoluteUrl(
						'https://image.tmdb.org/t/p/w500',
						data.backdrop_path
					)}
					isSlider={false}
					className='md:bg-center relative -top-4 blur-sm'
				/>
				<Overlay
					className='bg-gradient-to-b from-dark-background/60 from-35%
				via-dark-background via-85% to-dark-background'
				/>
			</section>
			<section className='flex-col md:flex-row flex md:gap-10 space-y-0 items-center md:items-start relative z-[2] container'>
				<figure className='mb-6 md:mb-0'>
					<Fragment key={data.id}>
						<Image
							src={getAbsoluteUrl(
								'https://image.tmdb.org/t/p/w500',
								data.poster_path
							)}
							alt={data.title}
							className={cn(
								'rounded-md transition',
								isImgLoading
									? 'grayscale blur-2xl scale-105 duration-200'
									: 'grayscale-0 blur-0 scale-100 duration-200'
							)}
							sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
							width={isTablet(windowSize) ? 240 : 400}
							height={isTablet(windowSize) ? 360 : 600}
							priority
							onLoadingComplete={() => setIsImgLoading(false)}
						/>
					</Fragment>
				</figure>

				<MovieDetailInfo item={data} />
			</section>

			{data?.credits?.cast.length! > 0 && (
				<Section
					route='#'
					title='Cast'
					icon='Users'
					isActor={true}
					seeMore={false}
					className='mt-14 mb-28'
				>
					{data.credits.cast
						.map(actor => (
							<Card key={`actor-${actor.id}`} item={actor} ratings={false} />
						))
						.slice(
							0,
							CardPerView(windowSize, { isActor: true, isMovie: false })
						)}
				</Section>
			)}

			{data?.similar?.results?.length! > 0 && (
				<Section
					route={`/movies/${encodeURIComponent(slug)}/similar`}
					title='More like this'
					icon='ThumbsUp'
					className='mb-28'
				>
					{!isLoading ? (
						data?.similar
							?.results!.map(movie => (
								<Card key={`movie-${movie.id}`} item={movie} />
							))
							.slice(
								0,
								CardPerView(windowSize, { isActor: false, isMovie: true })
							)
					) : (
						<RenderSkeletonCards
							isActor={false}
							isMovie={true}
							isCardSlider={false}
						/>
					)}
				</Section>
			)}

			{data?.recommendations?.results?.length! > 0 && (
				<Section
					route={`/movies/${encodeURIComponent(slug)}/recommended`}
					title='You might also like'
					icon='ThumbsUp'
					className='mb-28'
				>
					{!isLoading ? (
						data?.recommendations
							?.results!.map(movie => (
								<Card key={`movie-${movie.id}`} item={movie} />
							))
							.slice(
								0,
								CardPerView(windowSize, { isActor: false, isMovie: true })
							)
					) : (
						<RenderSkeletonCards
							isActor={false}
							isMovie={true}
							isCardSlider={false}
						/>
					)}
				</Section>
			)}
		</div>
	);
}
