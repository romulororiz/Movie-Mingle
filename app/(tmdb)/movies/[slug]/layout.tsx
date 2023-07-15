import { Overlay } from "@/components/ui";

interface TmdbLayoutProps {
	children: React.ReactNode;
}

export default function SharedLayout({ children }: TmdbLayoutProps) {
	return (
		<section>
			<main className='pt-28 md:pt-36 max-w-7xl mx-auto'>{children}</main>
			<Overlay
				className='bg-gradient-to-b from-dark-background/40 from-35%
				via-dark-background via-85% to-dark-background'
			/>
		</section>
	);
}
