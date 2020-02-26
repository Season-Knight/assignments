let express = require('express')
// create our express app
let app=express()
app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get('/profile',(req,res) => {

        res.render("profile", {data: 'Warning: This is not a test'})

})

let server=app.listen(3000,() =>{})

// 'main' is the entry point for the module in the package.json file//
