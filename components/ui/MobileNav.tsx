'use client';

import useWindowSize from '@/hooks/useWindowSize';
import Image from 'next/image';
import Link from 'next/link';

import { Icon } from '@/components/Icon';
import { Heading, SignInButton } from '@/components/ui';
import { cn } from '@/lib/utils';
import { MainNavItem, NavItem } from '@/types';
import { isTablet } from '@/utils/breakpoints';
import { User } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserNavMobile } from './UserAccountNav';

import { Separator } from '@/components/ui/Separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/Sheet';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion';
import { socialLinks } from '@/config/footer';

interface MobileNavProps {
	user: User;
	items: MainNavItem[];
}

export default function MobileNav({ user, items }: MobileNavProps) {
	const handleSignOut = () => {
		signOut({
			callbackUrl: `${window.location.origin}`,
		});
	};

	const handleSignIn = async () => {
		try {
			await signIn('google');
		} catch (error) {
			// toast({
			// 	title: 'Error signing in',
			// 	message: 'Please try again later.',
			// 	type: 'error',
			// });
		}
	};

	return (
		<Sheet>
			<SheetTrigger>
				<Icon name='Menu' size={30} />
			</SheetTrigger>
			<SheetContent
				side='left'
				className='bg-dark-background z-[100] border-transparent w-80 p-8 overflow-auto'
			>
				<SheetHeader>
					<SheetTitle className='flex items-center justify-between mb-10'>
						<div className='flex-shrink-0'>
							<Link href='/'>
								<Image
									src='/assets/logo.svg'
									width={110}
									height={100}
									alt='logo'
									className='transition-all duration-200'
									priority
								/>
							</Link>
						</div>
					</SheetTitle>

					{user && (
						<div className='text-left'>
							<UserNavMobile user={user} />
							<Separator className='mt-10 mb-3 bg-gray-200/10 dark:bg-gray-700' />
						</div>
					)}
					<Accordion type='single' collapsible>
						{items.map((itemSection, itemSectionIndex) => (
							<AccordionItem
								value={`item-${itemSectionIndex}`}
								key={itemSectionIndex}
							>
								<AccordionTrigger className='flex justify-start'>
									<div className='flex-1 flex items-center'>
										<Icon
											name={itemSection.icon || ''}
											size={20}
											className='mr-2'
										/>
										<Heading
											element='h2'
											title={itemSection.section}
											size='md'
										/>
									</div>
								</AccordionTrigger>
								<AccordionContent>
									{itemSection.navItems.map((navItem, navItemIndex) => (
										<Link
											key={navItemIndex}
											href={navItem.href}
											className={cn(
												'flex w-full items-center py-2 px-4 text-md font-medium transition hover:text-accent-primary'
											)}
										>
											<div className='flex gap-2 items-center text-base'>
												<Icon name={navItem.icon} size={16} />
												{navItem.title}
											</div>
										</Link>
									))}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</SheetHeader>
				<div className='flex flex-col gap-5 mx-auto justify-center absolute bottom-3 left-[50%] -translate-x-[50%]'>
					<div className='justify-center flex'>
						<Icon
							name={user ? 'LogOut' : 'LogIn'}
							size={32}
							className='stroke-dark-background bg-accent-primary rounded-full p-2'
							onClick={user ? handleSignOut : handleSignIn}
						/>
					</div>
					<div className='flex gap-5 items-center'>
						{socialLinks.map((link, i) => (
							<a
								key={i}
								href={link.url}
								target='_blank'
								rel='noopener noreferrer'
								className=''
							>
								<Icon
									name={link.name}
									className='transition-all duration-200 hover:stroke-accent-secondary'
								/>
							</a>
						))}
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}
