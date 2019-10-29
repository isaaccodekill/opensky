import React from 'react'
import styles from './NavBar.module.css'

const NavBar = () => {
	return (
		<div className={styles.Navbar}>
			<h1 className={styles.logo}>
				Flight-Checker
			</h1>
		</div>
	)
}

export default NavBar

