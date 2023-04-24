'use client';

import { signIn } from 'next-auth/react';
import { FC, useState } from 'react';
import { Button } from './Button';
// import { toast } from './toast';

/**
 * NextJS does not allow to pass function from server -> client components,
 * hence this unreusable component.
 */

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const signInWithGoogle = async () => {
		try {
			setIsLoading(true);
			await signIn('google');
		} catch (error) {
			// toast({
			// 	title: 'Error signing in',
			// 	message: 'Please try again later.',
			// 	type: 'error',
			// });

			console.log(error);
		}
	};

	return (
		<Button onClick={signInWithGoogle} variant='outline' size='lg' className='rounded-3xl font-bold'>
			SIGN IN
		</Button>
	);
};

export default SignInButton;
