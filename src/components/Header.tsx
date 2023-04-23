'use client';

import { headerConfig } from '@/config/header';
import useScrollPosition from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';
import { Session } from 'next-auth';
import { MainNav } from '@/components/ui/MainNav';
import MobileNav from './ui/MobileNav';

interface HeaderProps {
	session: Session;
}

export const Header = ({ session }: HeaderProps) => {
	const { isScrolled } = useScrollPosition();

	return (
		<header
			className={cn(
				'transition-all duration-300 fixed h-24 top-0 w-full flex z-[100]',
				{
					'bg-dark-background/60 backdrop-blur-lg h-20': isScrolled,
				}
			)}
		>
			<div className='container max-w-7xl flex justify-between items-center mx-auto gap-12'>
				<MainNav items={headerConfig.mainNav} />
				<div className='hidden md:flex md:items-center md:justify-center'>
					{session ? (
						<div>User</div>
					) : (
						<div>
							<button>SIGN IN</button>
						</div>
					)}
				</div>
				<div className='flex md:hidden '>
					<MobileNav />
				</div>
			</div>
		</header>
	);
};
