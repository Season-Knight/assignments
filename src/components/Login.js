//class component
    //uses this. for identifying 
import React from 'react'
import {Link} from 'react-router-dom'

export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: props.initialMessage,
            fName: "",
            lName: ""
        }
        this.onClickHandler = this.onClickHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)

    }//end of constructor function
    
    onClickHandler(){
        this.setState({name: "Log me in"})
    }
    onChangeHandler(event){
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state)
    }
    render (){
        return (
            <div>
                <h1>{this.state.name}</h1>
                
                First Name<input onChange={this.onChangeHandler} name="fName" value={this.state.fName}></input><br></br>
                Last Name<input onChange={this.onChangeHandler} name="lName" value={this.state.lName}></input><br></br>
                <button onClick={this.onClickHandler} >Change Text</button>
                <Link to="signup">Sign Up Here!</Link>
            </div>
            //can do onclick as an arrow function however with the this you dont have to call and define it everytime
        )
    }

}