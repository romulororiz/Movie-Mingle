import { cn } from '@/utils/cn';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Layout';
import { Providers } from '@/components';
import { getCurrentUser } from '@/lib/session';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();

	return (
		<html
			lang='en'
			className={
				(cn('bg-dark-background h-[-webkit-fill-available]'), inter.className)
			}
		>
			<body
				className={cn(
					'min-h-screen text-slate-200 bg-dark-background antialiased'
				)}
			>
				<Providers>
					{/* @ts-expect-error Server Component */}
					<Header user={user} />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
