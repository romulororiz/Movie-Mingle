'use client';

import { blurData, cn } from '@/lib/utils';
import { getAbsoluteUrl } from '@/lib/utils';
import { getIdFromSlug } from '@/lib/utils';
import { HeroBg, Overlay } from '@/components/ui';
import { Fragment, useState } from 'react';

import Image from 'next/image';
import { useActorDetail } from '@/hooks/useTMDB';
import useWindowSize from '@/hooks/useWindowSize';

export const revalidate = 10; // 24 hours

interface PageProps {
	params: {
		slug: string;
	};
}

export default function ActorPage({ params }: PageProps) {
	const [isImgLoading, setIsImgLoading] = useState(true);

	const { slug } = params;

	const windowSize = useWindowSize();

	const actorId = getIdFromSlug(slug);

	const { data } = useActorDetail(actorId);

	if (!data) return null;

	return (
		<div>
			<section className='absolute top-0 left-0 right-0 mx-auto w-full h-screen'>
				<HeroBg
					imageKey={`movie-${actorId}`}
					isLocalAsset={true}
					src='/assets/showcase.jpg'
					isSlider={false}
					className='md:bg-center h-auto'
				/>
				<Overlay
					className='bg-gradient-to-b from-dark-background/60 from-35%
				via-dark-background via-85% to-dark-background'
				/>
			</section>
			<section className='flex-col md:flex-row flex md:gap-6 items-center relative z-[2] container'>
				<figure>
					<Fragment key={data.id}>
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
							width={550}
							height={500}
							placeholder='blur'
							blurDataURL={blurData}
							priority
							onLoadingComplete={() => setIsImgLoading(false)}
						/>
					</Fragment>
				</figure>
				<div className='flex flex-col gap-2 w-full'>
					<h1 className='text-4xl font-bold text-white'>{data.name}</h1>
					<p className='text-white'>{data.biography}</p>
				</div>
			</section>
		</div>
	);
}
