'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Icon } from '@/components/Icon';
import { UserAvatar } from '@/components/ui/Avatar';
import { cn } from '@/lib/utils';
import { MainNavItem } from '@/types';
import type { User } from '@supabase/supabase-js';
import { signInWithGoogle, signOut } from '@/lib/supabase/actions';
import { useNotifications } from '@/hooks/useNotifications';
import { headerConfig } from '@/config/header';

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
	SheetClose,
} from '@/components/ui/Sheet';

import { toast } from 'sonner';
import {
	Menu,
	ChevronRight,
	LogOut,
	LogIn,
	Bell,
	Bookmark,
	Users,
	User as UserIcon,
	Settings,
	Home,
} from 'lucide-react';

interface MobileNavProps {
	user: User | null;
	items: MainNavItem[];
}

export default function MobileNav({ user, items }: MobileNavProps) {
	const pathname = usePathname();
	const { counts } = useNotifications();

	const handleSignOut = async () => {
		await signOut();
	};

	const handleSignIn = async () => {
		try {
			await signInWithGoogle();
		} catch (error) {
			toast.error('Error signing in. Please try again later.');
		}
	};

	const dashboardItems = [
		{
			title: 'Notifications',
			href: '/dashboard/notifications',
			icon: Bell,
			badge: counts.totalUnread,
		},
		{
			title: 'Watchlist',
			href: '/dashboard/watchlist',
			icon: Bookmark,
		},
		{
			title: 'Friends',
			href: '/dashboard/friends',
			icon: Users,
			badge: counts.friendRequests,
		},
		{
			title: 'Profile',
			href: '/dashboard/profile',
			icon: UserIcon,
		},
		{
			title: 'Settings',
			href: '/dashboard/settings',
			icon: Settings,
		},
	];

	return (
		<Sheet>
			<SheetTrigger className="p-2 hover:bg-white/5 rounded-lg transition-colors">
				<Menu className="w-6 h-6 text-gray-200" />
			</SheetTrigger>
			<SheetContent
				side="left"
				className="bg-dark-background border-gray-800 w-80 p-0 flex flex-col"
			>
				{/* Header */}
				<SheetHeader className="p-4 border-b border-gray-800">
					<div className="flex items-center justify-between">
						<SheetClose asChild>
							<Link href="/">
								<Image
									src="/assets/logo.svg"
									width={100}
									height={40}
									alt="Movie Mingle"
									priority
								/>
							</Link>
						</SheetClose>
					</div>
				</SheetHeader>

				{/* User Section */}
				{user ? (
					<div className="p-4 border-b border-gray-800">
						<div className="flex items-center gap-3">
							<UserAvatar
								user={{
									name: user.user_metadata?.full_name || user.email || null,
									image:
										user.user_metadata?.picture ||
										user.user_metadata?.avatar_url ||
										null,
								}}
								className="w-12 h-12 border-2 border-accent-primary/30"
							/>
							<div className="flex-1 min-w-0">
								<p className="font-semibold text-gray-100 truncate">
									{user.user_metadata?.full_name || user.email?.split('@')[0]}
								</p>
								<p className="text-sm text-gray-500 truncate">{user.email}</p>
							</div>
						</div>
					</div>
				) : (
					<div className="p-4 border-b border-gray-800">
						<button
							onClick={handleSignIn}
							className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-accent-primary text-zinc-950 rounded-lg font-medium hover:bg-accent-primary/90 transition-colors"
						>
							<LogIn className="w-4 h-4" />
							Sign In
						</button>
					</div>
				)}

				{/* Navigation */}
				<div className="flex-1 overflow-y-auto py-4">
					{/* Home Link */}
					<div className="px-3 mb-2">
						<SheetClose asChild>
							<Link
								href="/"
								className={cn(
									'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors',
									pathname === '/'
										? 'bg-accent-primary/10 text-accent-primary'
										: 'text-gray-300 hover:bg-gray-800/50'
								)}
							>
								<Home className="w-5 h-5" />
								<span className="font-medium">Home</span>
							</Link>
						</SheetClose>
					</div>

					{/* Dashboard Items (when logged in) */}
					{user && (
						<div className="px-3 mb-4">
							<p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
								Your Dashboard
							</p>
							{dashboardItems.map((item) => (
								<SheetClose key={item.href} asChild>
									<Link
										href={item.href}
										className={cn(
											'flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors mb-1',
											pathname === item.href
												? 'bg-accent-primary/10 text-accent-primary'
												: 'text-gray-300 hover:bg-gray-800/50'
										)}
									>
										<div className="flex items-center gap-3">
											<item.icon className="w-5 h-5" />
											<span className="font-medium">{item.title}</span>
										</div>
										{item.badge && item.badge > 0 ? (
											<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
												{item.badge > 9 ? '9+' : item.badge}
											</span>
										) : (
											<ChevronRight className="w-4 h-4 text-gray-600" />
										)}
									</Link>
								</SheetClose>
							))}
						</div>
					)}

					{/* Browse Sections */}
					{items.map((section, sectionIndex) => (
						<div key={sectionIndex} className="px-3 mb-4">
							<p className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
								{section.section}
							</p>
							{section.navItems.map((item, itemIndex) => (
								<SheetClose key={itemIndex} asChild>
									<Link
										href={item.href}
										className={cn(
											'flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors mb-1',
											pathname === item.href
												? 'bg-accent-primary/10 text-accent-primary'
												: 'text-gray-300 hover:bg-gray-800/50'
										)}
									>
										<div className="flex items-center gap-3">
											<Icon
												name={item.icon}
												size={20}
												className={cn(
													pathname === item.href
														? 'text-accent-primary'
														: 'text-gray-400'
												)}
											/>
											<span className="font-medium">{item.title}</span>
										</div>
										<ChevronRight className="w-4 h-4 text-gray-600" />
									</Link>
								</SheetClose>
							))}
						</div>
					))}
				</div>

				{/* Footer */}
				{user && (
					<div className="p-4 border-t border-gray-800">
						<button
							onClick={handleSignOut}
							className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors"
						>
							<LogOut className="w-4 h-4" />
							Sign Out
						</button>
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
