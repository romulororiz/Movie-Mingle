import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { MainNav } from '../ui/mainNav';
import { headerConfig } from '@/config/header';

export const Header = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className='mx-auto flex flex-col space-y-6'>
			<header className='sticky py-4 top-0  bg-red-500 items-center flex'>
				<div className='container max-w-7xl flex justify-between items-center mx-auto w-full'>
					<MainNav items={headerConfig.mainNav} />
					{/* User Area */}
					{/* {session ? (
						<div className='gap-4 hidden sm:flex sm:items-center sm:justify-center'>
							<Image
								src={`${session.user.image}`}
								alt={`${session.user.name} profile picture`}
								width={52}
								height={52}
								className='rounded-full'
								quality={100}
							/>
						</div>
					) : (
						<div className='gap-3 hidden sm:flex sm:items-center sm:justify-center'>
							<button>SIGN IN</button>
						</div>
					)}
				</div> */}
					{/* Hamburger menu */}
					{/* <div className='sm:hidden'>
				<h1>mobmenu</h1>
			</div> */}
				</div>
			</header>
		</div>
	);
};
