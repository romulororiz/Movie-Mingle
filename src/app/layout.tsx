import { Header } from '@/components/layout/Header';
import { cn } from '@/utils/cn';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	//todo fix sidebar scroll

	return (
		<html lang='en' className={(cn('bg-dark-background'), inter.className)}>
			<body className={cn('text-slate-200 bg-dark-background antialiased')}>
				<Providers>
					{/* @ts-expect-error Server Component */}
					<Header />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
