import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

const navItems = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'About',
		href: '/about',
	},
	{
		name: 'Contact',
		href: '/contact',
	},
];

export const Sidebar = () => {
	return (
		<aside className='md:fixed md:block top-0 left-0 right-0 z-[70] w-60 h-screen bg-dark-background/75 backdrop-blur-lg shadow-dark-background shadow-md hidden'>
			<div className='container flex flex-col items-center justify-between h-full pt-8'>
				<div className='container px-6 flex flex-col gap-8 w-full'>
					{/* logo - CHANGES PENDENT */}
					<Link
						href='/'
						className='flex relative font-bold text-accent-default '
					>
						<h1 className='text-4xl'>MOVIE</h1>
						<small className='text-lg absolute right-2 -bottom-5'>Mingle</small>
					</Link>
					<ul className='flex flex-col gap-4 w-full'>
						{navItems.map(item => (
							<Link
								href={item.href}
								key={item.name}
								className='w-full text-left hover:text-accent-default hover:underline underline-offset-2 py-2'
							>
								{item.name}
							</Link>
						))}
					</ul>
				</div>
			</div>
		</aside>
	);
};
