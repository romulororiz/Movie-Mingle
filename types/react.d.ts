import { DetailedHTMLProps } from 'react';

declare module 'react' {
	// eslint-disable-next-line no-unused-vars
	interface HTMLAttributes<T>
		extends AriaAttributes,
			DetailedHTMLProps,
			DOMAttributes<T> {
		key?: string | number;
	}
}
