'use client';

import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import { MainNav } from '@/components/ui/MainNav';
import { headerConfig } from '@/config/header';
import { UserAccountNav } from './ui/UserAccountNav';
import MobileNav from './ui/MobileNav';
import useScrollPosition from '@/hooks/useScrollPosition';
import SignInButton from './ui/SignInButton';

interface HeaderProps {
	user: User;
}

export const Header = ({ user }: HeaderProps) => {
	const { isScrolled } = useScrollPosition();

	return (
		<header
			className={cn(
				'transition-all duration-200 fixed h-24 top-0 w-full flex z-[100]',
				{
					'bg-dark-background/60 backdrop-blur-lg h-20': isScrolled,
				}
			)}
		>
			<div className='container max-w-7xl flex justify-between items-center mx-auto'>
				<MainNav items={headerConfig.mainNav} />
				<div className='hidden md:flex md:items-center md:justify-center'>
					{user ? (
						<UserAccountNav
							user={{
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
					<MobileNav />
				</div>
			</div>
		</header>
	);
};
