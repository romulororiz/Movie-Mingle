'use client';

import { SessionProvider } from 'next-auth/react';
import { useQueryClient, QueryClient, QueryClientProvider } from 'react-query';
import type { FC, ReactNode } from 'react';

interface ProvidersProps {
	children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: FC<ProvidersProps> = ({ children }) => {
	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</SessionProvider>
	);
};

export default Providers;
