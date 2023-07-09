const { fontFamily } = require('tailwindcss/defaultTheme');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
		screens: {
			xs: '576px',
			'2xl': '1536px',
			'3xl': '1920px',
			...defaultTheme.screens,
		},
		extend: {
			fontFamily: {
				interSans: ['var(--font-inter)', ...fontFamily.sans],
			},
			colors: {
				dark: {
					background: '#030e13',
					primary: '#FFFFFF',
					secondary: '#B3B3B3',
					hover: '#707070',
				},
				light: {
					background: '#FFFFFF',
					primary: '#1E1E1E',
					secondary: '#707070',
					hover: '#B3B3B3',
				},
				accent: {
					primary: '#FDBB30',
					secondary: '#c99629',
				},
			},
			keyframes: {
				// Arrow animation Btn
				slideInOut: {
					'0%': { transform: 'translateX(0)', opacity: 1 },
					'25%': { transform: 'translateX(100%)', opacity: 0 },
					'50%': { transform: 'translateX(-100%)', opacity: 0 },
					'100%': { transform: 'translateX(0)', opacity: 1 },
				},
				slideDown: {
					'0%': { transform: 'translateY(-100%)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 },
				},
				slideUp: {
					'0%': { transform: 'translateY(0)', opacity: 1 },
					'100%': { transform: 'translateY(-100%)', opacity: 0 },
				},
				fadeIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
				fadeOut: {
					'0%': { opacity: 1 },
					'100%': { opacity: 0 },
				},
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
			},
			animation: {
				slideInOut: 'slideInOut .75s ease-out',
				slideDown: 'slideDown .75s ease-out',
				slideUp: 'slideUp .75s ease-out',
				fadeIn: 'fadeIn',
				fadeOut: 'fadeOut',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
