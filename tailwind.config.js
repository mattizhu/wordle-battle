module.exports = {
	content: ['./src/**/*.{jsx,js,html}'],
	theme: {
		extend: {
			screens: {
				'tall': {
					'raw': '(min-height: 650px)'
				}
			},
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
