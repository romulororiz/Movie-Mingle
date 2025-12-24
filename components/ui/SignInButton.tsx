'use client';

import { signInWithGoogle } from '@/lib/supabase/actions';
import { FC, useState } from 'react';
import { Button } from './Button';
import { toast } from 'sonner';

/**
 * NextJS does not allow to pass function from server -> client components,
 * hence this unreusable component.
 */

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSignIn = async () => {
		try {
			setIsLoading(true);
			await signInWithGoogle();
		} catch (error) {
			setIsLoading(false);
			toast.error('Error signing in. Please try again later.');
		}
	};

	return (
		<Button
			onClick={handleSignIn}
			isLoading={isLoading}
			size='md'
			className='rounded-3xl font-bold w-32'
		>
			SIGN IN
		</Button>
	);
};

export default SignInButton;
