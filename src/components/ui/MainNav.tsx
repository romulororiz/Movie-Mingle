'use client';

import { cn } from '@/utils/cn';
import { Button, Heading } from '@/components/ui';
import { Dropdown } from '@/components/ui/Dropdown';
import { MainNavItem } from '@/types';
import { usePathname } from 'next/navigation';

import Link from 'next/link';
import useScrollPosition from '@/hooks/useScrollPosition';

const HeaderNavLink = ({
	href,
	title,
	className,
}: {
	key: number;
	href: string;
	title: string;
	className?: string;
}) => {
	const { isScrolled } = useScrollPosition();

	const route = usePathname();

	const isActiveRoute = route === href;

	return (
		<Link href={href}>
			<Button
				variant='link'
				className={cn(
					'transition-all font-bold pt-[2px] md:text-sm lg:text-md p-0 rounded-none',
					className,
					{
						'md:text-[10px] lg:text-[12px]': isScrolled,
						'text-accent-primary': isActiveRoute,
					}
				)}
			>
				{title.toUpperCase()}
			</Button>
		</Link>
	);
};

interface MainNavProps {
	items?: MainNavItem[];
}
45;
export default function MainNav({ items }: MainNavProps) {
	return (
		<div className={cn('flex md:justify-center md:items-center')}>
			<div className='hidden md:flex md:items-center space-x-6'>
				{items?.map(
					mainNavItem =>
						!mainNavItem.requiresAuth &&
						mainNavItem.navItems.map((item, index) => (
							<HeaderNavLink key={index} href={item.href} title={item.title} />
						))
				)}
			</div>
		</div>
	);
}
