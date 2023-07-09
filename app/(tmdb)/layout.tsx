import { HeroBg, Overlay } from '@/components/ui';

interface TmdbLayoutProps {
	children: React.ReactNode;
}

export default function SharedLayout({ children }: TmdbLayoutProps) {
	return (
		<section>
			<main className='pt-28 md:pt-36 max-w-7xl mx-auto'>{children}</main>
		</section>
	);
}
