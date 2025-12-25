import { FC } from 'react';
import { Button } from './Button';
import Link from 'next/link';

/**
 * Sign In button that redirects to the sign-in page
 */

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
	return (
		<Link href="/sign-in">
			<Button size="md" className="rounded-3xl font-bold w-32">
				SIGN IN
			</Button>
		</Link>
	);
};

export default SignInButton;
