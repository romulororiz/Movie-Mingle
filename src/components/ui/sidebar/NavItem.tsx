'use client';

import Icon from '@/components/Icon';
import { cn } from '@/utils/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

interface NavItemProps {
	title: string;
	icon: string;
	path: string;
	key: string;
}

const NavItem: FC<NavItemProps> = ({ title, icon, path, ...props }) => {
	const isActive = usePathname() === path;

	return (
		<Link
			href={path}
			className={cn(
				'flex items-center w-full pl-2 gap-3 transition relative hover:text-accent-default',
				{
					'after:absolute after:w-1 after:h-5 after:bg-accent-default after:-right-6 transition-all duration-300 ease-in-out':
						isActive,
				}
			)}
			{...props}
		>
			<Icon name={icon} size={18} />
			{title}
		</Link>
	);
};

export default NavItem;
