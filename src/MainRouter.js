import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './components/core/Menu'
import Home from './components/core/Home'
import Signin from './components/user/Signin'
import Signup from './components/user/Signup'
import Category from './components/product/Category'
import Product from './components/product/Product'
import Cart from './components/cart/Cart'
import Profile from './components/user/Profile'
import Footer from './components/core/Footer.js'
import PrivateRoute from './PrivateRoute'


const MainRouter = () => (
	<div>
		<Menu />
		<Switch>
			<Route path="/" exact>
				<Home />
			</Route>
			<Route path="/signin" component={Signin} />
			<Route path="/signup">
				<Signup />
			</Route>
			<Route path="/cart">
				<Cart />
			</Route>
			<PrivateRoute path="/profile" component={Profile} />
			<Route path="/products/product/:productId">
				<Product />
			</Route>
			<Route path="/products/:category">
				<Category />
			</Route>
		</Switch>
		<Footer />
	</div>
)

export default MainRouter