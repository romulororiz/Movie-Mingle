import { WindowSize } from '@/hooks/useWindowSize';

const isMobile = (windowSize: WindowSize) => windowSize.width! < 640;
const isTablet = (windowSize: WindowSize) => windowSize.width! < 768;
const isLaptop = (windowSize: WindowSize) => windowSize.width! < 1024;
const isDesktop = (windowSize: WindowSize) => windowSize.width! < 1280;
const isLargeDesktop = (windowSize: WindowSize) => windowSize.width! < 1536;

export { isMobile, isTablet, isLaptop, isDesktop, isLargeDesktop };
