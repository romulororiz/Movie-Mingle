'use client';

import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import { Input } from '@/components/ui';
import { UserNav } from '@/components/ui';
import { MainNav } from '@/components/ui';
import { MobileNav } from '@/components/ui';
import { SignInButton } from '@/components/ui';
import { headerConfig } from '@/config/header';

import useScrollPosition from '@/hooks/useScrollPosition';

interface HeaderProps {
	user: User;
}

export const Header = ({ user }: HeaderProps) => {
	const { isScrolled } = useScrollPosition();

	return (
		<header
			className={cn(
				'transition-all duration-200 fixed h-20 top-0 w-full flex z-[100]',
				{
					'bg-dark-background/80 backdrop-blur-md': isScrolled,
				}
			)}
		>
			<div className='container max-w-7xl flex justify-between gap-10 items-center mx-auto'>
				<MainNav items={headerConfig.mainNav} />
				{/* <div className='flex w-full justify-end'>
					<Input />
				</div> */}
				<div className='hidden md:flex'>
					{user ? (
						<UserNav
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
					<MobileNav user={user} items={headerConfig.mainNav} />
				</div>
			</div>
		</header>
	);
};
