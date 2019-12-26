import React from 'react';
import { Switch, Route } from 'react-router'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'
import AuthContextProvider from './Contexts/AuthContext'
import Logout from './Components/Logout/Logout';

const App = () => {
  return (
  	<AuthContextProvider>	
   	 <Switch>
   	 	<Route path="/Login" component={Login}/>
		<Route path="/Logout" component={Logout}/>
   	 	<ProtectedRoutes path="/" component={Home}/>
   	 	<ProtectedRoutes path="/dashboard" component={Home}/>
   	 </Switch>
  	</AuthContextProvider>
  )
}

export default App;
