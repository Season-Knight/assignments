//example of function
import React from 'react'
import './SignUp.css'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        "background-color": "grey"
      },
      
    },
  }));

  
export default function SignUp (props){
    const classes = useStyles();

    let [message, setMessage] = React.useState(props.initialMessage)
 //first is the variable we use, the 2nd is the function to change the variable
 //function will be set as an arrow function
    let [fName, setfName] = React.useState("")
    let [lName, setlName] = React.useState("")
    let [eMail, seteMail] = React.useState("")
    const onClickHandler = () => {
        setMessage("You have been enrolled! ")
    }
    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case 'fName':
                setfName(event.target.value)
                break
            case 'lName':
                setlName(event.target.value)  
                break  
            case 'eMail':
                seteMail(event.target.value)    
                default: 
        }
    }
    return (
        <div className={classes.root}>
            <h1>{message}</h1>
            
            First Name<input type= "text" placeholder="First Name" onChange={onChangeHandler} name="fName" value={fName}></input><br></br>
            Last Name<input onChange={onChangeHandler} name="lName" value={lName}></input><br></br>
            Email<input onChange={onChangeHandler} name='eMail' value={eMail}></input><br></br>
            <Button variant="contained" color="primary" onClick={onClickHandler}>Enroll Me!</Button><br></br>
            <Link to="login">Back to Login </Link>
        </div>
    )
}