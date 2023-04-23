export type SiteConfig = {
	name: string;
	description: string;
	url: string;
};

export type NavItem = {
	section: string;
	navItems: {
		title: string;
		href: string;
		icon: string;
		requiresAuth: boolean;
		description?: string;
	}[];
};

export type MainNavItem = NavItem;

export type HeaderConfig = {
	mainNav: MainNavItem[];
};
