let fs = require("fs");


function getBeers() {
// defining function
    return new Promise((resolve, reject) => {
// creating new promise

        fs.readFile("beers.txt","utf8", (error, data) => {
            // callback functions require 2 paramaters...1st will be error, second is result
            if (error != null) {
                reject(error)
                
            } else {
                        resolve(data)
                    }   
                }) //end of readfile
    
            })

        }//end of promise
        

module.exports = getBeers

// exporting module to function for use