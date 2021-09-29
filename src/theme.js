import { createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#ffffff',
			light: '#ffffff',
			dark: '#cccccc',
			contrastText: '#000000'
		},
		secondary: {
			main: '#000000',
			light: '#2c2c2c',
			dark: '#000000'
		}
	},
	typography: {
		fontFamily: ['IBM Plex Mono', 'monospace', ].join(', ')
	}
})

export default theme