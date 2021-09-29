import React, { useEffect, useState } from 'react'
import { CardContent, Card, AppBar, TextField, CardActions, Button, makeStyles, Typography, Tabs, Tab } from '@material-ui/core'
import { useQuery, useMutation } from '@apollo/client'
import { ME } from '../../graphql/queries'
import { UPDATE_USERNAME, UPDATE_PASSWORD  } from '../../graphql/mutations'
import Alert from '@material-ui/lab/Alert'
import { parse } from 'query-string'
import ReactLoading from 'react-loading'
import OrdersHistory from './OrdersHistory'
import { useLocation } from 'react-router'

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: 'auto',
		marginTop: theme.spacing(7),
		

		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(1)
		}
	},
	header: {
		padding: theme.spacing(3)
	},
	tabs: {
		boxShadow: 'none'
	},
	tabContent: {
		backgroundColor: 'rgb(241, 241, 241)'
	},
	tabTabContent: {
		maxWidth: '60%',
		margin: 'auto',
		paddingTop: theme.spacing(8),
		marginTop: theme.spacing(5)
	},
	button: {
		marginLeft: theme.spacing(1)
	},
	passwordTextFiled: {
		marginTop: theme.spacing(5)
	},
	
	loading: {
		width: 300,
		margin: 'auto',
		marginTop: theme.spacing(5),
		padding: theme.spacing(10)
	}

}))

const Profile = () => {
	const classes = useStyles()
	const queryTab = parse(useLocation().search)
	console.log(queryTab)
	let timeout
	const result = useQuery(ME)

	const [values, setValues] = useState({
		tab: Number(queryTab.tab) || 0, // show tab 1 if redirected from checkout, otherwise default to tab 0
		username: '',
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
		confirm: false,
		passError: '',
		passSuccess: '',
		userError: '',
		userSuccess: ''
	})


	const handleNotification = (name, message) => {
		setValues({ ...values, [name]: message })
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			setValues({ ...values, [name]: '' })
		}, 7000)
	}

	const [updateUsername, userResult] = useMutation(UPDATE_USERNAME, {
		onError: (error) => {
			handleNotification('userError', error.graphQLErrors[0].message)
		},
	})

	const [updatePassword, passwordResult] = useMutation(UPDATE_PASSWORD, {
		onError: (error) => {
			handleNotification('passError', error.graphQLErrors[0].message)
		},
	})

	const handleUsername = () => {
		if (values.username !== '') {
			updateUsername({ variables: { newUsername: values.username } })
		}
	}

	const handlePassword = () => {
		
		if ((!values.oldPassword || !values.newPassword || !values.confirmPassword) || !values.confirm) {
			console.log(values.confirm)
			setValues({ ...values, error: 'All fields required and passwords must match', })
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				setValues({ ...values, error: '' })
			}, 7000)
			return
		}
		updatePassword({ variables: { oldPassword: values.oldPassword, newPassword: values.newPassword } })
		setValues({ ...values, oldPassword: '', newPassword: '', confirmPassword: '', confrim: false })
	}

	useEffect(() => {
		if (values.confirmPassword && values.newPassword) {
			if (values.confirmPassword !== values.newPassword) {
				setValues({ ...values, error: `Passwords don't match`, confirm: false })
			} else {
				setValues({ ...values, error: '', confirm: true })
			}
		} else {
			setValues({ ...values, error: '', confirm: false })
		}
	}, [values.newPassword, values.confirmPassword])
	

	useEffect(() => {
		if (result.data) {
			setValues({ ...values, username: result.data.me.username })

		}
	}, [result.data])

	useEffect(() => {
		if (userResult.data) {
			setValues({ ...values, username: userResult.data.updateUsername.username })
			handleNotification('userSuccess', 'Username updated successfuly')
		}
	}, [userResult.data])

	useEffect(() => {
		if (passwordResult.data) {
			handleNotification('passSuccess', 'Password updated successfuly')
		}
	}, [passwordResult.data])

	const handleChange = name => event => {
		
		setValues({ ...values, [name]: event.target.value})
	}

	const handleTabChange = (event, v) => {
		setValues({ ...values, tab: v })
	}

	

	if (result.loading) {
		return <ReactLoading className={classes.loading} type="spin" color="black" height={100} width={100} />
	}

	return (
		<div className={classes.root}>
			<AppBar position="static" color="primary" className={classes.tabs}>
				<Tabs
					value={values.tab}
					onChange={handleTabChange}
					indicatorColor="secondary"
					textColor="black"
					variant="fullWidth"
				>
					<Tab label="Account Info" />
					<Tab label="Open Orders" />
					<Tab label="Finished Orders" />
				</Tabs>
				<div className={classes.tabContent}>
					{
						values.tab === 0
						&&
						<div>
							<div className={classes.tabTabContent}>
								<Typography  variant="h6">
									Basic details
								</Typography>
								<Card variant="outlined">
									
									<CardContent>
										<TextField id="username" label="Username"
											value={values.username}
											onChange={handleChange('username')}
											variant="filled"
											fullWidth
										/>
										{
											values.userSuccess
											&&
											<Alert severity="success">{values.userSuccess}</Alert>
										}
										
										{
											values.userError
											&&
											<Alert severity="error">{values.userError}</Alert>
										}
										
									</CardContent>
									<CardActions>
										<Button className={classes.button} onClick={handleUsername} variant="contained" color="secondary">Save</Button>
									</CardActions>
								</Card>
							</div>
							<div className={classes.tabTabContent}>
								<Typography  variant="h6">
									Password
								</Typography>
								<Card variant="outlined">
									<CardContent>
										<TextField id="oldPassword" label="Old password"
											value={values.oldPassword}
											onChange={handleChange('oldPassword')}
											variant="filled"
											fullWidth
											type="password"
										/>
										<TextField id="newPassword" label="New password"
											placeholder="At least 8 characters..."
											value={values.newPassword}
											onChange={handleChange('newPassword')}
											variant="filled"
											fullWidth
											className={classes.passwordTextFiled}
											type="password"
										/>
										
										<TextField id="confirmPassword" label="Confrim password"
											value={values.confirmPassword}
											onChange={handleChange('confirmPassword')}
											variant="filled"
											fullWidth
											className={classes.passwordTextFiled}
											type="password"
										/>
										{
											values.passError
											&&
											<Alert severity="error">{values.passError}</Alert>
										}
										{
											values.passSuccess
											&&
											<Alert severity="success">{values.passSuccess}</Alert>
										}
									</CardContent>
									<CardActions>
										<Button className={classes.button} onClick={handlePassword} variant="contained" color="secondary">Save</Button>
									</CardActions>
								</Card>
							</div>
							
						</div>
					}
					{
						values.tab === 1
						&&
						<OrdersHistory finished={false} />
						
					}
					{
						values.tab === 2
						&&
						<OrdersHistory finished={true} />
					}
				</div>
			</AppBar>
			
		
		</div>
	)
}

export default Profile