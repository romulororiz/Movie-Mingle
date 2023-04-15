'use client';

import { SessionProvider } from 'next-auth/react';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SidebarContext } from '@/context/sidebarContext';
import { bgIndexContext } from '@/context/bgIndexContext';

interface ProvidersProps {
	children: ReactNode;

	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;

	activeIndex: number;
	setActiveIndex: Dispatch<SetStateAction<number>>;
}

const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({
	children,
	sidebarOpen,
	setSidebarOpen,

	activeIndex,
	setActiveIndex,
}) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SidebarContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
				<bgIndexContext.Provider value={{ activeIndex, setActiveIndex }}>
					<SessionProvider>{children}</SessionProvider>
				</bgIndexContext.Provider>
			</SidebarContext.Provider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Providers;
