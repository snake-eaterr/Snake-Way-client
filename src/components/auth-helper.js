const isAuthenticated = () => {
	if(typeof window == 'undefined') {
		return false
	}

	if(localStorage.getItem('snake-way-login')) {
		return localStorage.getItem('snake-way-login')
	} else {
		return false
	}
}

export default { isAuthenticated }