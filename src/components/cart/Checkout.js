import React, { useState } from 'react'

import { Card, CardContent, CardHeader, makeStyles, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import auth from '../auth-helper'
import { Link, Redirect, useHistory } from 'react-router-dom'



const useStyles = makeStyles((theme) => ({
	total: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(1)
	},
	contButton: {
		marginLeft: theme.spacing(2)
	}
}))


const Checkout = (props) => {
	const classes = useStyles()
	const [redirect, setRedirect] = useState(false)
	const [open, setOpen] = useState(false)
	const history = useHistory()

	const handleCheckout = () => {
		const x = props.handleCheckout()
		if (x === 1) {
			setOpen(true)
		}
	}
	if (redirect) {
		return <Redirect to={{
			pathname: '/signin',
			state: { from: history.location.pathname }
		}} />
	}

	return (
		<div>
			<Card>
				<CardHeader title={<Typography variant="subtitle1" className={classes.total}>Total: ${props.getTotal()}</Typography>} />
				<CardContent>
					
					{
						auth.isAuthenticated()
						?
						<Button color="secondary" variant="contained" onClick={handleCheckout}>Checkout</Button>
						:
						<div>

							<Button color="secondary" variant="contained" onClick={() => setRedirect(true)}>Sign in to checkout</Button>

							<Link to='/' >
								<Button variant="contained" className={classes.contButton}>Continue Shopping</Button>
							</Link>
						</div>
					}
				</CardContent>
			</Card>
			<Dialog open={open} disableBackdropClick>
				<DialogTitle>New Order</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Order successfully placed.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to="/profile?tab=1">
						<Button color="secondary"  autoFocus="autoFocus" variant="contained">
							Track order
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Checkout