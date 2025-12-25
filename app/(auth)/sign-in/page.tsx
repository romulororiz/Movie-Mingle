'use client';

import { signInWithGoogle } from '@/lib/supabase/actions';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Film, Zap, Play, Star, Bookmark } from 'lucide-react';

export default function SignInPage() {
	return (
		<div className="h-screen flex relative overflow-hidden bg-dark-background">
			{/* Left Side - Cinematic Visual */}
			<div className="hidden lg:flex lg:w-1/2 relative">
				{/* Movie Poster Collage Background */}
				<div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-dark-background to-accent-secondary/20" />

				{/* Animated Film Reels */}
				<div className="absolute inset-0 overflow-hidden">
					{/* Large Film Reel */}
					<motion.div
						animate={{ rotate: 360 }}
						transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
						className="absolute -top-20 -left-20 w-80 h-80 border-[20px] border-gray-700/30 rounded-full"
					>
						<div className="absolute inset-4 border-8 border-gray-600/20 rounded-full" />
						<div className="absolute inset-12 border-4 border-gray-500/20 rounded-full" />
						{[...Array(8)].map((_, i) => (
							<div
								key={i}
								className="absolute w-6 h-6 bg-gray-600/30 rounded-full"
								style={{
									top: '50%',
									left: '50%',
									transform: `rotate(${i * 45}deg) translateY(-100px)`,
								}}
							/>
						))}
					</motion.div>

					{/* Small Film Reel */}
					<motion.div
						animate={{ rotate: -360 }}
						transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
						className="absolute bottom-10 right-10 w-40 h-40 border-[10px] border-gray-700/30 rounded-full"
					>
						{[...Array(6)].map((_, i) => (
							<div
								key={i}
								className="absolute w-3 h-3 bg-gray-600/30 rounded-full"
								style={{
									top: '50%',
									left: '50%',
									transform: `rotate(${i * 60}deg) translateY(-50px)`,
								}}
							/>
						))}
					</motion.div>
				</div>

				{/* Floating Movie Elements */}
				<div className="absolute inset-0">
					<motion.div
						animate={{ y: [-10, 10, -10] }}
						transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
						className="absolute top-1/4 left-1/4"
					>
						<div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-2xl shadow-accent-primary/30">
							<Play className="w-8 h-8 text-white fill-white" />
						</div>
					</motion.div>

					<motion.div
						animate={{ y: [10, -10, 10] }}
						transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
						className="absolute top-1/2 right-1/4"
					>
						<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-2xl shadow-yellow-400/30">
							<Star className="w-7 h-7 text-white fill-white" />
						</div>
					</motion.div>

					<motion.div
						animate={{ y: [-5, 15, -5] }}
						transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
						className="absolute bottom-1/3 left-1/3"
					>
						<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/30">
							<Bookmark className="w-6 h-6 text-white" />
						</div>
					</motion.div>
				</div>

				{/* Content Overlay */}
				<div className="relative z-10 flex flex-col justify-center items-center p-12 w-full text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/20 border border-accent-primary/30 mb-8">
							<Zap className="w-4 h-4 text-accent-primary" />
							<span className="text-sm text-accent-primary font-medium">Your Cinema Universe</span>
						</div>

						<h2 className="text-5xl font-bold text-white mb-6 leading-tight">
							Discover. Watch.
							<br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
								Remember.
							</span>
						</h2>

						<p className="text-lg text-gray-400 max-w-md">
							Join thousands of movie enthusiasts tracking their watchlist, discovering hidden gems,
							and sharing their passion for cinema.
						</p>
					</motion.div>
				</div>

				{/* Bottom Gradient */}
				<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark-background to-transparent" />
			</div>

			{/* Right Side - Sign In Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.6 }}
					className="w-full max-w-md"
				>
					{/* Logo */}
					<Link href="/" className="flex justify-center lg:justify-start mb-12">
						<Image src="/assets/logo.svg" width={160} height={100} alt="Movie Mingle" priority />
					</Link>

					{/* Welcome Text */}
					<div className="mb-10">
						<h1 className="text-4xl font-bold text-white mb-3">Welcome back</h1>
						<p className="text-gray-400 text-lg">Sign in to continue your movie journey</p>
					</div>

					{/* Sign In Form */}
					<form action={signInWithGoogle} className="space-y-6">
						{/* Google Button */}
						<motion.button
							type="submit"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl"
						>
							<svg className="w-6 h-6" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span className="text-base">Continue with Google</span>
						</motion.button>

						{/* Divider */}
						<div className="relative py-4">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-700/50"></div>
							</div>
							<div className="relative flex justify-center">
								<span className="px-4 bg-dark-background text-gray-500 text-sm">Secure & Fast</span>
							</div>
						</div>

						{/* Features */}
						<div className="grid grid-cols-2 gap-4">
							{[
								{ icon: Film, label: 'Track movies' },
								{ icon: Star, label: 'Rate & review' },
								{ icon: Bookmark, label: 'Watchlists' },
								{ icon: Zap, label: 'Discover' },
							].map((feature, i) => (
								<motion.div
									key={feature.label}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 + i * 0.1 }}
									className="flex items-center gap-3 p-3 rounded-xl bg-gray-800/30 border border-gray-700/30"
								>
									<feature.icon className="w-5 h-5 text-accent-primary" />
									<span className="text-sm text-gray-300">{feature.label}</span>
								</motion.div>
							))}
						</div>
					</form>

					{/* Sign Up Link */}
					<p className="mt-10 text-center text-gray-400">
						New to Movie Mingle?{' '}
						<Link
							href="/sign-up"
							className="text-accent-primary hover:text-accent-secondary font-semibold transition-colors"
						>
							Create an account
						</Link>
					</p>

					{/* Terms */}
					<p className="mt-6 text-center text-xs text-gray-500">
						By continuing, you agree to our{' '}
						<Link href="/terms" className="underline hover:text-gray-400">
							Terms
						</Link>{' '}
						and{' '}
						<Link href="/privacy" className="underline hover:text-gray-400">
							Privacy Policy
						</Link>
					</p>
				</motion.div>
			</div>
		</div>
	);
}
