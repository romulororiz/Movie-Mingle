'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSupabaseUser } from './useSupabaseUser';

export interface NotificationCounts {
	friendRequests: number;
	totalUnread: number;
}

export function useNotifications() {
	const { user } = useSupabaseUser();
	const [counts, setCounts] = useState<NotificationCounts>({
		friendRequests: 0,
		totalUnread: 0,
	});
	const [isLoading, setIsLoading] = useState(true);

	const fetchCounts = useCallback(async () => {
		if (!user) {
			setCounts({ friendRequests: 0, totalUnread: 0 });
			setIsLoading(false);
			return;
		}

		try {
			const response = await fetch('/api/notifications');
			if (response.ok) {
				const data = (await response.json()) as NotificationCounts;
				setCounts(data);
			}
		} catch (error) {
			console.error('Error fetching notification counts:', error);
		} finally {
			setIsLoading(false);
		}
	}, [user]);

	useEffect(() => {
		fetchCounts();

		// Poll for new notifications every 30 seconds
		const interval = setInterval(fetchCounts, 30000);

		return () => clearInterval(interval);
	}, [fetchCounts]);

	return {
		counts,
		isLoading,
		refetch: fetchCounts,
	};
}

