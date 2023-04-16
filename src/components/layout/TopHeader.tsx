import { authOptions } from '@/lib/auth';
import { GetServerSideProps } from 'next';
import { Session, getServerSession } from 'next-auth';
import Image from 'next/image';
import { Input } from '../ui/Input';
import { signIn } from 'next-auth/react';

const TopHeader = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className='absolute md:pl-72 h-20 flex justify-end items-center sm:flex-row w-full z-[65]'>
			<div className='container max-w-7xl flex justify-center sm:justify-end items-center gap-12 h-full mx-auto'>
				{/* Search Input Component */}
				<Input placeholder='Search movies...' />

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
						<button						>
							SIGN IN
						</button>
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

export const getServerSideProps: GetServerSideProps = async () => {
	const session = await getServerSession(authOptions);

	if (!session) {
		throw new Error('You must be signed in to view this page');
	}

	console.log(session);

	return {
		props: {
			session,
		},
	};
};

export default TopHeader;
