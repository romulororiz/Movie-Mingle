'use client';

import { StateProvider } from '@/context/stateContext';
import { SessionProvider } from 'next-auth/react';
import type { FC, ReactNode } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
	children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<StateProvider>
				<SessionProvider>{children}</SessionProvider>
			</StateProvider>
			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	);
};

export default Providers;
