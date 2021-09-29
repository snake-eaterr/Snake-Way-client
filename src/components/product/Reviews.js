import React, { useState } from 'react'
import { makeStyles, Card, CardHeader, TextField, Icon, Button, Typography, CardContent } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import auth from '../auth-helper'




const useStyles = makeStyles((theme) => ({
	commentField: {
		width: '40%'
	},
	root: {
		marginTop: theme.spacing(7),
		padding: theme.spacing(3)
	},
	reviewBody: {
		border: 'none'
	},
	text: {
		padding: theme.spacing(1)
	},
	loginto: {
		marginLeft: theme.spacing(2)
	}
}))

const Reviews = ({ reviews, addReview, productId }) => {
	const classes = useStyles()
	const [text, setText] = useState('')
	const [rating, setRating] = useState(null)
	const [error, setError] = useState('')
	
	let timeout

	const handleAdd = (event) => {
		event.preventDefault()
		if (rating === null) {
			setError('Rate before posting review')
			clearTimeout(timeout)
			timeout = setTimeout(() => {
				setError('')
			}, 6000)
			return
		}

		addReview({ variables: { body: text, rating: Number(rating), productId } })
		setText('')
		setRating(null)

	}

	console.log(typeof addReview)

	const commentBody = item => {
		return (
			<Card variant="outlined" className={classes.reviewBody}>
				<CardHeader
					title={
						<Typography variant="subtitle2">
							{item.postedBy.username}
						</Typography>
					
					}
					subheader={
						<Rating
							name="simple-controlled"
							value={item.rating}
							readOnly
						/>
					}

				/>
				<CardContent>
					<Typography variant="body2" className={classes.text}>
						{item.text}
					</Typography>
				</CardContent>
			</Card>
		)
	}


	return (
		<Card className={classes.root}>
			{
				auth.isAuthenticated()
				?
				<CardHeader
					title={
						<form onSubmit={handleAdd}>
								{
							error && <Typography component="p" color="error">
								<Icon  color="error" className={classes.error}>error</Icon>
								{error}
							</Typography>
						}
							<Rating name="pristine" value={rating} onChange={(event) => setRating(event.target.value)} />
							<br />
							<TextField
								multiline
								value={text}
								required
								onChange={(event) => setText(event.target.value)}
								placeholder="Write a review..."
								margin="normal"
								className={classes.commentField}
							/>
							<Button type="submit" variant="contained">post</Button>
							
						</form>
					}
					
				/>
				:
				<Typography variant="h6" className={classes.loginto}>
					Log in to write a review
				</Typography>
			}
			{
				reviews.map(r => {
					return (
						<CardHeader
							title={commentBody(r)}
							key={r.id}
						/>
					)
				})
			}
		</Card>
	)

}

export default Reviews