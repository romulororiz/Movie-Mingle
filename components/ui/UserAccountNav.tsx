'use client';

import { Icon } from '@/components/Icon';
import { UserAvatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
import { NavItem, UserNavItem } from '@/types';
import { Menu, Transition } from '@headlessui/react';
import { signOut } from '@/lib/supabase/actions';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';

interface UserNavProps extends React.HTMLAttributes<HTMLDivElement> {
	user: {
		name: string | null;
		email: string | null;
		image: string | null;
	};
	items?: UserNavItem[];
}

export const UserNavMobile = ({ user }: UserNavProps) => {
	return (
		<div className="flex items-center gap-4">
			<UserAvatar user={{ name: user.name || null, image: user.image || null }} />
			<div className="flex flex-col truncate">
				<div className="text-md font-semibold">{user.name}</div>
				<div className="text-sm font-light text-slate-300 text-ellipsis overflow-hidden">
					{user.email}
				</div>
			</div>
		</div>
	);
};

export default function UserNav({ user, items }: UserNavProps) {
	const [menuOpen, setMenuOpen] = useState<boolean>(false);

	const router = useRouter();

	const currRoute = usePathname();

	const handleLogout = async (navItem: NavItem) => {
		if (navItem.isLogout) {
			await signOut();
		} else {
			router.push(navItem.href);
		}
	};

	return (
		<>
			<Menu as="div" className="relative inline-block text-left ">
				<Menu.Button
					onClick={() => setMenuOpen(!menuOpen)}
					className="inline-flex w-full justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					<UserAvatar user={{ name: user.name || null, image: user.image || null }} />
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="w-auto absolute flex flex-col right-0 mt-2 text-sm origin-top-right space-y-4 p-6 py-8 shadow-black shadow-md rounded-md bg-dark-background ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="flex flex-col gap-1 leading-none">
							{user.name && <p className="font-medium">{user.name}</p>}
							{user.email && (
								<p className="w-[200px] truncate text-sm text-slate-500">{user.email}</p>
							)}
						</div>

						<hr className="h-px my-8 bg-gray-100/20 border-0 dark:bg-gray-700" />

						{items?.map(
							(mainNavItem) =>
								mainNavItem.requiresAuth &&
								mainNavItem.navItems.map((item, index) => (
									<Menu.Item
										as={Link}
										key={index}
										href={item.href}
										onClick={() => handleLogout(item)}
										className="w-fit"
									>
										{({ active }) => (
											<div
												className={cn('flex transition items-center gap-2', {
													'text-accent-primary': currRoute === item.href,
													'text-accent-secondary': active,
												})}
											>
												<Icon name={item.icon} size={18} />
												{item.title}
											</div>
										)}
									</Menu.Item>
								))
						)}
					</Menu.Items>
				</Transition>
			</Menu>
		</>
	);
}
