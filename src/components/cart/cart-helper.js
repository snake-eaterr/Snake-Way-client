const addItem = (item, cb) => {
	let cart = []
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'))
		}
		cart.push({
			product: item,
			quantity: 1,
		})
		localStorage.setItem('cart', JSON.stringify(cart))
		cb()
	}
}

const totalItems = () => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart')).length
		}
	}
	return 0
}

const getCart = () => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			return JSON.parse(localStorage.getItem('cart'))
		}
	}
	return []
}

const updateCart =(index, quantity) => {
	let cart = []
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'))
		}
		cart[index].quantity = quantity
		localStorage.setItem('cart', JSON.stringify(cart))
	}
}

const removeItem = index => {
	let cart = []
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'))
		}
		cart.splice(index, 1)
		localStorage.setItem('cart', JSON.stringify(cart))
	}
	return cart
}



export default { addItem, totalItems, getCart, updateCart, removeItem }