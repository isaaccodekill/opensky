import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router'
import { AuthContext } from '../../Contexts/AuthContext'

const ProtectedRoute = ({ component:Component, ...rest }) => {
	const [ Auth, setAuth ] = useContext(AuthContext)
	return (
		<Route {...rest}
			render={(props) => Auth ? <Component/> : <Redirect to="/Login"/> }/>
	)
} 

export default ProtectedRoute