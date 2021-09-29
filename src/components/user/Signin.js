import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardActions, makeStyles, Typography, TextField, Icon, Button } from '@material-ui/core'
import { useMutation } from '@apollo/client'
import { Redirect } from 'react-router-dom'
import { LOGIN } from '../../graphql/mutations'

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

const Signin = (props) => {
	const classes = useStyles()
	let timeout // To handle error screen time
	const [ values, setValues ] = useState({
		username: '',
		password: '',
		error: '',
		redirectToReferrer: false
	})

	const [ login, result ] = useMutation(LOGIN, {
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
			const token = result.data.login.value
			localStorage.setItem('snake-way-login', token)
			setValues({ ...values, redirectToReferrer: true })
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

		login({ variables: { username: values.username, password: values.password } })
	}

	const { from } = props.location.state || {
		from: { pathname: '/' }
 	}

	const { redirectToReferrer } = values

 	if (redirectToReferrer) {
	 	return <Redirect to={from} />
	}

	return (
		<div>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant="h6" className={classes.title}>
						Login
					</Typography>
					<TextField id="username" type="text" label="Username"
						className={classes.textField} value={values.username}
						onChange={handleChange('username')}
						margin="normal"/>
					<br />
					<TextField id="password" type="password" label="Password"
						className={classes.textField} value={values.password}
						onChange={handleChange('password')} margin="normal"/>
					<br />
					{
						values.error && <Typography component="p" color="error">
							<Icon  color="error" className={classes.error}>error</Icon>
							{values.error}
						</Typography>
					}
				</CardContent>
				<CardActions>
					<Button color="secondary" variant="contained" onClick={handleSubmit}
						className={classes.submit}>
							Login
						</Button>
				</CardActions>
			</Card>
			</div>
	)
}

export default Signin