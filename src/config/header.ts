import { HeaderConfig } from '@/types';

export const headerConfig: HeaderConfig = {
	mainNav: [
		{
			section: 'Discover',
			navItems: [
				{
					title: 'Popular Movies',
					href: '/movies/popular',
					icon: 'Star',
					requiresAuth: false,
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
					requiresAuth: false,
					description: 'A collection of the most popular actors',
				},
				{
					title: 'Trending',
					href: '/movies/trending',
					icon: 'Flame',
					requiresAuth: false,
					description: 'Find the hottest movies right now',
				},
				{
					title: 'Coming Up',
					href: '/movies/coming-up',
					icon: 'Clapperboard',
					requiresAuth: false,
					description:
						'Find upcoming movies that are about to hit the theaters',
				},
				{
					title: 'Best of the best',
					href: '/movies/top-rated',
					icon: 'Award',
					requiresAuth: false,
					description: 'A collection of the best of all time',
				},
			],
		},
		// {
		// 	section: 'Social',
		// 	navItems: [
		// 		{
		// 			title: 'Friends',
		// 			href: '/friends',
		// 			icon: 'Users',
		// 			requiresAuth: true,
		// 		},
		// 	],
		// },
		// {
		// 	section: 'My Account',
		// 	navItems: [
		// 		{
		// 			title: 'Profile',
		// 			href: '/profile',
		// 			icon: 'User',
		// 			requiresAuth: true,
		// 		},
		// 		{
		// 			title: 'Settings',
		// 			href: '/settings',
		// 			icon: 'Settings',
		// 			requiresAuth: true,
		// 		},
		// 		{
		// 			title: 'Logout',
		// 			href: '/logout',
		// 			icon: 'LogOut',
		// 			requiresAuth: true,
		// 		},

		// 		// render login instead of my account section if user is not logged in
		// 		{
		// 			title: 'Login',
		// 			href: '/login',
		// 			icon: 'LogIn',
		// 			requiresAuth: false,
		// 		},
		// 	],
		// },
	],
};
