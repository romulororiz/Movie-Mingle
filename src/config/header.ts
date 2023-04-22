export const navItems = [
	{
		section: 'Discover',
		items: [
			{
				title: 'Home',
				path: '/',
				icon: 'Home',
				requiressAuth: false,
			},
			{
				title: 'Popular Movies',
				path: '/movies/popular',
				icon: 'Star',
				requiressAuth: false,
			},
			// {
			//     title: 'For You',
			//     path: '/movies/for-you',
			//     icon: 'ThumbsUp',
			//     requireAuth: true,
			// },
			{
				title: 'Popular Actors',
				path: '/actors/popular',
				icon: 'Users',
				requiressAuth: false,
			},
			{
				title: 'Trending',
				path: '/movies/trending',
				icon: 'Flame',
				requiressAuth: false,
			},
			{
				title: 'Coming Up',
				path: '/movies/coming-up',
				icon: 'Clapperboard',
				requiressAuth: false,
			},
			{
				title: 'Best of the best',
				path: '/movies/top-rated',
				icon: 'Award',
				requiressAuth: false,
			},
		],
	},
	{
		section: 'Social',
		items: [
			{
				title: 'Friends',
				path: '/friends',
				icon: 'Users',
				requiresAuth: true,
			},
		],
	},
	{
		section: 'My Account',
		items: [
			{
				title: 'Profile',
				path: '/profile',
				icon: 'User',
				requiresAuth: true,
			},
			{
				title: 'Settings',
				path: '/settings',
				icon: 'Settings',
				requiresAuth: true,
			},
			{
				title: 'Logout',
				path: '/logout',
				icon: 'LogOut',
				requiresAuth: true,
			},

			// render login instead of my account section if user is not logged in
			{
				title: 'Login',
				path: '/login',
				icon: 'LogIn',
				requiresAuth: false,
			},
		],
	},
];
