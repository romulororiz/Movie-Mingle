import { HeroBg, Overlay } from '@/components/ui';

interface TmdbLayoutProps {
	children: React.ReactNode;
}

export default function ActorsLayout({ children }: TmdbLayoutProps) {
	return (
		<section className='absolute top-0 left-0 right-0 mx-auto w-full h-screen'>
			<HeroBg
				imageKey='showcase'
				isLocalAsset={true}
				src='/assets/showcase.jpg'
				isSlider={false}
				className='md:bg-center h-auto'
			/>
			<main className='pt-28 md:pt-36 max-w-7xl mx-auto'>{children}</main>
			<Overlay
				className='bg-gradient-to-b from-dark-background/5 from-35%
				via-dark-background via-85% to-dark-background'
			/>
		</section>
	);
}
