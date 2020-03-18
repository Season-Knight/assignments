var express = require('express');
var router = express.Router();
const db = require ('../../../db/mongooseUsers') //mongoose is currently working, mongo causes blank object
// const db = require ('../../../db/mongo')

router.get('/:id', function (req, res, next){
  let readObj = {
    id:req.params.id,
    usersCollection: req.app.locals.usersCollection
  }
  db.readOne(readObj)
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});
//get all
router.get('/', function (req, res, next){
  let readObj = {
       usersCollection: req.app.locals.usersCollection
  }
  db.readAll(readObj)
  .then(response => {
    res.json(response)
  })
  .catch(error => {
    console.log(error)
    res.json(error)
  })
});

router.delete('/:id', function (req, res, next) {
  let deleteObj = {
    id:req.params.id,
    usersCollection: req.app.locals.usersCollection
  }
  db.del(deleteObj)
  .then(response => {
    if (response.deletedCount == 1){
      res.json({})
    }
    throw new Error ("Not Deleted")
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

router.put('/:id', function (req, res, next) {
  let putObj = {
    id: req.params.id,
    doc: req.body,
    usersCollection: req.app.locals.usersCollection
  }
  db.readOne(putObj)
  .then(response => {

    if (response == null){
      db.create(putObj)
      //add if not found
    } else {
      //udpate if found
      db.replace(putObj)
      .then(response => {
        res.json(response)
      })
    }
    res.json(response)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

router.patch('/:id', async function (req, res, next) {
  let patchObj = {
    id: req.params.id,
    doc: req.body,
    usersCollection: req.app.locals.usersCollection
  }

  //try,catch helps to catch errors?
  try {
    //see if we have one to update
  let response = await db.readOne(patchObj)
   
      //if no record was found
    if (response == null){
      throw new Error("not found")
           
    } else {
        //update the one we found
       await db.update(patchObj)
        //respond with the result from the db
        res.json(await db.readOne(patchObj))
      }
      
      }
      catch(error) {
        res.status(500).json(error)
      
    }
}); //end of readOne

router.post('/signup', function (req, res, next) {
  let createObj = {
    doc: req.body,
    usersCollection : req.app.locals.usersCollection
  }
  db.create(createObj)
  .then(response => {
    res.json(response)
  })
  .catch(error =>{
    res.status(500).json(error)
  })
});
//Components Login
  router.post('/', function(req, res, next){
      console.log(req.body.userName)
    db.findOne({query:{userName:
        req.body.userName}})
        .then(user =>{
          if(user.password === req.body.password){
            delete user.password
            res.json(user)
          }
        })
        .catch(error =>{
          console.log(error)
          res.json({})
        })
      //convert function to authenticate from db
    console.log("post")
      //temp code
      
  })
 



module.exports = router;
