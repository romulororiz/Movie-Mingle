import { createContext, Dispatch, SetStateAction, useContext } from 'react';

interface SidebarContextValue {
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

export const SidebarContext = createContext<SidebarContextValue | null>(null);

export const useSidebarContext = () => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebarContext must be used within a SidebarProvider');
	}
	return context;
};
