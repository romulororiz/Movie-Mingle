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
import useScrollPosition from '@/hooks/useScrollPosition';
import { useNotifications } from '@/hooks/useNotifications';
import { Bell } from 'lucide-react';

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
			<UserAvatar
				user={{ name: user.name || null, image: user.image || null }}
				className="h-12 w-12 border-2 border-accent-primary"
			/>
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
	const { counts } = useNotifications();

	const router = useRouter();

	const currRoute = usePathname();

	const handleLogout = async (navItem: NavItem) => {
		if (navItem.isLogout) {
			await signOut();
		} else {
			router.push(navItem.href);
		}
	};

	const { isScrolled } = useScrollPosition();

	// Get badge count for specific menu items
	const getBadgeCount = (href: string): number => {
		if (href === '/dashboard/friends') return counts.friendRequests;
		if (href === '/dashboard/notifications') return counts.totalUnread;
		return 0;
	};

	return (
		<>
			<Menu as="div" className="relative inline-block text-left ">
				<Menu.Button
					onClick={() => setMenuOpen(!menuOpen)}
					className="inline-flex w-full justify-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
				>
					<div className="relative">
						<UserAvatar
							user={{ name: user.name || null, image: user.image || null }}
							className={cn('border-2 border-accent-primary', { 'h-12 w-12': isScrolled })}
						/>
						{/* Notification Badge on Avatar */}
						{counts.totalUnread > 0 && (
							<span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-dark-background">
								{counts.totalUnread > 9 ? '9+' : counts.totalUnread}
							</span>
						)}
					</div>
				</Menu.Button>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-200"
					enterFrom="transform opacity-0 scale-95 translate-y-[-10px]"
					enterTo="transform opacity-100 scale-100 translate-y-0"
					leave="transition ease-in duration-150"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="w-72 absolute right-0 mt-1 origin-top-right rounded-2xl bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 shadow-2xl shadow-black/50 focus:outline-none overflow-hidden">
						{/* Header with gradient */}
						<div className="relative p-6 bg-gradient-to-br from-accent-primary/10 via-transparent to-transparent border-b border-gray-700/50">
							<div className="absolute inset-0 bg-[url('/assets/grid-pattern.svg')] opacity-5" />
							<div className="relative flex items-center gap-3">
								<div className="flex-1 min-w-0">
									{user.name && <p className="font-semibold text-gray-100 truncate">{user.name}</p>}
									{user.email && <p className="text-sm text-gray-400 truncate">{user.email}</p>}
								</div>
							</div>
						</div>

						{/* Menu Items */}
						<div className="p-2">
							{items?.map((mainNavItem, sectionIndex) =>
								mainNavItem.requiresAuth ? (
									<div key={sectionIndex} className="mb-1 last:mb-0">
										{/* Section Header */}
										<div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
											{mainNavItem.section}
										</div>

										{/* Section Items */}
										{mainNavItem.navItems.map((item, itemIndex) => (
											<Menu.Item key={`${sectionIndex}-${itemIndex}`}>
												{({ active }) => (
													<Link
														href={item.href}
														onClick={() => handleLogout(item)}
														className={cn(
															'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
															'text-sm font-medium',
															{
																'bg-accent-primary/10 text-accent-primary': currRoute === item.href,
																'text-gray-300 hover:bg-gray-700/50 hover:text-white':
																	currRoute !== item.href && !active,
																'bg-gray-700/30': active && currRoute !== item.href,
															}
														)}
													>
														<Icon
															name={item.icon}
															size={18}
															className={cn({
																'text-accent-primary': currRoute === item.href,
																'text-gray-400': currRoute !== item.href,
															})}
														/>
														<span>{item.title}</span>
														{/* Badge for notifications */}
														{getBadgeCount(item.href) > 0 && (
															<span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
																{getBadgeCount(item.href) > 9 ? '9+' : getBadgeCount(item.href)}
															</span>
														)}
														{currRoute === item.href && getBadgeCount(item.href) === 0 && (
															<div className="ml-auto w-1.5 h-1.5 rounded-full bg-accent-primary" />
														)}
													</Link>
												)}
											</Menu.Item>
										))}
									</div>
								) : null
							)}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</>
	);
}
