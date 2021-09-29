import React from 'react'
import { GET_BY_CATEGORY } from '../../graphql/queries'
import { useQuery } from '@apollo/client'
import { Grid, Typography, makeStyles, Card, CardHeader, CardContent } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'


const useStyles = makeStyles(theme => ({
	root: {
		margin: 'auto',
		marginTop: theme.spacing(5),
		padding: `${theme.spacing(3)}px`
	},
	grid: {
		flexGrow: 1
	},
	heading: {
		padding: theme.spacing(3),
		textAlign: 'left',
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(2, 2, 2, 0)
		}
	},
	media: {
		hegith: 'auto',
		width: '100%'
	}
}))

const Category = () => {
	const classes = useStyles()
	const category = useParams().category
	console.log(category)

	const result = useQuery(GET_BY_CATEGORY, {
		variables: { category: category, limit: 'NO' } 
	})

	if (result.loading) {
		return <div>loading...</div>
	}

	return (
		<div className={classes.root}>
			<Typography variant="h3" className={classes.heading}>
				{category}
			</Typography>
			<Grid container spacing={3} className={classes.grid}>
				{
					result.data.getByCategory.map(p => {
						return (
							<Grid item xs={4}>
								<Link to={`/products/product/${p.id}`}>
										<Card variant="outlined">
											<CardHeader title={p.label} />
											<img
												src={`/api/image/${p.id}`}
												className={classes.media}

												alt="product"
											/>
											<CardContent>
												<Typography variant="body2" component="p">
													{ // Don't show whole description in overview
														p.description.length < 100
														?
														p.description
														:
														p.description.slice(0, 100)
													}
													...
												</Typography>
											</CardContent>
										</Card>
									</Link>
							</Grid>
						)
					})
				}
			</Grid>
		</div>
	)
}

export default Category