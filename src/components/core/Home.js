import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'

import Overview from './Overview'


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		margin: 'auto',
		marginTop: theme.spacing(7),
		padding: `${theme.spacing(3)}px`,
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(1)
		}
	}
}))

const Home = () => {
	const classes = useStyles()



	return (
		<Grid container spacing={3} className={classes.root}>
			<Grid item xs={12}>
				<Overview category={'Electronics'} />
			</Grid>
			<Grid item xs={12}>
				<Overview category={'Books'} />
			</Grid>
			<Grid item xs={12}>
				<Overview category={'Clothing'} />
			</Grid>
		</Grid>

	)
}

export default Home