import React, { useState, useContext } from 'react'
import styles from './Login.module.css'
import NavBar from '../../Components/UI/NavBar/NavBar'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import { AuthContext } from '../../Contexts/AuthContext'
import { Redirect } from 'react-router'
import Modal from '../../Components/UI/ErrorModal/ErrorModal'
import {ReactComponent as Plane} from '../../Assets/Images/paper-plane.svg'


const Login = () => {
	const [Auth, setToken] = useContext(AuthContext)
	const [error, setError] = useState(false)
	const [loginDetails, setLoginDetails] = useState({
		username: "",
		password: ""
	})

	if(Auth){
		return <Redirect to="/"/>
	}

	const handleInputChange = (name) => (e) => {
		setLoginDetails({
			...loginDetails,
			[name]: e.target.value 
		})
	}

	const submitFunc = (e) => {
		e.preventDefault()
		if(loginDetails.username === "demo"  && loginDetails.password === "demo" ){
			setToken("1234567")
			return <Redirect to="/" />
		}else{
			setError(true)
			Message = (<Modal show={error}/>)
		}
	}

	let Message = (<Modal show={error}/>)



	return (
		<div className={styles.Login}>
			<NavBar/>
			{Message}
			<div className={styles.LoginBox}>
				<form onSubmit={submitFunc}>
					<Plane/>
					<h1 className={styles.formHeader}>Log in</h1>
					<div className={styles.formGroup}>
						 <TextField
					        id="outlined-name"
					        label="Username"
					        className={styles.input}
					        value={loginDetails.name}
					        onChange={handleInputChange('username')}
					        margin="normal"
					        variant="outlined"
					        type="text"
      					/>
					</div>
					<div className={styles.formGroup}>
						<TextField
					        id="outlined-name"
					        label="Password"
					        className={styles.input}
					        value={loginDetails.password}
					        onChange={handleInputChange('password')}
					        margin="normal"
					        variant="outlined"
					        type="password"
      					/>
					</div>
					 <Button type="submit" variant="contained" color="primary" size="large" className={styles.button}>
      					  Login
      				</Button>

				</form>
			</div>
		</div>
	)
}

export default Login
