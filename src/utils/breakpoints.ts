import { WindowSize } from '@/hooks/useWindowSize';

export const isMobile = (windowSize: WindowSize) => windowSize.width! < 640;
export const isTablet = (windowSize: WindowSize) => windowSize.width! < 768;
export const isLaptop = (windowSize: WindowSize) => windowSize.width! < 1024;
export const isDesktop = (windowSize: WindowSize) => windowSize.width! < 1280;
export const isLargeDesktop = (windowSize: WindowSize) => windowSize.width! < 1536;

