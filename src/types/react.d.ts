import { DetailedHTMLProps } from 'react';

declare module 'react' {
	interface HTMLAttributes<T>
		extends AriaAttributes,
			DetailedHTMLProps,
			DOMAttributes<T> {
		key?: string | number;
	}
}
