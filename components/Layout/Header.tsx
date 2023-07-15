'use client';

import Image from 'next/image';
import Link from 'next/link';
import useScrollPosition from '@/hooks/useScrollPosition';
import { useState } from 'react';
import { headerConfig } from '@/config/header';
import { cn } from '@/lib/utils';
import { User } from 'next-auth';
import { Icon } from '@/components/Icon';

import {
	Input,
	MainNav,
	MobileNav,
	SignInButton,
	UserNav,
} from '@/components/ui';

import {
	Command,
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from '@/components/ui/Command';
import Combobox from '../ui/Combobox';
interface HeaderProps {
	// pick the properties you want to use
	user: User;
}

export const Header = ({ user }: HeaderProps) => {
	const [showSearch, setShowSearch] = useState(false);

	const { isScrolled } = useScrollPosition();

	return (
		<>
			<header
				className={cn(
					'transition-all duration-200 fixed h-20 top-0 left-0 w-full flex z-[100]',
					isScrolled
						? 'bg-dark-background/80 backdrop-blur-md'
						: 'bg-dark-background/80 md:bg-transparent'
				)}
			>
				<div className='container max-w-7xl flex flex-row-reverse md:flex-row justify-between items-center'>
					<div className='flex md:hidden'>
						<Combobox />
					</div>
					<div className='shrink-0'>
						<Link href='/'>
							<Image
								src='/assets/logo.svg'
								width={isScrolled ? 130 : 155}
								height={100}
								alt='logo'
								className='transition-all duration-200'
								priority
							/>
						</Link>
					</div>

					<div className='hidden md:flex md:justify-center md:items-center md:gap-3'>
						<MainNav items={headerConfig.mainNav} scrolled={isScrolled} />
						<Combobox />
					</div>

					<div className='hidden md:flex justify-end'>
						{user ? (
							<UserNav
								items={headerConfig.userNav}
								user={{
									name: user.name!,
									image: user.image!,
									email: user.email!,
								}}
							/>
						) : (
							<SignInButton />
						)}
					</div>
					<div className='flex md:hidden'>
						<MobileNav user={user} items={headerConfig.mainNav} />
					</div>
				</div>
			</header>
		</>
	);
};
