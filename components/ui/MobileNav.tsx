import Image from 'next/image';
import Link from 'next/link';
import Social from '@/components/ui/Social';

import { Icon } from '@/components/Icon';
import { Heading } from '@/components/ui';
import { cn } from '@/lib/utils';
import { MainNavItem } from '@/types';
import { User } from 'next-auth';
import { signIn, signOut } from 'next-auth/react';
import { UserNavMobile } from './UserAccountNav';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/Accordion';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/Sheet';

import { Separator } from '@/components/ui/Separator';
import { toast } from 'sonner';

const AuthBtnMobile = ({
	user,
	signIn,
	signOut,
}: {
	user: User;
	signIn: () => void;
	signOut: () => void;
}) => {
	return (
		<div className='justify-center flex'>
			<Icon
				name={user ? 'SignOut' : 'SignIn'}
				size={32}
				className='stroke-dark-background bg-accent-primary rounded-full p-2'
				onClick={user ? signOut : signIn}
			/>
		</div>
	);
};

interface MobileNavProps {
	user: User;
	items: MainNavItem[];
}

export default function MobileNav({ user, items }: MobileNavProps) {
	const handleSignOut = async () => {
		await signOut();
	};

	const handleSignIn = async () => {
		try {
			await signIn('google', {
				redirect: false,
			});
		} catch (error) {
			toast.error('Error signing in. Please try again later.');
		}
	};

	return (
		<Sheet>
			<SheetTrigger>
				<Icon name='Menu' size={30} />
			</SheetTrigger>
			<SheetContent
				side='left'
				className='bg-dark-background z-[100] border-transparent w-80 p-8 overflow-auto flex flex-col'
			>
				<SheetHeader className='flex-1'>
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
				<div className='flex flex-col gap-3 mx-auto justify-center -mb-6'>
					<AuthBtnMobile
						user={user}
						signIn={handleSignIn}
						signOut={handleSignOut}
					/>
					<Social />
				</div>
			</SheetContent>
		</Sheet>
	);
}
