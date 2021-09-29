import React, { useState } from 'react'
import { makeStyles, AppBar, Toolbar, IconButton, withStyles, Badge, Typography, useScrollTrigger, Slide, Button, Menu as Mmenu, MenuItem } from '@material-ui/core'
import { AccountCircle, MoreVert, ShoppingCart } from '@material-ui/icons'
import { withRouter, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import authHelper from '../auth-helper'
import Search from './Search'
import cart from '../cart/cart-helper'
import { useApolloClient } from '@apollo/client'



const useStyles = makeStyles((theme) => ({
	bar: {
		boxShadow: 'none',
		backgroundColor: theme.palette.primary

	},

	span: {
		[theme.breakpoints.up('md')]: {
			marginLeft: 'auto'
		}
	},
	desktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		},
		
	},
	mobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		} 
	},
	index: {
		zIndex: 1000
	}


}))


const StyledBadge = withStyles((theme) => ({
	badge: {
		right: 5,
		top: 13,
		padding: '0 4px'
	}
}))(Badge)


const HideOnScroll = ({ children }) => {
	const trigger = useScrollTrigger({ target: window })

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	)
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired
}

const Menu = withRouter(({ history }) => {
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const [MobileAnchorEl, setMobileAnchorEl] = useState(null)
	const client = useApolloClient()

	const handlePrimaryMenuOpen = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handlePrimaryMenuClose = (cb) => {
		setAnchorEl(null)
		if (typeof cb === 'function') {
			cb()
		}
	}

	const handleMobileMenuOpen = (event) => {
		setMobileAnchorEl(event.currentTarget)
	}
	const handleMobileMenuClose = () => {
		setMobileAnchorEl(null)
	}

	const handleLogout = () => {
		localStorage.clear()
		client.resetStore()
		history.push('/')
	}
	



	const menuId = 'primary-menu'
	const renderMenu = (
		<Mmenu
		id={menuId}
		anchorEl={anchorEl}
		anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		keepMounted
		transformOrigin={{ vertical: 'top', horizontal: 'right' }}
		open={Boolean(anchorEl)}
		onClose={handlePrimaryMenuClose}
		className={classes.index}


		>
			<MenuItem onClick={handlePrimaryMenuClose}>
				<Link to="/profile">
					Profile
				</Link>
			</MenuItem>
			<MenuItem onClick={() => handlePrimaryMenuClose(handleLogout)}>Logout</MenuItem>
		</Mmenu>
	)
	const mobileMenuId = 'mobile-menu'
	const renderMobileMenu = (
    <Mmenu
      anchorEl={MobileAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={Boolean(MobileAnchorEl)}
      onClose={handleMobileMenuClose}
    >
			<MenuItem>
				<IconButton color="inherit" edge="start">
					<ShoppingCart />
				</IconButton>
				<p>Cart</p>
			</MenuItem>
      <MenuItem onClick={handlePrimaryMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
					edge="start"
					
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
			
    </Mmenu>
  )
	return (
		<div>
			<HideOnScroll>
				<AppBar className={classes.bar}>
					<Toolbar>
						<Link to="/">
							<Typography variant="h6" className={classes.title} color="inherit">
								Snake Way
							</Typography>
						</Link>
						<Search />
						{
							!authHelper.isAuthenticated()
							&&
							<span className={classes.span}>
									<Link to="/cart">
										<StyledBadge color="secondary"  badgeContent={cart.totalItems()}>
											<IconButton aria-label="cart" color="inherit" edge="start">
												<ShoppingCart />
											</IconButton>
										</StyledBadge>
									</Link>
									<Link to="/signup">
										<Button>
											Signup
										</Button>
									</Link>
									<Link to="/signin">
										<Button>
											Login
										</Button>
									</Link>
							
								
							</span>

						}
						{
							authHelper.isAuthenticated()
							&&
							<span className={classes.span}>
								<span className={classes.desktop}>
									<Link to="/cart">
										<StyledBadge color="secondary"  badgeContent={cart.totalItems()}>
											<IconButton aria-label="cart" color="inherit" edge="start">
												<ShoppingCart />
											</IconButton>
										</StyledBadge>
									</Link>
									<IconButton
									edge="end"
									aria-label="account of current user"
									aria-controls={menuId}
									aria-haspopup="true"
									onClick={handlePrimaryMenuOpen}
									color="inherit"
									className={classes.desktopCart}
									>
										<AccountCircle />
									</IconButton>
								</span>
								<div className={classes.mobile}>
								<IconButton
									aria-label="show more"
									aria-controls={mobileMenuId}
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
									>
										<MoreVert />
									</IconButton>
								</div>
							</span>
						}
					</Toolbar>
					
				</AppBar>
				
			</HideOnScroll>
			{renderMenu}
			{renderMobileMenu}
		</div>
	)
})

export default Menu