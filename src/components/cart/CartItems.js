import { Button, Card, CardContent, Divider, makeStyles, TextField, Typography, Grid } from '@material-ui/core'
import React, { useState } from 'react'
import cart from './cart-helper'
import { Link } from 'react-router-dom'
import Checkout from  './Checkout'
import { useMutation } from '@apollo/client'
import { PLACE_ORDER } from '../../graphql/mutations'
import { GET_ORDERS_BY_USER } from '../../graphql/queries'

const useStyles = makeStyles((theme) => ({
	card: {
		padding: theme.spacing(2),


	},
	
	media: {
		hegith: '40px',
		width: '40px',
		[theme.breakpoints.down('sm')]: {
			width: '150px',
			height: '150px'
		},
		flex: 1
	},
	flex: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	details: {
		padding: theme.spacing(1),
		flex: 2
	},
	productTitle: {
		marginBottom: theme.spacing(2),
		fontSize: '2em',
		[theme.breakpoints.down('sm')]: {
			fontSize: '1em'
		}
	},
	price: {
    color: theme.palette.text.secondary,
    display: 'inline'
  },
	itemTotal: {
    float: 'right',
    marginRight: '40px',
    fontSize: '1.5em',
  },
	textField: {
		marginRight: theme.spacing(1),
		marginLeft: theme.spacing(1),
		width: 50,

	},

	subheading: {
		marginTop: theme.spacing(2)
	},
	total: {
		marginTop: theme.spacing(2),
		padding: theme.spacing(1)
	},
	singleProduct: {
		marginBottom: theme.spacing(2)
	}
}))

const CartItems = () => {
	const classes = useStyles()
	const [items, setItems] = useState(cart.getCart())

	const [placeOrder] = useMutation(PLACE_ORDER, {
		update: (store, response) => {
			let dataInStore
			try {
				dataInStore = store.readQuery({ query: GET_ORDERS_BY_USER })
			} catch (error) {
				return 	store.writeQuery({
					query: GET_ORDERS_BY_USER,
					data: {
						getOrdersByUser: [ response.data.placeOrder ]
					}
				})
			}
			store.writeQuery({
				query: GET_ORDERS_BY_USER,
				data: {
					...dataInStore,
					getOrdersByUser: [ ...dataInStore.getOrdersByUser, response.data.placeOrder ]
				}
			})
		}
	})

	const handleChange = index => event => {
		let updatedItems = items
		updatedItems[index].quantity = event.target.value

		setItems([...updatedItems])
		cart.updateCart(index, event.target.value)
	}

	const removeItem = index => event => {
		let updatedItems = cart.removeItem(index)
		setItems(updatedItems)
	}

	const getTotal = () => {
		return items.reduce((a, b) => {
			return a + (b.quantity * b.product.price)
		}, 0)
	}

	const handleCheckout = () => {
		if (items.length !== 0) {
			items.forEach((i, index) => {
				placeOrder({ variables: { orderedProductId: i.product.id, quantity: Number(i.quantity), address: 'Malta' } })
				cart.removeItem(index)
			})
			return 1
		}
	}


	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={8}>
				<Card className={classes.card}>
					
					{
						items.length > 0 
						?
						<span>
							{
								items.map((i, index) => {
									return (
										<span key={i.product.id}>
											<Card className={classes.singleProduct}>
												<div className={classes.flex}>
													<img className={classes.media} src={`/api/image/${i.product.id}`} />
													<div className={classes.details}>
														<CardContent >
															<Link to={`/product/${i.product.id}`}>
																<Typography className={classes.productTitle} >
																	{i.product.label}
																</Typography>
															</Link>
															<Typography variant="h6" className={classes.price}>
																${i.product.price}
															</Typography>
															<span className={classes.itemTotal}>${i.product.price * i.quantity }</span>
														</CardContent>
														<div className={classes.subheading}>
															<Typography variant="subtitle1" component="span">
																Quantity:
															</Typography>
															<TextField
															value={i.quantity}
															onChange={handleChange(index)}
															type="number"
															className={classes.textField}
															inputProps={{ min: 1, max: i.product.stock }}
															InputLabelProps={{
																shrink: true
															}}
															/>
															<Button onClick={removeItem(index)}>x Remove</Button>
														</div>
													</div>
													
												</div>
											</Card>
											<Divider />
										</span>
									)
								})
								
							}

						</span>
						:
						<Typography variant="subtitle1">
							No items were added to your cart.
							<Typography variant="subtitle1" component="a">
								<Link to="/">
									&nbsp;Shop now
								</Link>
							</Typography>
						</Typography>
					}
				</Card>
			</Grid>
			<Grid item xs={12} md={4}>
					<Checkout handleCheckout={handleCheckout} getTotal={getTotal} />
			</Grid>
		</Grid>
	)
}

export default CartItems