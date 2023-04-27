'use client';

import { cn } from '@/utils/cn';
import { Heading } from '@/components/ui';
import { Dropdown } from '@/components/ui/Dropdown';
import { MainNavItem } from '@/types';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import useScrollPosition from '@/hooks/useScrollPosition';

interface MainNavProps {
	items?: MainNavItem[];
}
45;
export default function MainNav({ items }: MainNavProps) {
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
						title='HOME'
						className={cn(
							'transition hover:text-primaryAccent-default font-normal pt-[2px]',
							{
								'text-primaryAccent-default': route === '/',
							}
						)}
					/>
				</Link>

				{items?.map(
					(item, index) =>
						!item.requiresAuth && (
							<Dropdown
								item={item}
								key={index}
								menuItemsClassName='bg-dark-background'
								linkActiveHoverClassName='text-primaryAccent-default'
								linkLabelActiveClassName='text-primaryAccent-default'
							/>
						)
				)}
			</div>
		</div>
	);
}
