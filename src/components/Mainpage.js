//example of function
import React from 'react'
import './Mainpage.css'
import {Link as RLink} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import {uriBase, api} from '../const';
import Icon from '@material-ui/core/Icon'
import CheckIcon from '@material-ui/icons/Check';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';


const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export default class MainPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.initialMessage,
            userName: "",
            password: "",
            loggedIn: "The mountains are calling and I must go!"
        }
        this.onClickHandler = this.onClickHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)

    }//end of constructor function
    


    onClickHandler(){
        let body = {
            userName: this.state.userName,
            password: this.state.password
        }
        fetch(`${uriBase}${api}/users`,{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(body)          
        })
        .then(httpResponse => {
            if (!httpResponse.ok){
            throw new Error("Unable to Login")
        }
            return httpResponse.json()
        })
        .then(user => {
            console.log("user")
            if (user.hasOwnProperty("fName")){
                this.setState({loggedIn: "Woohoo its go time!"})
            } else {
                this.setState({loggedIn: "Are you lost?"})
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    onChangeHandler(event){
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state)
    }

    render (){
        return (
            <div>
                <div>
                <h1>{this.state.name}</h1>
                <h2>{this.state.loggedIn}</h2>
                <div className="signin">
                User Name<input onChange={this.onChangeHandler} name="userName" value={this.state.userName}></input><br></br>
                Password<input onChange={this.onChangeHandler} name="password" value={this.state.password}></input><br></br>
                </div>
                </div>
                <div>
                <Button 
                variant="contained"
                color="default"
                startIcon={<CheckIcon />}
                onClick={this.onClickHandler} >Log In</Button>
                <Button 
                variant="contained"
                color="default"
                startIcon={<EmojiEmotionsIcon />}
                to="/signup"
                component={RLink}
                 >Sign Up</Button>
                <br></br>
                <RLink to="/Tracker">Track Your Hikes Here!</RLink><br></br>
                <RLink to="/MyBlog">My Summit Blog!</RLink>
                
                </div>
            </div>
            //can do onclick as an arrow function however with the this you dont have to call and define it everytime
        )
    }

}