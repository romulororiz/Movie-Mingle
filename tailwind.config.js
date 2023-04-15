const { fontFamily } = require('tailwindcss/defaultTheme');

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
			screens: {
				xs: '576px',
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
				'3xl': '1920px',
			},
		},
		screens: {
			xs: '576px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
			'3xl': '1920px',
		},
		extend: {
			fontFamily: {
				interSans: ['var(--font-inter)', ...fontFamily.sans],
				robotoSans: ['var(--font-roboto)', ...fontFamily.sans],
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
					default: '#FDBB30',
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
			},
			animation: {
				// Arrow animation Btn
				slideInOut: 'slideInOut .75s  ease-out',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
