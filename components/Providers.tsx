'use client';

import type { FC, ReactNode } from 'react';
import { StateProvider } from '@/context/stateContext';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Toaster } from 'sonner';

interface ProvidersProps {
	children: ReactNode;
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
});

const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<NextThemesProvider attribute='class' defaultTheme='dark'>
				<Toaster />
				<StateProvider>
					<SessionProvider>{children}</SessionProvider>
				</StateProvider>
			</NextThemesProvider>
		</QueryClientProvider>
	);
};

export default Providers;
