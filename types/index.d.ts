export type SiteConfig = {
	name: string;
	description: string;
	url: string;
};

// Navigation Config
export type NavItem = {
	title: string;
	href: string;
	icon: string;
	isLogout?: boolean;
	description?: string;
};

export type MainNavItem = {
	section: string;
	icon?: string;
	navItems: NavItem[];
};

export interface UserNavItem extends MainNavItem {
	requiresAuth: boolean;
}

export type HeaderConfig = {
	mainNav: MainNavItem[];
	userNav: UserNavItem[];
};

export type SidebarConfig = {
	mainNav: MainNavItem[];
};

// Footer Config
export type SocialLink = {
	name: string;
	url: string;
	icon: string;
};
