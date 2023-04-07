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
		<nav className='w-20 md:w-52 h-screen bg-red-400 text-white'>
			<div className='flex flex-col items-center justify-start h-full  pt-6 gap-12'>
				<Link href='/'>LOGO</Link>
				<div className='flex flex-col w-full gap-4'>
					{navItems.map(item => (
						<Link
							href={item.href}
							key={item.name}
							className='p-3 w-full text-center'
						>
							{item.name}
						</Link>
					))}
				</div>
			</div>
		</nav>
	);
};
