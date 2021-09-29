import React from 'react'
import { Card, Typography, Grid, CardContent, makeStyles, CardHeader } from '@material-ui/core'
import { ChevronRight } from '@material-ui/icons'

import { useQuery } from '@apollo/client'
import { GET_BY_CATEGORY } from '../../graphql/queries'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

const OverViewLoader = (props) => (
	<ContentLoader 
    speed={2}
    width={1271}
    height={302}
    viewBox="0 0 600 100"
    backgroundColor="#c7bdbd"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="520" y="166" rx="3" ry="3" width="88" height="6" /> 
    <rect x="547" y="169" rx="3" ry="3" width="52" height="6" /> 
    <circle cx="577" cy="171" r="20" /> 
    <rect x="36" y="120" rx="0" ry="0" width="341" height="173" /> 
    <rect x="4" y="-23" rx="0" ry="0" width="543" height="214" />
  </ContentLoader>
)

const useStyles = makeStyles(theme => ({
	chevron: {
		alignSelf: 'center'
	},
	card: {
		padding: 0
	},
	media: {
		width: 'auto',
		[theme.breakpoints.down('sm')]: {
			width: '100%',
			height: 'auto'
		}
	}
}))

const Overview = ({ category }) => {
	const classes = useStyles()
	const result = useQuery(GET_BY_CATEGORY, {
		variables: { category: category, limit: 'YES' }
	})
	if (result.loading) {
		return (
			<OverViewLoader />
		)
	}

	return (
		<Card>
			<CardHeader title={
				<Link to={`/products/${category}`}>
					{category}
				</Link>
			}
			/>
			<CardContent>
				<Grid container spacing={3}>
					{
						result.data.getByCategory.map(p => {
							return (
								<Grid item xs={12} md={2} key={p.id}>
									<Link to={`/products/product/${p.id}`}>
										<Card variant="outlined">
											<CardHeader title={p.label} />
											<img
												src={`/api/image/${p.id}`}
												className={classes.media}
												height="140"
												alt="product"
											/>
											<CardContent>
												<Typography variant="body2" component="p">
													{ // Don't show whole description in overview
														p.description.length < 60
														?
														p.description
														:
														p.description.slice(0, 60)
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
					<Link to={`/products/${category}`}>
						<ChevronRight className={classes.chevron} />
					</Link>
				</Grid>
			</CardContent>
			
		</Card>
	)
}

Overview.propTypes = {
	category: PropTypes.string.isRequired
}

export default Overview