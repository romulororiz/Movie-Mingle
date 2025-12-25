import { HeroBg, Overlay } from '@/components/ui';

interface TmdbLayoutProps {
	children: React.ReactNode;
}

export default function ActorsLayout({ children }: TmdbLayoutProps) {
	return (
		<section className='min-h-screen relative'>
			<HeroBg
				imageKey='showcase'
				isLocalAsset={true}
				src='/assets/showcase.jpg'
				isSlider={false}
				className='md:bg-center h-auto'
			/>
			<Overlay
				className='bg-gradient-to-b from-dark-background/40 from-35%
				via-dark-background via-85% to-dark-background z-[1]'
			/>
			<main className='relative z-[2] pt-28 md:pt-36 mb-28 max-w-7xl mx-auto'>{children}</main>
		</section>
	);
}
