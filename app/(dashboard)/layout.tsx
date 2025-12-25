import { HeroBg, Overlay } from '@/components/ui';
import { Header } from '@/components/Layout';
import Footer from '@/components/Layout/Footer';
import { getUser } from '@/lib/supabase/session';

interface TmdbLayoutProps {
	children: React.ReactNode;
}

export default async function DashboardLayout({ children }: TmdbLayoutProps) {
	const user = await getUser();

	return (
		<div className="min-h-screen flex flex-col">
			<Header user={user} />
			<section className="relative flex-1">
			<HeroBg
					imageKey="showcase"
				isLocalAsset={true}
					src="/assets/showcase.jpg"
				isSlider={false}
					className="md:bg-center h-auto"
			/>
			<Overlay
					className="bg-gradient-to-b from-dark-background/80 from-35%
				via-dark-background via-85% to-dark-background z-[1]"
			/>
				<main className="relative z-[2] pt-24 pb-12 max-w-7xl mx-auto">{children}</main>
		</section>
			<Footer />
		</div>
	);
}
