import { Dispatch, SetStateAction, createContext, useContext } from 'react';

interface bgIndexContext {
	activeIndex: number;
	setActiveIndex: Dispatch<SetStateAction<number>>;
}
export const bgIndexContext = createContext<bgIndexContext | null>(null);

export const useBgIndexContext = () => {
	const context = useContext(bgIndexContext);
	if (!context) {
		throw new Error('useBgIndexContext must be used within a SidebarProvider');
	}
	return context;
};
