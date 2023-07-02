'use client';

import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui';
import { MainNavItem } from '@/types';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';
import Link, { LinkProps } from 'next/link';

import useScrollPosition from '@/hooks/useScrollPosition';

interface HeaderNavLinkProps extends HTMLAttributes<LinkProps> {
	href: string;
	title: string;
	className?: string;
}

const HeaderNavLink = ({ href, title, className }: HeaderNavLinkProps) => {
	const { isScrolled } = useScrollPosition();

	const route = usePathname();

	const isActiveRoute = route === href;

	return (
		<Link href={href}>
			<Heading
				element='h2'
				title={title}
				className={cn(
					'transition-all hover:text-accent-secondary uppercase font-semibold md:text-[12px] lg:text-[14px]',
					className,
					{
						'md:text-[10px] lg:text-[12px]': isScrolled,
						'text-accent-primary': isActiveRoute,
					}
				)}
			/>
		</Link>
	);
};

interface MainNavProps {
	items?: MainNavItem[];
}
45;
export default function MainNav({ items }: MainNavProps) {
	return (
		<div className={cn('hidden md:flex md:justify-center md:items-center')}>
			<div className='hidden md:flex md:items-center space-x-3'>
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
