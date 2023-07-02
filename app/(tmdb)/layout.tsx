interface TmdbLayoutProps {
	children: React.ReactNode;
}

export default function TmdbLayout({ children }: TmdbLayoutProps) {
	return <main className='pt-28 md:pt-36 max-w-7xl mx-auto'>{children}</main>;
}
