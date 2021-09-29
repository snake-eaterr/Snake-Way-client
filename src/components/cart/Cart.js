import { makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import CartItems from './CartItems'



const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		margin: 'auto',
		marginTop: theme.spacing(7),
		padding: `${theme.spacing(3)}px`,
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(1)
		}
	},
	heading: {
		padding: theme.spacing(3),
		textAlign: 'left',
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(2, 2, 2, 0)
		}
	},
}))

const Cart = () => {
	const classes = useStyles()
	return (
		<div className={classes.root}>
			<Typography variant="h3" className={classes.heading}>
					Shopping Cart
			</Typography>
			<CartItems />
		</div>
	)
}

export default Cart