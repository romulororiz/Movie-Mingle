'use client';

import Link from 'next/link';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import { UserAvatar } from './Avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';

interface UserNavProps extends React.HTMLAttributes<HTMLDivElement> {
	user: Pick<User, 'name' | 'image' | 'email'>;
}

export const UserNavMobile = ({ user }: UserNavProps) => {
	return (
		<div className='flex items-center gap-4'>
			<UserAvatar
				user={{ name: user.name || null, image: user.image || null }}
			/>
			<div className='flex flex-col'>
				<div className='text-md font-semibold'>{user.name}</div>
				<div className='text-sm font-light text-slate-300'>{user.email}</div>
			</div>
		</div>
	);
};

export default function UserNav({ user }: UserNavProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					user={{ name: user.name || null, image: user.image || null }}
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
