import '@/styles/globals.css';

import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Layout';
import { Providers } from '@/components';
import { getCurrentUser } from '@/lib/session';
import { TailwindIndicator } from '@/components/ui/tailwind-indicator';
import Footer from '@/components/Layout/Footer';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const user = await getCurrentUser();

	return (
		<html lang='en' className={(cn('bg-dark-background'), inter.className)}>
			<body
				className={cn(
					'min-h-screen text-slate-200 bg-dark-background antialiased'
				)}
			>
				<Providers>
					<Header user={user!} />
					<main className='min-h-screen'>{children}</main>
					{/* <Footer /> */}
					<TailwindIndicator />
				</Providers>
			</body>
		</html>
	);
}
