import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

const useStyles = makeStyles(theme => ({
	root: {
		
		backgroundColor: 'rgb(241, 241, 241)',
		minHeight: 100,
		padding: theme.spacing(3),
	
	},
	footerHeader: {
		marginTop: theme.spacing(10),
		textAlign: 'center',

	},
	link: {
		textAlign: 'center',
		marginTop: theme.spacing(2)
	}
}))

const Footer = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Typography className={classes.footerHeader} variant="h5">
				Snake Way Commerce
			</Typography>
			<div className={classes.link}>
				<a href="https://github.com/snake-eaterr?tab=repositories" target="_blank" rel="noreferrer">
					<Typography varinat="h6">
						<FontAwesomeIcon icon={faGithub} /> snake-eaterr
					</Typography>
				</a>
			</div>
		</div>
	)
}

export default Footer