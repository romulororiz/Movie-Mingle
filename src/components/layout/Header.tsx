import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

export const Header = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className='fixed h-20 z-[80] top-0 left-0 w-full'>
			<div className='container max-w-7xl flex justify-between items-center gap-12 h-full mx-auto w-full'>
				{/* Logo */}
				<Link href='/' className='flex relative font-bold text-slate-200'>
					<h1 className='text-4xl'>LOGO</h1>
				</Link>

				{/* User Area */}
				{session ? (
					<div className='gap-4 hidden sm:flex sm:items-center sm:justify-center'>
						{/* <div className='flex-col text-right'>
									<h1>{session?.user.name}</h1>
									<h1>settings</h1>
								</div> */}
						<Image
							src={`${session.user.image}`}
							alt={`${session.user.name} profile picture`}
							width={48}
							height={48}
							className='rounded-full'
							quality={100}
						/>
					</div>
				) : (
					<div className='gap-3 hidden sm:flex sm:items-center sm:justify-center'>
						{/* Sign In Button */}
						<button>SIGN IN</button>
					</div>
				)}
			</div>
			{/* Hamburger menu */}
			{/* <div className='sm:hidden'>
				<h1>mobmenu</h1>
			</div> */}
			{/* </div> */}
		</div>
	);
};
