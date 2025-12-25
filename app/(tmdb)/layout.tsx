import { Header } from '@/components/Layout';
import Footer from '@/components/Layout/Footer';
import { getUser } from '@/lib/supabase/session';

interface TmdbRootLayoutProps {
	children: React.ReactNode;
}

export default async function TmdbRootLayout({ children }: TmdbRootLayoutProps) {
	const user = await getUser();

	return (
		<div className="min-h-screen flex flex-col">
			<Header user={user} />
			<div className="flex-1">{children}</div>
			<Footer />
		</div>
	);
}

