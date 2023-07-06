'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Icon } from '@/components/Icon';
import { Section } from '@/components/Layout';
import { Heading, HeroBg, Overlay, Paragraph } from '@/components/ui';
import { useActorDetail } from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';
import { cn, getAbsoluteUrl, getIdFromSlug } from '@/lib/utils';
import { isMobile } from '@/utils/breakpoints';
import { CardPerView } from '@/utils/cardPerView';
import { Collapse } from '@mui/material';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useState } from 'react';

interface PageProps {
	params: {
		slug: string;
	};
}

export default function ActorPage({ params }: PageProps) {
	const [isImgLoading, setIsImgLoading] = useState(true);
	const [isCollapseOpen, setIsCollapseOpen] = useState(false);

	const { slug } = params;

	const windowSize = useWindowSize();

	const actorId = getIdFromSlug(slug);

	const { data, isLoading } = useActorDetail(actorId);

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	return (
		<div>
			<section className='absolute inset-0 mx-auto w-full h-screen'>
				<HeroBg
					imageKey={`movie-${actorId}`}
					isLocalAsset={true}
					src='/assets/showcase.jpg'
					isSlider={false}
					className='md:bg-center h-auto'
				/>
				<Overlay
					className='bg-gradient-to-b from-dark-background/10 from-35%
				via-dark-background via-85% to-dark-background'
				/>
			</section>
			<section className='flex-col sm:flex-row flex gap-x-10 gap-y-5 items-center sm:items-start relative z-[2] container'>
				<figure>
					<Image
						src={getAbsoluteUrl(
							'https://image.tmdb.org/t/p/w780',
							data.profile_path
						)}
						alt={data.name}
						className={cn(
							'rounded-md transition',
							isImgLoading
								? 'grayscale blur-2xl scale-105 duration-200'
								: 'grayscale-0 blur-0 scale-100 duration-200'
						)}
						sizes='(max-width: 768px) 100vw, 50vw, 33vw'
						width={isMobile(windowSize) ? 300 : 500}
						height={500}
						priority
						onLoadingComplete={() => setIsImgLoading(false)}
					/>
				</figure>
				<div className='flex flex-col gap-5 w-full'>
					<Heading
						title={data.name}
						element='h1'
						className='text-2xl xs:text-3xl font-bold text-slate-100 justify-center sm:justify-start'
					></Heading>

					<div className='flex w-full relative'>
						<Collapse
							in={isCollapseOpen}
							collapsedSize={350}
							timeout={400}
							easing='ease-in-out'
						>
							<Paragraph className='text-slate-300 text-[15px] sm:text-base prose text-center sm:text-justify max-w-full'>
								{data.biography}
							</Paragraph>
						</Collapse>
						<div
							className='w-fit rounded-md bg-accent-primary absolute -bottom-14 inset-x-0 mx-auto cursor-pointer hover:scale-105 duration-300'
							onClick={() => setIsCollapseOpen(prev => !prev)}
						>
							<Icon
								name='ChevronDown'
								color='#030e13'
								className={cn('transition', isCollapseOpen ? 'rotate-180' : '')}
								size={isMobile(windowSize) ? 25 : 30}
							/>
						</div>
					</div>
				</div>
			</section>
			<br />
			<Section
				route={`/actors/${encodeURIComponent(slug)}/movies`}
				title={`Movies ${data.gender === 1 ? 'she' : 'he'}'s been in`}
				icon='Film'
				className='mt-20 mb-28'
				spotlight={false}
			>
				{!isLoading ? (
					data?.movie_credits?.cast
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
