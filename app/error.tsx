'use client';

import { Button } from '@/components/ui/Button';
import { Film } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log error to console in development
		if (process.env.NODE_ENV === 'development') {
			console.error('App error:', error);
		}
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-b from-dark-background to-zinc-950">
			<div className="text-center max-w-md space-y-6">
				{/* Icon */}
				<div className="flex justify-center">
					<div className="rounded-full bg-accent-primary/10 p-6">
						<Film className="w-16 h-16 text-accent-primary" />
					</div>
				</div>

				{/* Title */}
				<h1 className="text-4xl md:text-5xl font-bold text-accent-primary">
					Oops!
				</h1>

				{/* Message */}
				<div className="space-y-2">
					<h2 className="text-xl md:text-2xl font-semibold text-white">
						Something went wrong
					</h2>
					<p className="text-lg text-gray-400">
						We couldn't load this page. Don't worry, our team has been notified.
					</p>
				</div>

				{/* Actions */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
					<Button onClick={reset} size="lg">
						Try again
					</Button>
					<Button
						variant="outline"
						size="lg"
						onClick={() => (window.location.href = '/')}
					>
						Go home
					</Button>
				</div>

				{/* Error details (development only) */}
				{process.env.NODE_ENV === 'development' && (
					<details className="mt-8 text-left">
						<summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-300">
							Error details (dev only)
						</summary>
						<pre className="mt-4 p-4 bg-black/50 rounded-lg text-xs text-red-400 overflow-auto">
							{error.message}
							{error.stack && `\n\n${error.stack}`}
						</pre>
					</details>
				)}
			</div>
		</div>
	);
}

