import { HeroBg, Overlay } from '@/components/ui';

interface TmdbLayoutProps {
	children: React.ReactNode;
}

export default function SharedLayout({ children }: TmdbLayoutProps) {
	return (
		<section className='min-h-screen'>
			<HeroBg
				imageKey='showcase'
				isLocalAsset={true}
				src='/assets/showcase.jpg'
				isSlider={false}
				className='md:bg-center h-auto'
			/>
			<main className='pt-28 md:pt-36 mb-28 max-w-7xl mx-auto'>{children}</main>
			<Overlay
				className='bg-gradient-to-b from-dark-background/40 from-35%
			via-dark-background via-85% to-dark-background'
			/>
		</section>
	);
}
