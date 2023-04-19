import '@/styles/globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// offset navbar height
	return (
		<header
			style={{
				backgroundImage: 'url(/assets/showcase.jpg)',
			}}
			className='bg-center bg-cover bg-no-repeat overflow-hidden h-screen'
		>
			{children}
			<div className='absolute inset-0 bg-gradient-to-b from-transparent from-35% via-dark-background via-[75%] to-dark-background'></div>
		</header>
	);
}
