import React from 'react'
import {uriBase, api} from '../const'

//class structure
export default class UsersC extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            users: []
        }
        this.refresh = this.refresh.bind(this)
    }

    refresh(){
        fetch(`${uriBase}${api}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(HttpResponse => {
            if (!HttpResponse.ok) {
                throw new Error("Bad Response")
            }
            return HttpResponse.json()
        })
        .then(response => {
            console.log(response)
            this.setState({users: response})
        })
        .catch(error => {
            console.log(error)
        })
    }
    //lifecycle function
    componentDidMount(){
        this.refresh()
    }
    render() {
        return(
            <div>
                <h1>Users</h1>
                <ul>
                   {
                       this.state.users.map((user,index) => {
                           return (
                               <li key={index}>{user.FName}</li>
                           )
                       })
                   } 
                </ul>
            </div>
        )
    }
}