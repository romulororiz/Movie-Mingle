'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import { Heading, HeroBg, Overlay, Paragraph } from '@/components/ui';
import MovieStats, { GenreItem } from '@/components/ui/MovieStats';
import { fetchFromHandler } from '@/helpers/tmdb';
import useTMDB from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';
import { MovieDetailResponse } from '@/types/tmdb';
import { CardPerView } from '@/utils/cardPerView';
import { getIdFromSlug, slugify } from '@/utils/formaters';
import { getBackgroundImagePath, getImagePath } from '@/utils/getPath';
import { isMovieDetailResponse, isMovieResponse } from '@/utils/typeGuards';
import Image from 'next/image';

interface PageProps {
	params: {
		slug: string;
	};
}

const MovieDetailInfo = ({ item }: { item: MovieDetailResponse }) => {
	return (
		<div className='w-full flex flex-col gap-8 md:gap-6 mt-10 h-full'>
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

export async function generateStaticParams() {
	const movies = await fetchFromHandler('popular');

	if (!isMovieResponse(movies)) throw new Error('Invalid response');

	return movies.map(movie => ({
		params: {
			slug: slugify(movie.title, movie.id) as string,
		},
	}));
}

export default function MoviePage({ params }: PageProps) {
	const { slug } = params;

	const windowSize = useWindowSize();

	const movieId = getIdFromSlug(slug);

	const { movieDetail, movieRecommendations } = useTMDB(movieId, true);

	const { isLoading: movieDetailIsLoading, data: movieDetailData } =
		movieDetail;

	const { data: recommendedMoviesData, isLoading: recommendedMoviesIsLoading } =
		movieRecommendations;

	if (!isMovieDetailResponse(movieDetailData)) return null;

	// todo add loading skeleton

	return (
		<div>
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
			<section className='flex-col md:flex-row flex md:gap-6 items-center relative z-[2] container'>
				<figure>
					<Image
						src={getImagePath(movieDetailData) || ''}
						alt={movieDetailData.title}
						className='rounded-md'
						sizes='(max-width: 768px) 100vw, 50vw, 33vw'
						width={550}
						height={500}
						priority
					/>
				</figure>
				<MovieDetailInfo item={movieDetailData} />
			</section>
			<Section
				route={`/movies/${encodeURIComponent(slug)}/recommended`}
				title='You might also like'
				icon='ThumbsUp'
				className='mt-28 mb-28'
				spotlight={false}
			>
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

export const revalidate = 60 * 60 * 24; // 24 hours
