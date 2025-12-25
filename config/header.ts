import { HeaderConfig } from '@/types';

export const headerConfig: HeaderConfig = {
	mainNav: [
		{
			section: 'Movies',
			icon: 'Film',
			navItems: [
				{
					title: 'Popular',
					href: '/movies/popular',
					icon: 'ThumbsUp',
					description: 'Find the most popular movies out there',
				},
				// {
				//     title: 'For You',
				//     href: '/movies/for-you',
				//     icon: 'ThumbsUp',
				//     requireAuth: true,
				// },
				{
					title: 'Trending',
					href: '/movies/trending',
					icon: 'Flame',
					description: 'The hottest movies right now',
				},
				{
					title: 'Coming Up',
					href: '/movies/coming-up',
					icon: 'Clapperboard',
					description: 'Coming up next in the cinemas',
				},
				{
					title: 'Top Rated',
					href: '/movies/top-rated',
					icon: 'Star',
					description: 'A collection of the all time best movies',
				},
			],
		},
		{
			section: 'Tv Shows',
			icon: 'Tv',
			navItems: [
				{
					title: 'Airing Today',
					href: '/movies/popular',
					icon: 'Play',
					description: 'Find Tv Shows that are currently airing',
				},
				{
					title: 'Popular',
					href: '/movies/trending',
					icon: 'ThumbsUp',
					description: 'Find the most popular tv shows out there',
				},
				{
					title: 'Top Rated',
					href: '/movies/top-rated',
					icon: 'Star',
					description: 'A collection of the all time best Tv Shows',
				},
			],
		},
		{
			section: 'Actors',
			icon: 'Users',
			navItems: [
				{
					title: 'Popular',
					href: '/actors/popular',
					icon: 'Users',
					description: 'Find the popular actors right now',
				},
			],
		},
	],
	userNav: [
		{
			section: 'My Collection',
			requiresAuth: true,
			navItems: [
				{
					title: 'Watchlist',
					href: '/dashboard/watchlist',
					icon: 'Bookmark',
				},
			],
		},
		{
			section: 'Social',
			requiresAuth: true,
			navItems: [
				{
					title: 'Notifications',
					href: '/dashboard/notifications',
					icon: 'Bell',
				},
				{
					title: 'Friends',
					href: '/dashboard/friends',
					icon: 'Users',
				},
			],
		},
		{
			section: 'My Account',
			requiresAuth: true,
			navItems: [
				{
					title: 'Profile',
					href: '/dashboard/profile',
					icon: 'User',
				},
				{
					title: 'Settings',
					href: '/dashboard/settings',
					icon: 'Settings',
				},
				{
					title: 'Logout',
					href: '#',
					icon: 'SignOut',
					isLogout: true,
				},
			],
		},
	],
};
