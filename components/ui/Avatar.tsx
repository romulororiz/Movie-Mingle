'use client';

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/lib/utils';
import { User } from '@prisma/client';
import useScrollPosition from '@/hooks/useScrollPosition';

const Avatar = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Root
		ref={ref}
		className={cn(
			'relative flex h-12 w-12 shrink-0 overflow-hidden rounded-full transition-all',
			className
		)}
		{...props}
	/>
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Image>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Image
		ref={ref}
		className={cn('aspect-square h-full w-full', className)}
		{...props}
	/>
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
	React.ElementRef<typeof AvatarPrimitive.Fallback>,
	React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
	<AvatarPrimitive.Fallback
		ref={ref}
		className={cn(
			'flex h-full w-full items-center justify-center rounded-full',
			className
		)}
		{...props}
	/>
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

interface UserAvatarProps extends AvatarPrimitive.AvatarProps {
	user: Pick<User, 'image' | 'name'>;
}

export const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
	const { isScrolled } = useScrollPosition();

	return (
		<Avatar {...props} className={cn({ 'h-10 w-10': isScrolled })}>
			{user.image ? (
				<AvatarImage alt={`${user.name}'s profile picture`} src={user.image} />
			) : (
				<AvatarFallback>
					<span className='sr-only'>{user.name}</span>
					{user.name}
				</AvatarFallback>
			)}
		</Avatar>
	);
};

export { Avatar, AvatarImage, AvatarFallback };
