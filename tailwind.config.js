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
			padding: '1.5rem',
			screens: {
				sm: '640px',
				md: '768px',
				lg: '1024px',
				xl: '1280px',
				'2xl': '1536px',
				'3xl': '1920px',
			},
		},
		extend: {
			fontFamily: {
				interSans: ['var(--font-inter)', ...fontFamily.sans],
				robotoSans: ['var(--font-roboto)', ...fontFamily.sans],
			},
			backgroundColor: {
				'dark-background': '#05161E',
				'light-background': '#FFFFFF',
				'dark-hover': '#707070',
				'light-hover': '#B3B3B3',
			},
			textColor: {
				'dark-primary': '#FFFFFF',
				'dark-secondary': '#B3B3B3',
				'light-primary': '#1E1E1E',
				'light-secondary': '#707070',
			},
			borderColor: {
				'dark-hover': '#707070',
				'light-hover': '#B3B3B3',
			},
			accent: {
				DEFAULT: '#FDBB30',
			},
		},
	},
	plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
