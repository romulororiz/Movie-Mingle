'use client';

import Providers from '@/components/Providers';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/utils/cn';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

	// bg index for header bg image transition
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const pathname = usePathname();
	const isHome = pathname === '/';

	return (
		<html lang='en' className={(cn('bg-dark-background'), inter.className)}>
			<body
				className={cn('text-white bg-dark-background antialiased xs:scroll', {
					'no-scroll': sidebarOpen,
				})}
			>
				<Providers
					activeIndex={activeIndex}
					setActiveIndex={setActiveIndex}
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				>
					<Sidebar />

					{isHome && <Header activeIndex={activeIndex} />}

					<main>{children}</main>
				</Providers>
			</body>
		</html>
	);
}

// transition duration-300 ease-linear
