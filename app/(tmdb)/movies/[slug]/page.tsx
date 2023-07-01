'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import { Heading, HeroBg, Overlay, Paragraph } from '@/components/ui';
import MovieStats, { GenreItem } from '@/components/ui/MovieStats';
import { useMovieDetail } from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';
import { blurredPlaceholder } from '@/lib/utils';
import { MovieDetailResponse } from '@/types/tmdb';
import { CardPerView } from '@/utils/cardPerView';
import { cn } from '@/lib/utils';
import { getIdFromSlug } from '@/lib/utils';
import { getAbsoluteUrl } from '@/lib/utils';
import Image from 'next/image';
import { Fragment, useState } from 'react';

interface PageProps {
	params: {
		slug: string;
	};
}

const MovieDetailInfo = ({ item }: { item: MovieDetailResponse }) => {
	return (
		<div className='w-full flex flex-col gap-12 md:gap-6 mt-10 h-full'>
			<Heading
				element='h1'
				title={item.title}
				size='lg'
				className='text-accent-primary flex justify-center md:justify-start w-full text-center md:text-left'
			/>
			<GenreItem item={item} />
			<MovieStats item={item} />

			<div className='w-full'>
				<Paragraph className='text-center md:text-left max-w-none md:max-w-prose text-sm sm:text-sm md:text-sm lg:text-base'>
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

	if (!data) return null;

	return (
		<div className='min-h-screen'>
			<section className='absolute top-0 left-0 right-0 mx-auto w-full md:min-h-screen'>
				<HeroBg
					imageKey={`movie-${movieId}`}
					src={getAbsoluteUrl(
						'https://image.tmdb.org/t/p/w500',
						data.backdrop_path
					)}
					isSlider={false}
					className='md:bg-center relative -top-4 blur-sm'
				/>
				<Overlay
					className='bg-gradient-to-b from-dark-background/80 from-35%
				via-dark-background via-85% to-dark-background'
				/>
			</section>
			<section className='flex-col md:flex-row flex md:gap-10 items-center relative z-[2] container'>
				<figure>
					<Fragment key={data.id}>
						<Image
							src={getAbsoluteUrl(
								'https://image.tmdb.org/t/p/w780',
								data.poster_path
							)}
							alt={data.title}
							className={cn(
								'rounded-md transition',
								blurredPlaceholder(isImgLoading)
							)}
							sizes='(max-width: 768px) 100vw, 50vw, 33vw'
							width={460}
							height={500}
							onLoadingComplete={() => setIsImgLoading(false)}
						/>
					</Fragment>
				</figure>

				<div className='flex flex-col gap-4'>
					<MovieDetailInfo item={data} />
				</div>
			</section>

			<Section
				route='#'
				title='Cast'
				icon='Users'
				isActor={true}
				seeMore={false}
				spotlight={false}
				className='mt-20'
			>
				{data.credits.cast
					.map(actor => (
						<Card key={`actor-${actor.id}`} item={actor} ratings={false} />
					))
					.slice(0, CardPerView(windowSize, { isActor: true, isMovie: false }))}
			</Section>

			<Section
				route={`/movies/${encodeURIComponent(slug)}/similar`}
				title='You might also like'
				icon='ThumbsUp'
				className='mt-20 mb-28'
				spotlight={false}
			>
				{!isLoading ? (
					data.similar.results &&
					data.similar.results
						.map(movie => <Card key={`movie-${movie.id}`} item={movie} />)
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
		</div>
	);
}
