'use client';

import { usePathname } from 'next/navigation';
import { MainNavItem } from '@/types';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import Heading from '@/ui/Heading';
import Dropdown from '@/ui/Dropdown';

interface mainNavProps {
	items?: MainNavItem[];
}
45
export function MainNav({ items }: mainNavProps) {
	const route = usePathname();

	return (
		<div className={cn('flex justify-start items-center')}>
			<Link href='/' className='flex relative font-bold'>
				<Heading element='h1' className='text-4xl' title='LOGO' />
			</Link>
			<div className='flex items-center gap-6 ml-20'>
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
					<Dropdown item={item} key={index} />
				))}
			</div>
		</div>
	);
}
