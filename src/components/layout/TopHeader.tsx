import Image from 'next/image';
import { Input } from '../ui/Input';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const TopHeader = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className='md:pl-60 h-20 flex justify-between items-center sm:flex-row sm:justify-between w-full'>
			<div className='container flex justify-center md:justify-end items-center gap-12 h-full'>
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
							width={60}
							height={60}
							className='rounded-full'
							quality={100}
						/>
					</div>
				) : (
					<div className='gap-3 hidden sm:flex sm:items-center sm:justify-center'>
						{/* Sign In Button */}
						<h1>Sign In</h1>
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
