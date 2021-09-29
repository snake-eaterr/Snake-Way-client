import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import theme from './theme'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'


const App = () => {
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<MainRouter />
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App