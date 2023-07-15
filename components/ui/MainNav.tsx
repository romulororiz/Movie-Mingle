'use client';

import { MainNavItem } from '@/types';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuListItem,
	NavigationMenuTrigger,
} from '@/components/ui/NavigationMenu';
import { cn } from '@/lib/utils';

interface MainNavProps {
	items?: MainNavItem[];
	scrolled?: boolean;
}
45;
export default function MainNav({ items, scrolled }: MainNavProps) {
	return (
		<NavigationMenu className='hidden md:flex'>
			<NavigationMenuList>
				{items?.map((mainNavItem, i) => (
					<NavigationMenuItem key={i}>
						<NavigationMenuTrigger
							className={cn(
								'transition-all duration-200 px-2',
								scrolled ? 'text-xs' : ''
							)}
						>
							{mainNavItem.section.toUpperCase()}
						</NavigationMenuTrigger>
						<NavigationMenuContent className='bg-dark-background'>
							<ul className='grid w-[400px] gap-3 p-4 md:grid-cols-2'>
								{mainNavItem.navItems.map((item, i) => (
									<NavigationMenuListItem
										key={i}
										title={item.title}
										href={item.href}
										icon={item.icon}
									>
										{item.description}
									</NavigationMenuListItem>
								))}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				))}
			</NavigationMenuList>
		</NavigationMenu>
	);
}
