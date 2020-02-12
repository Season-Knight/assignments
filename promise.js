let getBeers = require('./fileio')

async function main(){
    //async will try to return promises as they are resolved in no particular order, just what returns first
getBeers()
.then(result => {
//.then function will always return a promise
    return JSON.parse(result)
})

.then(objBeers => {
    console.log(objBeers[0])
    throw new Error("this is a very bad error")
})
.catch(error => {
    console.log(error)
    // .catch will allow any errors that occur while running the program to reflect here.
})
.finally(()=>{
    console.log('Finally Run')
})
//.finally is last promise to run
let newBeers = await getBeers()

//new will creat a new promise
// await will 
console.log('New Beers')
console.log(JSON.parse(newBeers)[1])
console.log('End of program')

}

main()


