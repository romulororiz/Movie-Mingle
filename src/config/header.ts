import { HeaderConfig } from '@/types';

export const headerConfig: HeaderConfig = {
	mainNav: [
		{
			section: 'Discover',
			requiresAuth: false,
			navItems: [
				{
					title: 'Popular Movies',
					href: '/movies/popular',
					icon: 'Star',
					description: 'Find the most popular movies out there',
				},
				// {
				//     title: 'For You',
				//     href: '/movies/for-you',
				//     icon: 'ThumbsUp',
				//     requireAuth: true,
				// },
				{
					title: 'Popular Actors',
					href: '/actors/popular',
					icon: 'Users',
					description: 'A collection of the most popular actors',
				},
				{
					title: 'Trending',
					href: '/movies/trending',
					icon: 'Flame',
					description: 'Find the hottest movies right now',
				},
				{
					title: 'Coming Up',
					href: '/movies/coming-up',
					icon: 'Clapperboard',
					description:
						'Find upcoming movies that are about to hit the theaters',
				},
				{
					title: 'Best of the best',
					href: '/movies/top-rated',
					icon: 'Award',
					description: 'A collection of the best of all time',
				},
			],
		},
		{
			section: 'Social',
			requiresAuth: true,
			navItems: [
				{
					title: 'Friends',
					href: '/friends',
					icon: 'UserPlus',
				},
			],
		},
		{
			section: 'My Account',
			requiresAuth: true,
			navItems: [
				{
					title: 'Profile',
					href: '/profile',
					icon: 'User',
				},
				{
					title: 'Settings',
					href: '/settings',
					icon: 'Settings',
				},
				{
					title: 'Logout',
					href: '#',
					icon: 'LogOut',
					isLogout: true,
				},
			],
		},
	],
};
