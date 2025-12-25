import '@/styles/globals.css';

import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import { Providers } from '@/components';
import { Metadata } from 'next';
import { TailwindIndicator } from '@/components/ui/tailwind-indicator';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

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
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					inter.className,
					'min-h-screen text-slate-200 bg-dark-background antialiased'
				)}
			>
				<Providers>
					{children}
					<TailwindIndicator />
				</Providers>
			</body>
		</html>
	);
}
