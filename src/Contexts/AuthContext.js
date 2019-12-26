import React , { createContext, useState } from 'react'

export const AuthContext = createContext()


const AuthContextProvider = ({children}) => {
	let authInitial = false

	if(localStorage.getItem("openSkyToken")){
		authInitial = true
	}

	const [Auth, setAuth] = useState(authInitial)

	const setToken = (token) => {
		localStorage.setItem("openSkyToken", JSON.stringify(token))
		setAuth(true)
	}

	const deleteToken = () => {
		localStorage.removeItem("openSkyToken")
		setAuth(false)
	}

	return (
		<AuthContext.Provider value={[Auth, setToken, deleteToken]}>
			{children}
		</AuthContext.Provider>
	)
}

export default AuthContextProvider
