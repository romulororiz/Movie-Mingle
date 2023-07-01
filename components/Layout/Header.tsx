'use client';

import { cn } from '@/lib/utils';
import { Heading } from '@/components/ui';
import { UserNav } from '@/components/ui';
import { MainNav } from '@/components/ui';
import { MobileNav } from '@/components/ui';
import { SignInButton } from '@/components/ui';
import { headerConfig } from '@/config/header';

import useScrollPosition from '@/hooks/useScrollPosition';
import Link from 'next/link';
import { User } from 'next-auth';

interface HeaderProps {
	// pick the properties you want to use
	user: User;
}

export const Header = ({ user }: HeaderProps) => {
	const { isScrolled } = useScrollPosition();

	return (
		<header
			className={cn(
				'transition-all duration-200 fixed h-24 top-0 left-0 w-full flex z-[100]',
				{
					'bg-dark-background/80 backdrop-blur-md h-20': isScrolled,
				}
			)}
		>
			<div className='container max-w-7xl flex justify-between items-center'>
				<Link href='/'>
					<Heading
						element='h1'
						className='font-bold text-3xl text-accent-primary'
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
	);
};
