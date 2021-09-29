import React from 'react'
import { TextField, makeStyles, fade, Typography } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { Search as SearchIcon } from '@material-ui/icons'
import { useQuery } from '@apollo/client'
import { ALL_PRODUCTS } from '../../graphql/queries'
import { Link } from 'react-router-dom'
import ContentLoader from 'react-content-loader'

const SearchLoader = (props) => (
	<ContentLoader 
    speed={2}
    width={400}
    height={32}
    viewBox="0 0 600 100"
    backgroundColor="#c7bdbd"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="520" y="166" rx="3" ry="3" width="88" height="6" /> 
    <rect x="547" y="169" rx="3" ry="3" width="52" height="6" /> 
    <circle cx="577" cy="171" r="20" /> 
    <rect x="36" y="120" rx="0" ry="0" width="341" height="173" /> 
    <rect x="308" y="95" rx="0" ry="0" width="5" height="1" /> 
    <rect x="33" y="1" rx="0" ry="0" width="279" height="51" />
  </ContentLoader>
)

const useStyles = makeStyles(theme => ({
	search: {
    position: 'relative',
    borderRadius: '5px',
    backgroundColor: fade(theme.palette.primary.dark, 0.85),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.dark, 1),
    },
 
		[theme.breakpoints.down('sm')]: {
			flexGrow: 2,
			marginLeft: theme.spacing(2)
		},
    width: theme.spacing(50),
		marginLeft: theme.spacing(2),
		padding: `${theme.spacing(1.2)}px ${theme.spacing(2)}px`
  },

	searchIcon: {
    padding: theme.spacing(0, 2),
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(0, 0.5)
		},
    height: '100%',
    position: 'absolute',
    top: '16px'
  },
	inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		[theme.breakpoints.down('sm')]: {
			paddingLeft: `calc(1em + ${theme.spacing(2)}px)`
		},
		width: theme.spacing(40),
		fontWeight: 200
  },
}))

const Search = () => {
	const classes = useStyles()
	
	

	const result = useQuery(ALL_PRODUCTS)
	

	if (result.loading) {
		return (
			<SearchLoader />
		)
	}


	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			
			<Autocomplete

				disableClearable
				
				options={result.data.allProducts}
				renderOption={(option) => (
					<Link to={`/products/product/${option.id}`}>
						<Typography>
							{option.label}
						</Typography>
					</Link>
				)}
				getOptionLabel={(option => option.label)}
				renderInput={(params) => (
				<TextField
					{ ...params }
					placeholder="Search products…"
					
					className={classes.inputInput}
				/>
				
					
				)}
			/>
		</div>
	)
}
export default Search