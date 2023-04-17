import Providers from '@/components/Providers';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/utils/cn';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import '@/styles/globals.css';
import TopHeader from '@/components/layout/TopHeader';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	//todo fix sidebar scroll

	// const pathname = usePathname();
	// const isHome = pathname === '/';

	return (
		<html lang='en' className={(cn('bg-dark-background'), inter.className)}>
			<body className={cn('text-white bg-dark-background antialiased')}>
				<Providers>
					<Sidebar />

					{/* @ts-expect-error Server Component */}
					<TopHeader />
					<Header />

					<main className='ml-0 md:ml-64'>{children}</main>
				</Providers>
			</body>
		</html>
	);
}
