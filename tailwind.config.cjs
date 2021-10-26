module.exports = {
	mode: 'jit', // ⚠ Make sure to have this
	purge: ['./src/**/*.svelte'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				brand: {
					50: '#faf9f5',
					100: '#f5f3eb',
					200: '#e7e0cd',
					300: '#d8cdaf',
					400: '#bba872',
					500: '#9e8236',
					600: '#8e7531',
					700: '#776229',
					800: '#5f4e20',
					900: '#4d401a'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: [require('daisyui'), require('@tailwindcss/typography')]
};
