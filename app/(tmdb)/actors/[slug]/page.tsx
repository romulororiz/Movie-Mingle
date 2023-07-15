'use client';

import { Card } from '@/components/Cards';
import { RenderSkeletonCards } from '@/components/Cards/SkeletonCard';
import { Section } from '@/components/Layout';
import { Heading, Paragraph } from '@/components/ui';
import LoadMore from '@/components/ui/LoadMore';
import { useActorDetail } from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';
import { cn, getAbsoluteUrl, getIdFromSlug } from '@/lib/utils';
import { isTablet } from '@/utils/breakpoints';
import { CardPerView } from '@/utils/cardPerView';
import { Collapse } from '@mui/material';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface PageProps {
	params: {
		slug: string;
	};
}

export default function ActorPage({ params }: PageProps) {
	const [isImgLoading, setIsImgLoading] = useState(true);
	const [isCollapseOpen, setIsCollapseOpen] = useState(false);
	const [maxSize, setMaxSize] = useState<number>(0);

	const paragraphRef = useRef<any>(null);

	const { slug } = params;

	const windowSize = useWindowSize();

	useEffect(() => {
		if (paragraphRef.current) {
			setMaxSize(paragraphRef.current.clientHeight);
		}
	}, [paragraphRef?.current?.clientHeight]);

	const actorId = getIdFromSlug(slug);

	const { data, isLoading } = useActorDetail(actorId);

	if (isLoading) return 'loading...';

	if (!data) return notFound();

	return (
		<>
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
						width={isTablet(windowSize) ? 240 : 400}
						height={isTablet(windowSize) ? 360 : 600}
						priority
						onLoadingComplete={() => setIsImgLoading(false)}
					/>
				</figure>
				<div className='flex flex-col gap-5 w-full'>
					<Heading
						title={data.name}
						element='h1'
						className='text-2xl xs:text-3xl font-bold text-slate-100 justify-center sm:justify-start'
					/>

					<div className='flex w-full relative'>
						<Collapse
							in={isCollapseOpen}
							collapsedSize={maxSize > 200 ? 200 : maxSize}
							timeout={400}
							easing='ease-in-out'
						>
							<Paragraph
								className='text-slate-300 text-[15px] sm:text-base prose text-center sm:text-left max-w-full h-full'
								ref={paragraphRef}
							>
								{data.biography}
							</Paragraph>
						</Collapse>
						<LoadMore
							maxSized={maxSize < 200}
							setIsCollapse={setIsCollapseOpen}
							isCollapse={isCollapseOpen}
						/>
					</div>
				</div>
			</section>
			<br />
			<Section
				route={`/actors/${encodeURIComponent(slug)}/movies`}
				title={`Filmography`}
				icon='Film'
				className='mt-20 mb-28'
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
		</>
	);
}
