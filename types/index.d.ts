export type SiteConfig = {
	name: string;
	description: string;
	url: string;
};

export type NavItem = {
	title: string;
	href: string;
	icon: string;
	isLogout?: boolean;
	description?: string;
};

export type MainNavItem = {
	section: string;
	requiresAuth: boolean;
	navItems: NavItem[];
};

export type HeaderConfig = {
	mainNav: MainNavItem[];
};

export type SidebarConfig = {
	mainNav: MainNavItem[];
};
