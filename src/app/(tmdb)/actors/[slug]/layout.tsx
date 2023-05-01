import '@/styles/globals.css';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className='container pt-16 max-w-7xl mx-auto'>{children}</main>;
}
