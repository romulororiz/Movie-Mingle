'use client';

import { SessionProvider } from 'next-auth/react';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SidebarContext } from '@/context/sidebarContext';

interface ProvidersProps {
	children: ReactNode;
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({
	children,
	sidebarOpen,
	setSidebarOpen,
}) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
				<SessionProvider>{children}</SessionProvider>
			</SidebarContext.Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Providers;
