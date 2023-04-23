import { headerConfig } from '@/config/header';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { MainNav } from '@/ui/mainNav';

export const Header = async () => {
	const session = await getServerSession(authOptions);

	return (
		<header className='fixed h-16 top-0 w-full flex z-[100]'>
			<div className='container max-w-7xl flex justify-between items-center mx-auto gap-12'>
				<MainNav items={headerConfig.mainNav} />
				{session ? (
					<div>User</div>
				) : (
					<div className='hidden sm:flex sm:items-center sm:justify-center'>
						<button>SIGN IN</button>
					</div>
				)}
			</div>
		</header>
	);
};
