'use client';

import {
	Input,
	MainNav,
	MobileNav,
	SignInButton,
	UserNav,
} from '@/components/ui';
import Image from 'next/image';
import { headerConfig } from '@/config/header';
import { cn } from '@/lib/utils';
import useScrollPosition from '@/hooks/useScrollPosition';
import { User } from 'next-auth';
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '@/components/Icon';

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
						<Icon
							name='Search'
							size={24}
							className='cursor-pointer'
							onClick={() => setShowSearch(!showSearch)}
						/>
					</div>
					<div className='flex-shrink-0'>
						<Link href='/'>
							<Image
								src='/assets/logo.svg'
								width={isScrolled ? 130 : 150}
								height={100}
								alt='logo'
								className='transition-all duration-200'
								priority
							/>
						</Link>
					</div>

					<MainNav items={headerConfig.mainNav} />

					<div className='hidden md:flex'>
						{user ? (
							<UserNav
								items={headerConfig.userNav}
								user={{
									id: user.id,
									name: user.name,
									image: user.image,
									email: user.email,
								}}
							/>
						) : (
							<SignInButton />
						)}
					</div>
					<div className='flex md:hidden '>
						<MobileNav user={user} items={headerConfig.mainNav} />
					</div>
				</div>
			</header>
			{showSearch && (
				<div
					className={cn(
						`py-1 w-full left-0 fixed top-20 bg-dark-background/80 backdrop-blur-md z-[90] duration-300 ${
							showSearch
								? 'slide-in-from-top animate-in'
								: 'slide-out-to-top animate-out'
						}`
					)}
				>
					<div className='container max-w-7xl px-4 py-2'>
						<Input className='w-full' placeholder='Search...' size={22} />
					</div>
				</div>
			)}
		</>
	);
};
