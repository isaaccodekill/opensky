import React, {useContext} from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'

const Logout = () => {
    const [auth, setToken, deleteToken] = useContext(AuthContext)
    deleteToken()
    return (
        <Redirect to="/"/>
    )
    
}


export default Logout