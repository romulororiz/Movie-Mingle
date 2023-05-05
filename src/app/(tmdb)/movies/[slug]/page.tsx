'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import { Avatar, Heading, HeroBg, Overlay, Paragraph } from '@/components/ui';
import { AvatarImage } from '@/components/ui/Avatar';
import MovieStats, { GenreItem } from '@/components/ui/MovieStats';
import useTMDB from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';
import { CastResponse, MovieDetailResponse } from '@/types/tmdb';
import { CardPerView } from '@/utils/cardPerView';
import { cn } from '@/utils/cn';
import { getIdFromSlug } from '@/utils/formaters';
import { getBackgroundImagePath, getImagePath } from '@/utils/getPath';
import { isMovieDetailResponse } from '@/utils/typeGuards';
import Image from 'next/image';
import { Fragment, useState } from 'react';

export const revalidate = 60 * 60 * 60; // 1 hour

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
						<figure key={index} className='relative grow-0 w-44 h-64 group cursor-pointer'>
							<Image
								src={getImagePath(item) || ''}
								alt={item.name}
								fill
								sizes='(max-width: 768px) 100vw, 50vw, 33vw'
								className='rounded-md'
							/>
							<Overlay className='rounded-md bg-dark-background bg-opacity-20' />
							<figcaption className='absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center py-2'>
								<Paragraph className='text-center text-sm md:text-sm lg:text-sm xl:text-sm'>
									{item.name}
								</Paragraph>
								<Paragraph className='text-center text-sm md:text-sm lg:text-sm xl:text-sm'>
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
	const [isImgLoading, setIsImgLoading] = useState(true);
	const { slug } = params;

	const windowSize = useWindowSize();

	const movieId = getIdFromSlug(slug);

	const { movieDetail, movieRecommendations, movieCredits } = useTMDB(movieId, {
		fetchMovieDetail: true,
		fetchRecommendations: true,
		fetchMovieCredits: true,
	});

	const { isLoading: movieDetailIsLoading, data: movieDetailData } =
		movieDetail;

	const { data: recommendedMoviesData, isLoading: recommendedMoviesIsLoading } =
		movieRecommendations;

	const { data: movieCreditsData, isLoading: movieCreditsIsLoading } =
		movieCredits;

	console.log(movieCreditsData);

	// todo add loading state
	if (movieDetailIsLoading) return 'loading';

	if (!isMovieDetailResponse(movieDetailData)) return null;

	return (
		<div className='min-h-screen'>
			<section className='absolute top-0 left-0 right-0 mx-auto w-full h-screen'>
				<HeroBg
					imageKey={`movie-${movieId}`}
					src={getBackgroundImagePath(movieDetailData)?.backgroundImage || ''}
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
					<Fragment key={movieDetailData.id}>
						<Image
							src={getImagePath(movieDetailData) || ''}
							alt={movieDetailData.title}
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
							onLoadingComplete={() => setIsImgLoading(false)}
						/>
					</Fragment>
				</figure>

				<div className='flex flex-col gap-4'>
					<MovieDetailInfo item={movieDetailData} />
				</div>
			</section>

			{movieCreditsData && (
				<section className='container relative z-[2] mt-10'>
					<CastSection item={movieCreditsData.cast} />
				</section>
			)}

			<Section
				route={`/movies/${encodeURIComponent(slug)}/recommended`}
				title='You might also like'
				icon='ThumbsUp'
				className='mt-20 mb-28'
				spotlight={false}
			>
				{/* //todo fix !data.length */}
				{!recommendedMoviesIsLoading ? (
					recommendedMoviesData
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
