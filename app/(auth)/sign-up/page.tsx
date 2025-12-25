'use client';

import { signInWithGoogle } from '@/lib/supabase/actions';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Film, Zap, Star, Bookmark, Users, TrendingUp, Heart } from 'lucide-react';

export default function SignUpPage() {
	return (
		<div className="h-screen flex relative overflow-hidden bg-dark-background">
			{/* Left Side - Sign Up Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
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
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-4"
						>
							<Zap className="w-3.5 h-3.5 text-green-400" />
							<span className="text-xs text-green-400 font-medium">Free Forever</span>
						</motion.div>
						<h1 className="text-4xl font-bold text-white mb-3">Join Movie Mingle</h1>
						<p className="text-gray-400 text-lg">
							Create your account and start your cinematic journey
						</p>
					</div>

					{/* Sign Up Form */}
					<form action={signInWithGoogle} className="space-y-6">
						{/* Google Button */}
						<motion.button
							type="submit"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className="w-full flex items-center justify-center gap-4 px-6 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary
							 text-white font-semibold rounded-2xl transition-all duration-500"
						>
							<svg className="w-6 h-6" viewBox="0 0 24 24">
								<path
									fill="currentColor"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="currentColor"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="currentColor"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="currentColor"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span className="text-base">Sign up with Google</span>
						</motion.button>

						{/* Divider */}
						<div className="relative py-4">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-700/50"></div>
							</div>
							<div className="relative flex justify-center">
								<span className="px-4 bg-dark-background text-gray-500 text-sm">
									No credit card required
								</span>
							</div>
						</div>

						{/* Benefits List */}
						<div className="space-y-3">
							{[
								{ icon: Bookmark, text: 'Create unlimited watchlists', color: 'text-blue-400' },
								{ icon: Star, text: 'Rate and review movies', color: 'text-yellow-400' },
								{ icon: TrendingUp, text: 'Discover trending content', color: 'text-green-400' },
								{ icon: Users, text: 'Connect with movie lovers', color: 'text-purple-400' },
							].map((benefit, i) => (
								<motion.div
									key={benefit.text}
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.4 + i * 0.1 }}
									className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/20 hover:border-gray-600/30 transition-colors"
								>
									<div className={`p-2 rounded-lg bg-gray-700/30 ${benefit.color}`}>
										<benefit.icon className="w-5 h-5" />
									</div>
									<span className="text-gray-300">{benefit.text}</span>
								</motion.div>
							))}
						</div>
					</form>

					{/* Sign In Link */}
					<p className="mt-10 text-center text-gray-400">
						Already have an account?{' '}
						<Link
							href="/sign-in"
							className="text-accent-primary hover:text-accent-secondary font-semibold transition-colors"
						>
							Sign in
						</Link>
					</p>

					{/* Terms */}
					<p className="mt-6 text-center text-xs text-gray-500">
						By signing up, you agree to our{' '}
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

			{/* Right Side - Cinematic Visual */}
			<div className="hidden lg:flex lg:w-1/2 relative">
				{/* Gradient Background */}
				<div className="absolute inset-0 bg-gradient-to-bl from-accent-secondary/20 via-dark-background to-accent-primary/20" />

				{/* Animated Elements */}
				<div className="absolute inset-0 overflow-hidden">
					{/* Floating Cards */}
					<motion.div
						animate={{
							y: [-20, 20, -20],
							rotate: [-5, 5, -5],
						}}
						transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
						className="absolute top-1/4 left-1/4 w-48 h-72 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl overflow-hidden"
					>
						<div className="h-3/4 bg-gradient-to-br from-accent-primary/30 to-accent-secondary/30" />
						<div className="p-4">
							<div className="h-3 w-3/4 bg-gray-700 rounded mb-2" />
							<div className="h-2 w-1/2 bg-gray-700/50 rounded" />
						</div>
					</motion.div>

					<motion.div
						animate={{
							y: [20, -20, 20],
							rotate: [5, -5, 5],
						}}
						transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
						className="absolute top-1/3 right-1/4 w-40 h-60 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl overflow-hidden"
					>
						<div className="h-3/4 bg-gradient-to-br from-purple-500/30 to-pink-500/30" />
						<div className="p-3">
							<div className="h-2 w-3/4 bg-gray-700 rounded mb-2" />
							<div className="h-2 w-1/2 bg-gray-700/50 rounded" />
						</div>
					</motion.div>

					<motion.div
						animate={{
							y: [-15, 25, -15],
							rotate: [-3, 7, -3],
						}}
						transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
						className="absolute bottom-1/4 left-1/3 w-36 h-52 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl overflow-hidden"
					>
						<div className="h-3/4 bg-gradient-to-br from-yellow-500/30 to-orange-500/30" />
						<div className="p-3">
							<div className="h-2 w-3/4 bg-gray-700 rounded mb-2" />
							<div className="h-2 w-1/2 bg-gray-700/50 rounded" />
						</div>
					</motion.div>
				</div>

				{/* Floating Icons */}
				<div className="absolute inset-0">
					<motion.div
						animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
						transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
						className="absolute top-20 right-20"
					>
						<div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl shadow-red-500/30">
							<Heart className="w-7 h-7 text-white fill-white" />
						</div>
					</motion.div>

					<motion.div
						animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
						transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
						className="absolute bottom-32 right-32"
					>
						<div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-500/30">
							<Film className="w-6 h-6 text-white" />
						</div>
					</motion.div>
				</div>

				{/* Content Overlay */}
				<div className="relative z-10 flex flex-col justify-center items-center p-12 text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						{/* Stats */}
						<div className="grid grid-cols-3 gap-6 mb-12">
							{[
								{ value: '50K+', label: 'Movies' },
								{ value: '10K+', label: 'Users' },
								{ value: '1M+', label: 'Reviews' },
							].map((stat, i) => (
								<motion.div
									key={stat.label}
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.5 + i * 0.1 }}
									className="text-center"
								>
									<div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
									<div className="text-sm text-gray-400">{stat.label}</div>
								</motion.div>
							))}
						</div>

						<h2 className="text-4xl font-bold text-white mb-6 leading-tight">
							Your personal
							<br />
							<span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">
								movie companion
							</span>
						</h2>

						<p className="text-gray-400 max-w-sm">
							Track what you watch, save what you want to see, and discover your next favorite film.
						</p>
					</motion.div>
				</div>

				{/* Top Gradient */}
				<div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-dark-background to-transparent" />
			</div>
		</div>
	);
}
