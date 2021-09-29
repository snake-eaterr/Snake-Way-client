import React, { useState, useMemo } from 'react'
import { GET_PRODUCT_BY_ID } from '../../graphql/queries'
import { useQuery, useMutation } from '@apollo/client'
import { Grid, Typography, makeStyles, Card, CardHeader, CardContent, CardActions, Button } from '@material-ui/core'
import { Redirect, useParams } from 'react-router-dom'
import cart from '../cart/cart-helper'
import Reviews from './Reviews'
import { ADD_REVIEW } from '../../graphql/mutations'
import Rating from '@material-ui/lab/Rating'
import Loading from '../loading/Loading'


const useStyles = makeStyles(theme => ({
	root: {
		marginTop: theme.spacing(7),
		padding: theme.spacing(3)
	},
	priceTag: {
		color: 'hsl(0, 80%, 50%)',

	},
	title: {
		padding: `${theme.spacing(2)}px 0 ${theme.spacing(2)}px 0`,

	},

	bodyText: {
		marginTop: theme.spacing(3),
		fontWeight: 100
	},
	

	media: {
		hegith: 'auto',
		width: '100%'
	},
	flex: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column'
	},
	quantity: {
		width: '90%',
		marginBottom: theme.spacing(2),
		color: 'black'
	},
	flexRow: {
		display: 'flex',
		marginBottom: theme.spacing(0.5)

	},
	ratingCount: {
		marginLeft: theme.spacing(1)
	},



}))

const Product = () => {
	const classes = useStyles()
	const productId = useParams().productId

	const [quantity, setQuantity] = useState(null)
	const [redirect, setRedirect] = useState(false)


	const handleAddToCart = (event) => {
		event.preventDefault()

		cart.addItem(result.data.getProductById, () => {
			setRedirect(!redirect)
		})
	}

	const result = useQuery(GET_PRODUCT_BY_ID, {
		variables: { productId: productId }
	})

	// the averageRating computation is a good target for the useMemo hook
	const averageRating = useMemo(() => {
		if (result.data) {
			const sum = result.data.getProductById.reviews.reduce((a, b) => {
				return a + b.rating
			}, 0)
			console.log('sum', sum)
			return sum / result.data.getProductById.reviews.length
		}
		
	}, [result.data])

	const [addReview] = useMutation(ADD_REVIEW, {
		update: (store, response) => {
			const dataInStore = store.readQuery({ query: GET_PRODUCT_BY_ID })
			store.writeQuery({
				query: GET_PRODUCT_BY_ID,
				data: {
					...dataInStore,
					getProductById:  response.data.addReview 
				}
			})
		}
	})




	if (result.loading) {
		return <Loading type="spin" color="black" />
	}
	
	if (redirect) {
		return <Redirect to="/cart" />
	}
	return (
		<div>
			<Grid container spacing={3} className={classes.root}>
				<Grid item xs={12} md={5}>
					<img className={classes.media} src={`/api/image/${productId}`} alt="product" />
				</Grid>
				<Grid item xs={12} md={5}>
					<Typography variant="h4" className={classes.title}>
						{result.data.getProductById.label}
					</Typography>
					
					<div className={classes.flexRow}>
						<Rating value={averageRating} readOnly />
						<Typography className={classes.ratingCount} component="span" variant="body1">
							{result.data.getProductById.reviews.length} ratings
						</Typography>
					</div>
					<Typography variant="body1">
						Price: <span className={classes.priceTag}>${result.data.getProductById.price}</span>
					</Typography>
					<Typography variant='body2' className={classes.bodyText}>
						{result.data.getProductById.description}
					</Typography>
				</Grid>
				<Grid item xs={12} md={2}>
					<Card variant="outlined">
						<CardHeader title={
							<Typography variant="body1">
								<span className={classes.priceTag}>${result.data.getProductById.price}</span>
						</Typography>
						} />
						<CardContent>
							{
								result.data.getProductById.stock > 0
								?
								<Typography variant="body2">
									In stock. Order soon.
								</Typography>
								:
								<Typography variant="body2">
									Out of stock.
								</Typography>
							}
						</CardContent>
						<CardActions>
							<form className={classes.flex} onSubmit={handleAddToCart}>
								<Button type="submit" variant="contained" color="secondary">Add to cart</Button>
							</form>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
			<Reviews reviews={result.data.getProductById.reviews} addReview={addReview} productId={productId} />
		</div>
	)
}

export default Product