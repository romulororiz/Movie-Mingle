'use client';

import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';

import { Icon } from '@/components/Icon';
import { Heading } from '@/components/ui';
import { cn } from '@/lib/utils';
import { MainNavItem, NavItem } from '@/types';
import { isTablet } from '@/utils/breakpoints';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserNavMobile } from './UserAccountNav';

import { Separator } from '@/components/ui/Separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from '@/components/ui/Sheet';

interface HamburgerMenuProps {
	isOpen: boolean;
	iconName: string;
	openModal?: () => void;
	closeModal?: () => void;
}

// terminal to clean cache  npm cache clean --force

export function HamburgerMenu({
	isOpen,
	openModal,
	closeModal,
	iconName,
}: HamburgerMenuProps) {
	return (
		<button
			type='button'
			className='cursor-pointer flex items-center justify-center'
			onClick={isOpen ? closeModal : openModal}
		>
			<span className='sr-only'>{isOpen ? 'Close menu' : 'Open menu'}</span>
			<Icon name={iconName} size={30} />
		</button>
	);
}

interface MobileNavProps {
	user: User;
	items: MainNavItem[];
}

export default function MobileNav({ user, items }: MobileNavProps) {
	const [isOpen, setIsOpen] = useState<boolean>(true);

	const router = useRouter();

	const windowSize = useWindowSize();

	useEffect(() => {
		if (!isTablet(windowSize) && isOpen) {
			setIsOpen(false);
		}
	}, [windowSize, isOpen]);

	function closeModal() {
		setIsOpen(false);
	}

	const handleLogout = (navItem: NavItem) => {
		closeModal();

		if (navItem.isLogout) {
			signOut({
				callbackUrl: `${window.location.origin}`,
			});
		} else {
			router.push(navItem.href);
		}
	};

	const generateSeparator = (index: number, length: number) => {
		if (index < length - 1) {
			return (
				<Separator
					key={index}
					className='my-8 bg-gray-200/10 dark:bg-gray-700'
				/>
			);
		}
	};

	return (
		<Sheet>
			<SheetTrigger>
				<Icon name='Menu' size={30} />
			</SheetTrigger>
			<SheetContent className='bg-dark-background z-[100] border-l-transparent w-80 p-8 overflow-auto'>
				<SheetHeader>
					<SheetTitle className='flex items-center justify-between mb-10'>
						<Link href='/'>
							<Heading
								element='h1'
								title='LOGO'
								size='lg'
								className='text-accent-primary'
							/>
						</Link>
					</SheetTitle>

					{user && (
						<div className='text-left'>
							<UserNavMobile user={user} />
							<Separator className='mt-10 mb-3 bg-gray-200/10 dark:bg-gray-700' />
						</div>
					)}

					{items.map((itemSection, itemSectionIndex) => (
						<nav
							className='grid grid-flow-row auto-rows-max'
							key={itemSectionIndex}
						>
							{(itemSection.requiresAuth && !user) ||
							itemSection.section === 'Home' ? null : (
								<div className='flex gap-2 items-center'>
									<Heading
										element='h2'
										title={itemSection.section}
										size='md'
										className='text-accent-primary'
									/>
								</div>
							)}
							<div className='mt-2'>
								{(itemSection.requiresAuth && !user) ||
								itemSection.section === 'Home'
									? null
									: itemSection.navItems.map((navItem, navItemIndex) => (
											<Link
												key={navItemIndex}
												href={navItem.href}
												onClick={() => handleLogout(navItem)}
												className={cn(
													'flex w-full items-center py-2 px-4 text-md font-medium transition hover:text-accent-primary'
												)}
											>
												<div className='flex gap-2 items-center'>
													<Icon name={navItem.icon} size={16} />
													{navItem.title}
												</div>
											</Link>
									  ))}
							</div>
							{user &&
								itemSection.section !== 'Home' &&
								generateSeparator(itemSectionIndex, items.length)}
						</nav>
					))}
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
}
