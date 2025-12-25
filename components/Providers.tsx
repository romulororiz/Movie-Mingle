'use client';

import { useState, type FC, type ReactNode } from 'react';
import { StateProvider } from '@/context/stateContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'sonner';

interface ProvidersProps {
	children: ReactNode;
}

const Providers: FC<ProvidersProps> = ({ children }) => {
	// Create QueryClient inside component to avoid sharing between requests
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						retry: 1,
						staleTime: 5 * 60 * 1000, // 5 minutes
						gcTime: 10 * 60 * 1000, // 10 minutes (was cacheTime in v4)
						refetchOnMount: false,
						refetchOnReconnect: false,
					},
					mutations: {
						retry: 1,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider 
				attribute="class" 
				defaultTheme="dark" 
				enableSystem={false}
				disableTransitionOnChange
				storageKey="movie-mingle-theme"
			>
				<Toaster 
					position="top-right" 
					richColors 
					closeButton 
					duration={3000} 
					theme="dark"
				/>
				<StateProvider>{children}</StateProvider>
			</NextThemesProvider>
		</QueryClientProvider>
	);
};

export default Providers;
