let fetch=require("node-fetch") //get fetch//
let URL = "http://localhost:3001/api/v1"

fetch(`${URL}/users`, {
    method:"GET",
    headers: {
        "content-Type" : "application/json"
    }
})
.then(httpResult => httpResult.json())
.then(result => console.log(result))

let newUser = {  
    
    "FName": "If you seek",
    "LName":  "Amy",
    "password": "pizza",
    "email": "Amyisgone@getpizzainstead.com"      
  }

 fetch(`${URL}/users`, {
    method: 'POST',
    
        headers: {
        "content-type" : "application/json"
    },
    body: JSON.stringify(newUser)
    
})

.then(httpResult => httpResult.json())
.then(result => console.log(result))

let patch={
    password: "Luke"
}

fetch(`${URL}/users/0`, {
    method: 'PATCH',
    
        headers: {
        "content-type" : "application/json"
    },
    body: JSON.stringify(patch)
    
})

.then(httpResult => httpResult.json())
.then(result => console.log(result))

fetch(`${URL}/users/5`, {
    method: 'DELETE',
    
        headers: {
        "content-type" : "application/json"
    },
       
})

.then(httpResult => httpResult.json())
.then(result => console.log(result))