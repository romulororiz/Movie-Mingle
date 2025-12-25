import { Header } from '@/components/Layout';
import Footer from '@/components/Layout/Footer';
import { getUser } from '@/lib/supabase/session';

interface MainLayoutProps {
	children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
	const user = await getUser();

	return (
		<div className="min-h-screen flex flex-col">
			<Header user={user} />
			<main className="flex-1">{children}</main>
			<Footer />
		</div>
	);
}

