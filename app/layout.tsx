import '@/styles/globals.css';

import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Layout';
import { Providers } from '@/components';
import { Metadata } from 'next';
import { getUser } from '@/lib/supabase/session';
import { TailwindIndicator } from '@/components/ui/tailwind-indicator';
import Footer from '@/components/Layout/Footer';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		'Next.js',
		'React',
		'Tailwind CSS',
		'Server Components',
		'Server Actions',
		'Movies',
		'Tv Shows',
		'Entertainment',
	],
	authors: [
		{
			name: 'romulororiz',
			url: 'https://github.com/romulororiz',
		},
	],
	creator: 'romulororiz',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
	const user = await getUser();

	return (
		<html lang='en' className={inter.className}>
			<body
				className={cn(
					'min-h-screen dark:text-slate-200 dark:bg-dark-background antialiased'
				)}
			>
				<Providers>
					<Header user={user} />
					<main className='min-h-screen'>{children}</main>
					<Footer />
					<TailwindIndicator />
				</Providers>
			</body>
		</html>
	);
}
