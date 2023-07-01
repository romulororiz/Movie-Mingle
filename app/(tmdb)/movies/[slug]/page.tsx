'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import { Heading, HeroBg, Overlay, Paragraph } from '@/components/ui';
import MovieStats, { GenreItem } from '@/components/ui/MovieStats';
import { useMovieDetail } from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';
import { CastResponse, MovieDetailResponse } from '@/types/tmdb';
import { CardPerView } from '@/utils/cardPerView';
import { cn } from '@/utils/cn';
import { getIdFromSlug } from '@/utils/formaters';
import { getBackgroundImagePath, getImagePath } from '@/utils/getPath';
import { isMovieDetailResponse } from '@/utils/typeGuards';
import Image from 'next/image';
import { Fragment } from 'react';

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

const CastSection = ({ item }: { item: CastResponse[] }) => {
	return (
		<div className='flex flex-col gap-3 items-center md:items-start'>
			<Heading
				element='h1'
				title='Cast'
				size='lg'
				className='text-accent-primary text-center md:text-left'
			/>

			<div className='flex flex-wrap gap-3 justify-center md:justify-start'>
				{item
					.map((item, index) => (
						<figure
							key={index}
							className='relative grow-0 w-44 h-64 group cursor-pointer'
						>
							<Image
								src={getImagePath(item) || ''}
								alt={item.name}
								fill
								sizes='(max-width: 768px) 100vw, 50vw, 33vw'
								className='rounded-md'
							/>
							<Overlay className='rounded-md bg-dark-background bg-opacity-20' />
							<figcaption className='absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center py-2'>
								<Paragraph className='text-center text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm'>
									{item.name}
								</Paragraph>
								<Paragraph className='text-center text-sm sm:text-sm md:text-sm lg:text-sm xl:text-sm'>
									{item.character}
								</Paragraph>
							</figcaption>
						</figure>
					))
					.slice(0, 6)}
			</div>
		</div>
	);
};

export default function MoviePage({ params }: PageProps) {
	const { slug } = params;

	const windowSize = useWindowSize();

	const movieId = getIdFromSlug(slug);

	const { data, isLoading } = useMovieDetail(movieId);

	// todo add loading state
	if (isLoading) return 'loading';

	if (!isMovieDetailResponse(data)) return null;

	return (
		<div className='min-h-screen'>
			<section className='absolute top-0 left-0 right-0 mx-auto w-full h-screen'>
				<HeroBg
					imageKey={`movie-${movieId}`}
					src={getBackgroundImagePath(data)?.backgroundImage || ''}
					isSlider={false}
					className='md:bg-center h-auto'
				/>
				<Overlay
					className='bg-gradient-to-b from-dark-background/90 from-35%
				via-dark-background via-85% to-dark-background'
				/>
			</section>
			<section className='flex-col md:flex-row flex md:gap-10 items-center relative z-[2] container'>
				<figure>
					<Fragment key={data.id}>
						<Image
							src={getImagePath(data) || ''}
							alt={data.title}
							className={cn(
								'rounded-md ease-in-out duration-300'
								// isImgLoading
								// 	? 'grayscale blur-2xl scale-110'
								// 	: 'grayscale-0 blur-0 scale-100'
							)}
							sizes='(max-width: 768px) 100vw, 50vw, 33vw'
							width={460}
							height={500}
							priority
						/>
					</Fragment>
				</figure>

				<div className='flex flex-col gap-4'>
					<MovieDetailInfo item={data} />
				</div>
			</section>

			{data.credits.cast && (
				<section className='container relative z-[2] mt-10'>
					<CastSection item={data.credits.cast} />
				</section>
			)}

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
						.map(movie => (
							<div key={movie.id}>
								<Card item={movie} />
							</div>
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
		</div>
	);
}
