import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import AppBar from './AppBar'
import UsersF from './UsersF'


export default function MainRouter(){

    return (
        <div>
            <Router>
                <AppBar></AppBar>
                <Switch>

                <Route path="/signup">   
                        <SignUp initialMessage="Sign Up Page ;)"></SignUp>
                        </Route> 
                        <Route path= "/users">
                            <UsersF></UsersF>
                        </Route>
                    <Route path="/">
                        <Login initialMessage="Login Page <3"></Login>
                    </Route> 
                       
                </Switch>
                                
            </Router>    
        </div>
    )
}