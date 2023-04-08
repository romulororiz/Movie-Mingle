import Providers from '@/components/Providers';
import { cn } from '@/utils/cn';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={(cn('bg-dark-background'), inter.className)}>
			<body className='min-h-screen bg-dark-background antialiased'>
				<Providers>
					<div className='flex flex-row-reverse'>
						{/* <Sidebar /> */}
						<div className='flex flex-col text-white w-full'>
							{/* @ts-expect-error Server Component */}
							<Header />
							<main>{children}</main>
						</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
