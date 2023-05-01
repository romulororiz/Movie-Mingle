import { cn } from '@/utils/cn';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Layout';
import { Providers } from '@/components';
import { getCurrentUser } from '@/lib/session';

import '@/styles/globals.css';
import Footer from '@/components/Layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();

	return (
		<html lang='en' className={(cn('bg-dark-background'), inter.className)}>
			<body
				className={cn(
					'min-h-screen text-slate-200 bg-dark-background antialiased'
				)}
			>
				<Providers>
					{/* @ts-expect-error Server Component */}
					<Header user={user} />
					<main className='min-h-screen'>{children}</main>
					{/* <Footer /> */}
				</Providers>
			</body>
		</html>
	);
}
