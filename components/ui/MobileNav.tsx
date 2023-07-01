'use client';

import useWindowSize from '@/hooks/useWindowSize';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import { Icon } from '@/components/Icon';
import { Heading } from '@/components/ui';
import { signOut } from 'next-auth/react';
import { isTablet } from '@/utils/breakpoints';
import { useRouter } from 'next/navigation';
import { UserNavMobile } from './UserAccountNav';
import { Dialog, Transition } from '@headlessui/react';
import { MainNavItem, NavItem } from '@/types';
import { Fragment, useEffect, useState } from 'react';
import { User } from 'next-auth';

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

	function openModal() {
		setIsOpen(true);
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
				<hr
					className='h-px my-8 bg-gray-200/10 border-0 dark:bg-gray-700'
					key={index}
				/>
			);
		}
	};

	const animateOverlay = {
		as: Fragment,
		enter: 'ease-out duration-200',
		enterFrom: 'opacity-0',
		enterTo: 'opacity-100',
		leave: 'ease-in  duration-200',
		leaveFrom: 'opacity-100',
		leaveTo: 'opacity-0',
	};

	const animateSidePanel = {
		as: Fragment,
		enter: 'ease-out duration-200',
		enterFrom: 'opacity-0 translate-x-[80%]',
		enterTo: 'opacity-100',
		leave: 'ease-in duration-200',
		leaveFrom: 'opacity-100',
		leaveTo: 'opacity-0 translate-x-full',
	};

	return (
		<>
			<HamburgerMenu isOpen={isOpen} openModal={openModal} iconName='Menu' />

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as='div' className='relative z-[100]' onClose={closeModal}>
					<Transition.Child {...animateOverlay}>
						<div className='fixed inset-0 bg-dark-background/90' />
					</Transition.Child>

					<div className='fixed inset-0 overflow-y-auto'>
						<div className='flex min-h-full items-center justify-end text-center'>
							<Transition.Child {...animateSidePanel}>
								<Dialog.Panel className='w-80 p-8 max-w-md min-h-screen bg-dark-background text-left align-middle shadow-lg shadow-black transform transition-all'>
									<Dialog.Title className='flex items-center justify-between mb-10'>
										<Link href='/'>
											<Heading
												element='h1'
												title='LOGO'
												size='lg'
												className='text-accent-primary'
											/>
										</Link>
										<HamburgerMenu
											isOpen={isOpen}
											closeModal={closeModal}
											iconName='Close'
										/>
									</Dialog.Title>
									{user && (
										<>
											<UserNavMobile user={user} />
											<hr className='h-px my-8 bg-gray-200/10 border-0 dark:bg-gray-700' />
										</>
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
													: itemSection.navItems.map(
															(navItem, navItemIndex) => (
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
															)
													  )}
											</div>
											{user &&
												itemSection.section !== 'Home' &&
												generateSeparator(itemSectionIndex, items.length)}
										</nav>
									))}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
