'use client';

import { usePathname } from 'next/navigation';
import { MainNavItem } from '@/types';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import Heading from '@/ui/Heading';
import Dropdown from '@/ui/Dropdown';
import useScrollPosition from '@/hooks/useScrollPosition';

interface MainNavProps {
	items?: MainNavItem[];
}
45;
export function MainNav({ items }: MainNavProps) {

	const { isScrolled } = useScrollPosition();

	const route = usePathname();

	return (
		<div className={cn('flex justify-between md:justify-start items-center')}>
			{isScrolled && (
				<Link href='/'>
					<Heading
						element='h1'
						className='md:hidden font-bold text-3xl text-primaryAccent-default'
						title='LOGO'
					/>
				</Link>
			)}

			<Link href='/'>
				<Heading
					element='h1'
					className='hidden md:block font-bold text-3xl text-primaryAccent-default'
					title='LOGO'
				/>
			</Link>
			<div className='hidden md:flex md:items-center md:gap-6 md:ml-20'>
				<Link href='/'>
					<Heading
						element='h2'
						size='small'
						title={'HOME'}
						className={cn(
							'transition hover:text-primaryAccent-default font-normal pt-[2px]',
							{
								'text-primaryAccent-default': route === '/',
							}
						)}
					/>
				</Link>
				{items?.map((item, index) => (
					<Dropdown
						item={item}
						key={index}
						menuItemsClassName='bg-dark-background'
						linkActiveHoverClassName='text-primaryAccent-default'
						linkLabelActiveClassName='text-primaryAccent-default'
					/>
				))}
			</div>
		</div>
	);
}
