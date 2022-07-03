module.exports = {
	content: ['./src/**/*.{jsx,js,html}'],
	theme: {
		extend: {
			colors: {
				'cream': '#F8F7F3'
			}
		},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('autoprefixer')
	],
}
