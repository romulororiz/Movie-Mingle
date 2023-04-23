import Overlay from '@/components/ui/Overlay';
import '@/styles/globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	
	return (
		<header
			style={{
				backgroundImage: 'url(/assets/showcase.jpg)',
			}}
			className='bg-center bg-cover bg-no-repeat overflow-hidden h-screen'
		>
			<main className='container mt-16 max-w-7xl mx-auto'>{children}</main>
			<Overlay className='bg-gradient-to-b from-transparent from-35% via-dark-background via-[75%] to-dark-background' />
		</header>
	);
}
