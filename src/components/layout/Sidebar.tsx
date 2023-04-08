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

export const Sidebar = async () => {
	return (
		<nav className='fixed top-0 left-0 right-0 z-[70] w-20 md:w-60 h-screen bg-[#000]/75 border-r border-r-accent-default/50 text-white'>
			<div className='flex flex-col items-center justify-between h-full pt-8'>
				<div className='container px-6 flex flex-col gap-8 w-full'>
					<Link href='/'>LOGO</Link>
					<div className='flex flex-col gap-4 w-full'>
						{navItems.map(item => (
							<Link
								href={item.href}
								key={item.name}
								className='w-full text-left hover:text-accent-default hover:underline underline-offset-2 py-2'>
								{item.name}
							</Link>
						))}
					</div>
				</div>
				<h1 className='hidden sm:flex mb-8'>Search Input</h1>
			</div>
		</nav>
	);
};
