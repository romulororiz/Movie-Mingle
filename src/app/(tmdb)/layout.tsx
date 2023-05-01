import '@/styles/globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className='pt-32 md:pt-36 max-w-7xl mx-auto'>{children}</main>;
}
