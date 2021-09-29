import React, { useState, useEffect } from 'react'
import { makeStyles, Button, Typography } from '@material-ui/core'
import { useQuery, useMutation } from '@apollo/client'
import { GET_ORDERS_BY_USER } from '../../graphql/queries'
import { MARK_AS_RECEIVED } from '../../graphql/mutations'
import { Link } from 'react-router-dom'
import Loading from '../loading/Loading'


const useStyles = makeStyles((theme) => ({
	tabTabContent: {
		maxWidth: '60%',
		margin: 'auto',
		paddingTop: theme.spacing(8),
		marginTop: theme.spacing(5)
	},
	left: {
		width: '100%'
	},
	image: {
		width: '50%',
		height: 'auto',
	},
	flex: {
		padding: theme.spacing(3),
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	right: {
		flexGow: 2,
		marginRight: theme.spacing(20),
		width: '100%'
	},
	label: {
		
		width: '100%',
		
	},
	sep: {
		paddingBottom: theme.spacing(1.5)
	},
	empty: {
		width: '100%',
		margin: 'auto',
		textAlign: 'center'
	},
	button: {
		marginBottom: theme.spacing(1.5)
	}
}))


const OrdersHistory = ({ finished }) => {
	const result = useQuery(GET_ORDERS_BY_USER)
	const [orders, setOrders] = useState([])
	const classes = useStyles()
	
	const [markReceived] = useMutation(MARK_AS_RECEIVED) // no need for update callback since in this case apollo will merge the objects automatically

	const handleReceived = (id) => {
		markReceived({ variables: { orderId: id } })
	}

	useEffect(() => {
		if(result.data) {
			setOrders(o => o.concat(result.data.getOrdersByUser.filter( or => or.finished === finished)))
		}
	}, [result.data])

	if (result.loading) {
		return <Loading type="spin" color="black" />
	}



	return (
		<div className={classes.tabTabContent}>
			<div>
				{
					orders?.length === 0
					?
					<Typography variant="h3" className={classes.empty}>
						Wow, such empty
					</Typography>
					:
					orders.map(order => (
						<div key={order.id} className={classes.flex}>
							
								<Link to={`/products/product/${order.orderedProduct.id}`} className={classes.left}>
									
										<img className={classes.image} src={`/api/image/${order.orderedProduct.id}`} />
									
								</Link>
								<div className={classes.right}>
									<Link to={`/products/product/${order.orderedProduct.id}`} className={classes.label}>
										<Typography variant="h5" className={classes.label}>
											{order.orderedProduct.label}
										</Typography>
									</Link>
									<Typography variant="body2" className={classes.sep}>
										Quantity: {order.quantity}
									</Typography>
									{
										order.shipped
										&&
										<Typography variant="body2" className={classes.sep}>
										Shipped
										</Typography>
									}
									{
										order.finished
										&&
										<Typography variant="body2" className={classes.sep}>
											finished
										</Typography>
									}
									{
										order.shipped && !order.finished
										&&
										<Button className={classes.button} variant="outlined" onClick={() => handleReceived(order.id)}>Mark as received</Button>
									}
									<Typography variant="body2">
										Created: {new Date(order.created).toDateString()}
									</Typography>
								</div>

						</div>
					))
				}
			</div>
		</div>
	)
}

export default OrdersHistory