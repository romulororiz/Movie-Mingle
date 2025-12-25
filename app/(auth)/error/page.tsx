'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';

export default function AuthErrorPage() {
	return (
		<div className="h-screen flex items-center justify-center relative overflow-hidden bg-dark-background px-6">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-red-900/10 via-dark-background to-dark-background" />

			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden">
				<motion.div
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.1, 0.2, 0.1],
					}}
					transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"
				/>
				<motion.div
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.1, 0.15, 0.1],
					}}
					transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
					className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl"
				/>
			</div>

			{/* Content */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="relative z-10 w-full max-w-lg text-center"
			>
				{/* Logo */}
				<Link href="/" className="inline-block mb-12">
					<Image src="/assets/logo.svg" width={160} height={100} alt="Movie Mingle" priority />
				</Link>

				{/* Error Icon */}
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: 'spring', duration: 0.5, delay: 0.2 }}
					className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center mb-8"
				>
					<AlertCircle className="w-12 h-12 text-red-400" />
				</motion.div>

				{/* Error Text */}
				<h1 className="text-4xl font-bold text-white mb-4">Oops! Something went wrong</h1>
				<p className="text-lg text-gray-400 mb-10 max-w-md mx-auto">
					We couldn't complete your sign in. This might be a temporary issue - please try again.
				</p>

				{/* Troubleshooting Tips */}
				<div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 p-6 mb-8 text-left">
					<h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
						<HelpCircle className="w-4 h-4 text-accent-primary" />
						Troubleshooting Tips
					</h3>
					<ul className="space-y-3">
						{[
							"Make sure you're using a valid Google account",
							'Check your internet connection',
							'Try clearing your browser cache',
							'Disable any ad blockers temporarily',
						].map((tip, i) => (
							<motion.li
								key={i}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.3 + i * 0.1 }}
								className="flex items-start gap-3 text-gray-400 text-sm"
							>
								<span className="w-5 h-5 rounded-full bg-gray-700/50 flex items-center justify-center text-xs text-gray-300 flex-shrink-0 mt-0.5">
									{i + 1}
								</span>
								{tip}
							</motion.li>
						))}
					</ul>
				</div>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
						<Link
							href="/sign-in"
							className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-accent-primary/25 hover:shadow-xl hover:shadow-accent-primary/30 w-full sm:w-auto"
						>
							<RefreshCw className="w-5 h-5" />
							Try Again
						</Link>
					</motion.div>

					<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
						<Link
							href="/"
							className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-xl transition-all duration-200 border border-gray-700/50 w-full sm:w-auto"
						>
							<ArrowLeft className="w-5 h-5" />
							Go Home
						</Link>
					</motion.div>
				</div>

				{/* Support Link */}
				<p className="mt-10 text-sm text-gray-500">
					Still having issues?{' '}
					<Link
						href="/contact"
						className="text-accent-primary hover:text-accent-secondary transition-colors"
					>
						Contact support
					</Link>
				</p>
			</motion.div>
		</div>
	);
}
