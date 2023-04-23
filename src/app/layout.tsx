import { Header } from '@/components/Header';
import Providers from '@/components/Providers';
import { getCurrentUser } from '@/lib/session';
import { cn } from '@/utils/cn';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();

	return (
		<html lang='en' className={(cn('bg-dark-background'), inter.className)}>
			<body className={cn('text-slate-200 bg-dark-background antialiased')}>
				<Providers>
					{/* @ts-expect-error Server Component */}
					<Header user={user} />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
