'use client';

import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { Heading } from '@/components/ui';
import { Button } from '@/components/ui/Button';
import { UserAvatar } from '@/components/ui/Avatar';
import { User, Mail, Lock, Bell, Globe, Palette, Shield, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signOut } from '@/lib/supabase/actions';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';

export default function SettingsPage() {
	const { user, loading } = useSupabaseUser();
	const router = useRouter();
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		if (!loading && !user) {
			router.push('/');
		}
	}, [user, loading, router]);

	const handleSignOut = async () => {
		try {
			await signOut();
		} catch (error) {
			toast.error('Error signing out');
		}
	};

	const handleDeleteAccount = async () => {
		const confirmed = window.confirm(
			'Are you sure you want to delete your account? This action cannot be undone.'
		);

		if (!confirmed) return;

		try {
			const supabase = createClient();
			// This would need a server action to properly delete the user
			toast.error('Account deletion is not yet implemented. Please contact support.');
		} catch (error) {
			toast.error('Error deleting account');
		}
	};

	if (loading || !user) {
		return (
			<div className="container py-8 px-4">
				<div className="max-w-4xl mx-auto space-y-6">
					{[...Array(3)].map((_, i) => (
						<div key={i} className="h-32 bg-gray-800 rounded-xl animate-pulse" />
					))}
				</div>
			</div>
		);
	}

	const userDisplayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Movie Fan';

	return (
		<div className="py-8 px-4">
			<div className="container">
				<div className="max-w-4xl mx-auto">
					{/* Header */}
					<div className="mb-8">
						<Heading
							element="h1"
							title="Settings"
							className="text-3xl md:text-4xl font-bold mb-2"
						/>
						<p className="text-gray-400">Manage your account settings and preferences</p>
					</div>

					{/* Profile Section */}
					<section className="mb-6">
						<div className="bg-dark-background border border-accent-primary border-opacity-30 rounded-xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<User className="w-5 h-5 text-accent-primary" />
								<h2 className="text-xl font-semibold">Profile Information</h2>
							</div>

							<div className="flex flex-col md:flex-row gap-6 items-start">
								<UserAvatar
									user={{
										name: userDisplayName,
										image: user.user_metadata?.avatar_url || null,
									}}
									className="w-20 h-20 border-2 border-accent-primary/30"
								/>

								<div className="flex-1 space-y-4">
									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">
											Display Name
										</label>
										<input
											type="text"
											defaultValue={userDisplayName}
											className="w-full px-4 py-2 bg-gray-900/50 border border-gray-600 rounded-lg focus:border-accent-primary focus:outline-none focus:ring-1 focus:ring-accent-primary transition-colors"
											placeholder="Your name"
										/>
									</div>

									<div>
										<label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
										<div className="flex items-center gap-2 px-4 py-2 bg-gray-900/30 border border-gray-700 rounded-lg text-gray-400">
											<Mail className="w-4 h-4" />
											<span>{user.email}</span>
										</div>
										<p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
									</div>

									<Button
										variant="default"
										size="md"
										onClick={() => toast.message('Profile update feature coming soon')}
										disabled={isSaving}
									>
										Save Changes
									</Button>
								</div>
							</div>
						</div>
					</section>

					{/* Preferences Section */}
					<section className="mb-6">
						<div className="bg-dark-background border border-accent-primary border-opacity-30 rounded-xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<Palette className="w-5 h-5 text-accent-primary" />
								<h2 className="text-xl font-semibold">Preferences</h2>
							</div>

							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium text-gray-200">Notifications</h3>
										<p className="text-sm text-gray-400">
											Receive updates about new movies and recommendations
										</p>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" className="sr-only peer" defaultChecked />
										<div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
									</label>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium text-gray-200">Auto-play Trailers</h3>
										<p className="text-sm text-gray-400">
											Automatically play movie trailers when browsing
										</p>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" className="sr-only peer" />
										<div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
									</label>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium text-gray-200">Mature Content</h3>
										<p className="text-sm text-gray-400">
											Show movies with mature themes and ratings
										</p>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" className="sr-only peer" defaultChecked />
										<div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
									</label>
								</div>
							</div>
						</div>
					</section>

					{/* Privacy & Security */}
					<section className="mb-6">
						<div className="bg-dark-background border border-accent-primary border-opacity-30 rounded-xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<Shield className="w-5 h-5 text-accent-primary" />
								<h2 className="text-xl font-semibold">Privacy & Security</h2>
							</div>

							<div className="space-y-4">
								<div className="flex items-center justify-between">
									<div>
										<h3 className="font-medium text-gray-200">Profile Visibility</h3>
										<p className="text-sm text-gray-400">
											Make your profile visible to other users
										</p>
									</div>
									<label className="relative inline-flex items-center cursor-pointer">
										<input type="checkbox" className="sr-only peer" defaultChecked />
										<div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-accent-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-primary"></div>
									</label>
								</div>

								<div className="flex items-center justify-between pt-4 border-t border-gray-700">
									<div>
										<h3 className="font-medium text-gray-200">Change Password</h3>
										<p className="text-sm text-gray-400">Update your account password</p>
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={() => toast.message('Password change feature coming soon')}
										className="gap-2"
									>
										<Lock className="w-4 h-4" />
										Change
									</Button>
								</div>
							</div>
						</div>
					</section>

					{/* Danger Zone */}
					<section>
						<div className="bg-red-950/20 border border-red-900/50 rounded-xl p-6 md:p-8">
							<div className="flex items-center gap-3 mb-6">
								<LogOut className="w-5 h-5 text-red-400" />
								<h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
							</div>

							<div className="space-y-4">
								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
									<div>
										<h3 className="font-medium text-gray-200">Sign Out</h3>
										<p className="text-sm text-gray-400">
											Sign out from your account on this device
										</p>
									</div>
									<Button
										variant="outline"
										size="md"
										onClick={handleSignOut}
										className="border-red-900/50 text-red-400 hover:bg-red-950/30"
									>
										Sign Out
									</Button>
								</div>

								<div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t border-red-900/30">
									<div>
										<h3 className="font-medium text-red-400">Delete Account</h3>
										<p className="text-sm text-gray-400">
											Permanently delete your account and all data
										</p>
									</div>
									<Button
										variant="outline"
										size="md"
										onClick={handleDeleteAccount}
										className="border-red-900/50 text-red-400 hover:bg-red-950/30"
									>
										Delete Account
									</Button>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
