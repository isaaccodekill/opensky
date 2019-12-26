import React, { useContext } from 'react'
import styles from './NavBar.module.css'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../../Contexts/AuthContext'

const NavBar = () => {
	const [auth, setToken, deleteToken] = useContext(AuthContext)
	return (
		<div className={styles.Navbar}>
			<h1 className={styles.logo}>
				Flight-Checker
			</h1>
			{ auth ? <NavLink className={styles.link} to="/logout">Logout</NavLink> : null }
		</div>
	)
}

export default NavBar

