import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_USER } from '../../graphql/mutations'
import { Card, CardContent, Typography, Icon, TextField, CardActions, makeStyles, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import { Link } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 600,
		margin: 'auto',
		marginTop: theme.spacing(7),
		textAlign: 'center'
	},
	title: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle,
		textAlign: 'center'
	},
	textField: {
		width: 300,
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2)
	},
	submit: {
		margin: 'auto',
		marginBottom: theme.spacing(1)
	},
	error: {
		verticalAlign: 'middle'
	}


}))
const Signup = () => {
	const classes = useStyles()
	let timeout
	const [values, setValues] = useState({
		username: '',
		password: '',
		open: false,
		error: ''
	})

	const [ createUser, result ] = useMutation(CREATE_USER, {
		onError: (error) => {
			setValues({ ...values, error: error.graphQLErrors[0].message })
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				setValues({ ...values, error: ''})
			}, 7000)
		}
	})

	useEffect(() => {
		if (result.data) {
			setValues({ ...values, open: true })
		}
	}, [result.data])

	const handleChange = name => event => {
		setValues({ ...values, [name]: event.target.value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault()
		
		if (values.username === '' || values.password === '') {
			setValues({ ...values, error: 'Both fields are required' })
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				setValues({ ...values, error: ''})
			}, 7000)
			return
		}
		createUser({ variables: { username: values.username, password: values.password } })
	}

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant="h6" className={classes.title}>
						Sign Up
					</Typography>
					<TextField id="username" label="Username" type="text" className={classes.textField}
						value={values.username} onChange={handleChange('username')}
						margin="normal" />
					<br />
					<TextField id="password" type="password" label="Password"
						className={classes.textField} value={values.password}
						onChange={handleChange('password')} margin="normal" />
					<br />
					{
						values.error && <Typography component="p" color="error">
							<Icon color="error" className={classes.error}>error</Icon>
							{values.error}
						</Typography>
					}
				</CardContent>
				<CardActions>
					<Button color="secondary"  variant="contained" onClick={handleSubmit}
						className={classes.submit}>
							Submit
						</Button>
				</CardActions>
			</Card>
			<Dialog open={values.open} disableBackdropClick={true}>
				<DialogTitle>New Account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						New account successfully created.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to="/signin">
						<Button color="secondary"  autoFocus="autoFocus" variant="contained">
							Sign In
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default Signup