import React from 'react'
import { makeStyles } from '@material-ui/core'
import ReactLoading from 'react-loading'

const useStyles = makeStyles((theme) => ({
	loading: {
	margin: 'auto',
	marginTop: theme.spacing(7)
	}
}))

const Loading = ({ type, color }) => {
	const classes = useStyles()
	return (
		<ReactLoading className={classes.loading} type={type} color={color} height={100} width={100} />
	)
}

export default Loading

