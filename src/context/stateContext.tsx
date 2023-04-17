'use client';

import {
	createContext,
	Dispatch,
	SetStateAction,
	useContext,
	useState,
} from 'react';

interface StateContextType {
	sidebarOpen: boolean;
	setSidebarOpen: Dispatch<SetStateAction<boolean>>;
	activeIndex: number;
	setActiveIndex: Dispatch<SetStateAction<number>>;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const useAppState = () => {
	const context = useContext(StateContext);
	if (context === undefined) {
		throw new Error('useAppState must be used within a StateProvider');
	}
	return context;
};

interface StateProviderProps {
	children: React.ReactNode;
}

export const StateProvider = ({ children }: StateProviderProps) => {
	const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
	const [activeIndex, setActiveIndex] = useState<number>(0);

	return (
		<StateContext.Provider
			value={{ sidebarOpen, setSidebarOpen, activeIndex, setActiveIndex }}
		>
			{children}
		</StateContext.Provider>
	);
};
