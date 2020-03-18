import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
// import Tracker from './TrackerForm'
import MyBlog from './MyBlog'
import Mainpage from './Mainpage'
import Chart from './Chart'
import SignUp from './SignUp'

export default function MainRouter(){

    return (
        <div>
            <Router>
                
                <Switch>

                <Route path="/Tracker">   
                        <Chart initialMessage="Track Your Hikes Here ;)"></Chart>
                        </Route> 
                    <Route path= "/MyBlog">
                            <MyBlog></MyBlog>
                        </Route>
                    <Route path= "/SignUp">
                            <SignUp></SignUp>
                        </Route>    
                    <Route path="/">
                        <Mainpage initialMessage="Welcome Adventurer!"></Mainpage>
                    </Route> 
                       
                </Switch>
                                
            </Router>    
        </div>
    )
}