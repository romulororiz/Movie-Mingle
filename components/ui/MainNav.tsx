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

interface MainNavProps {
	items?: MainNavItem[];
}
45;
export default function MainNav({ items }: MainNavProps) {
	return (
		<NavigationMenu className='hidden md:block'>
			<NavigationMenuList>
				{items?.map((mainNavItem, i) => (
					<NavigationMenuItem key={i}>
						<NavigationMenuTrigger>{mainNavItem.section.toUpperCase()}</NavigationMenuTrigger>
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
