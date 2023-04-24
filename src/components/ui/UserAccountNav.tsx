'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import { UserAvatar } from './Avatar';
import useScrollPosition from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<User, 'name' | 'image' | 'email'>;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
	const { isScrolled } = useScrollPosition();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					user={{ name: user.name || null, image: user.image || null }}
					className={cn('h-14 w-14 transition-all', isScrolled && 'h-12 w-12')}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align='end'
				className='bg-dark-background border-none relative z-[100] shadow-black shadow-md'
			>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1 leading-none'>
						{user.name && <p className='font-medium'>{user.name}</p>}
						{user.email && (
							<p className='w-[200px] truncate text-sm text-slate-600'>
								{user.email}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuItem asChild>
					<Link href='/dashboard'>Dashboard</Link>
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<Link href='/dashboard/settings'>Settings</Link>
				</DropdownMenuItem>
				<DropdownMenuItem
					className='cursor-pointer'
					onSelect={event => {
						event.preventDefault();
						signOut({
							callbackUrl: `${window.location.origin}`,
						});
					}}
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
