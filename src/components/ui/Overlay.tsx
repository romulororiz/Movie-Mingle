import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { FC } from 'react';

interface OverlayProps {
	className?: string;
}

const overlayClasses = cva('absolute inset-0 w-full h-full');

const Overlay: FC<OverlayProps> = ({ className }) => {
	return <div className={cn(overlayClasses({ className }))}></div>;
};

export default Overlay;
