import { Header } from '@/components/Header';
import { cn } from '@/utils/cn';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import { getSession } from '@/lib/session';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getSession();

	return (
		<html lang='en' className={(cn('bg-dark-background'), inter.className)}>
			<body className={cn('text-slate-200 bg-dark-background antialiased')}>
				<Providers>
					{/* @ts-expect-error Server Component */}
					<Header session={session} />
					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
