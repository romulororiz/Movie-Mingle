'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/Icon';

interface ThemeToggleProps {
	text?: boolean;
}

export function ThemeToggle({ text = false }: ThemeToggleProps) {
	const { setTheme, theme } = useTheme();

	return (
		<div className='flex items-center'>
			<Button
				variant='ghost'
				className='-mb-2 p-0 mt-0'
				onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
			>
				<Icon
					name='Sun'
					className='rotate-0 h-5 w-5 scale-100 transition-all dark:-rotate-90 dark:scale-0 hover:stroke-accent-secondary'
					aria-hidden='true'
				/>
				<Icon
					name='Moon'
					className='absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 hover:stroke-accent-secondary'
					aria-hidden='true'
				/>
				<span className='sr-only'>Toggle theme</span>
			</Button>
			{text && (
				<span className='ml-2 text-sm font-medium text-slate-700 dark:text-slate-300 relative top-1'>
					{theme === 'light' ? 'Dark' : 'Light'}
				</span>
			)}
		</div>
	);
}
