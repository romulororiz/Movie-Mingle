'use client';

import { useAppState } from '@/context/stateContext';
import { cn } from '@/utils/cn';
import Link from 'next/link';

export const Sidebar = () => {
	const { sidebarOpen, setSidebarOpen } = useAppState();

	return (
		<aside
			className={cn(
				'transition duration-200 ease-linear fixed top-0 z-[70] w-64 h-screen bg-black backdrop-blur-lg shadow-dark-background shadow-md hidden md:block'
			)}
		>
			{/* //todo burger menu */}
			{/* create component */}
			<div>
				<button
					type='button'
					onClick={() => {
						setSidebarOpen(!sidebarOpen);
					}}
					className='flex absolute top-2 -right-14 items-center justify-center w-12 h-12 text-white bg-accent-default rounded-full'
				></button>
			</div>

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
					<ul className='flex flex-col gap-4'>
						<li>
							<Link href='/'>Home</Link>
						</li>
						<li>
							<Link href='/'>Movies</Link>
						</li>
						<li>
							<Link href='/'>People</Link>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	);
};
