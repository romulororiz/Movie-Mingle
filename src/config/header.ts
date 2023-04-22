import { HeaderConfig } from '@/types';

export const headerConfig: HeaderConfig = {
	mainNav: [
		{
			section: 'Discover',
			items: [
				{
					title: 'Home',
					href: '/',
					icon: 'Home',
					requiresAuth: false,
				},
				{
					title: 'Popular Movies',
					href: '/movies/popular',
					icon: 'Star',
					requiresAuth: false,
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
				},
				{
					title: 'Trending',
					href: '/movies/trending',
					icon: 'Flame',
					requiresAuth: false,
				},
				{
					title: 'Coming Up',
					href: '/movies/coming-up',
					icon: 'Clapperboard',
					requiresAuth: false,
				},
				{
					title: 'Best of the best',
					href: '/movies/top-rated',
					icon: 'Award',
					requiresAuth: false,
				},
			],
		},
		{
			section: 'Social',
			items: [
				{
					title: 'Friends',
					href: '/friends',
					icon: 'Users',
					requiresAuth: true,
				},
			],
		},
		// {
		// 	section: 'My Account',
		// 	items: [
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
