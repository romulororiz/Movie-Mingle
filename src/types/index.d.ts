export type SiteConfig = {
	name: string;
	description: string;
	url: string;
};

export type NavItem = {
	section: string;
	items: {
		title: string;
		href: string;
		icon: string;
		requiresAuth: boolean;
	}[];
};

export type MainNavItem = NavItem;

export type HeaderConfig = {
	mainNav: MainNavItem[];
};
