var express = require('express');
var router = express.Router();
const formModel = require('../model/article');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/register', function(req, res, next) {
  const{username,email,pwd}=req.body;
  const formValid = new formModel({
    username,
    email,
    pwd
  });

  formValid.save()
      .then((form)=>console.log(`Object ${form} saved!`))
      .catch((err)=>console.log(err));
  console.log(req.body);
  res.send('ok');
});
router.post('/login', function(req, res, next) {
  const{username, pwd}=req.body;
  formModel.findOne({username:username})
      .then(data=> {res.send(data)})
      .catch(err=> console.log(err))

});

module.exports = router;
