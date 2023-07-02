'use client';

import { cn } from '@/lib/utils';
import { Heading, Input } from '@/components/ui';
import { UserNav } from '@/components/ui';
import { MainNav } from '@/components/ui';
import { MobileNav } from '@/components/ui';
import { SignInButton } from '@/components/ui';
import { headerConfig } from '@/config/header';

import useScrollPosition from '@/hooks/useScrollPosition';
import Link from 'next/link';
import { User } from 'next-auth';
import { Icon } from '../Icon';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

interface HeaderProps {
	// pick the properties you want to use
	user: User;
}

export const Header = ({ user }: HeaderProps) => {
	const [showSearch, setShowSearch] = useState(false);

	const { isScrolled } = useScrollPosition();

	return (
		<div className='animate-out'>
			<header
				className={cn(
					'transition-all duration-200 backdrop-blur-md fixed h-20 top-0 left-0 w-full flex z-[100]',
					isScrolled
						? 'bg-dark-background/80'
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

					<Link href='/'>
						<Heading
							element='h1'
							className='font-bold text-2xl text-accent-primary'
							title='LOGO'
						/>
					</Link>

					<MainNav items={headerConfig.mainNav} />

					<div className='hidden md:flex'>
						{user ? (
							<UserNav
								items={headerConfig.mainNav}
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
		</div>
	);
};
