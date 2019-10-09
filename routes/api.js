var express = require('express');
var router = express.Router();
const formModel = require('../model/article');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/register', function(req, res, next) {
  const{username,email,pwd}=req.body;
  const User= new formModel({username,email,pwd});

  formModel.findOne({email:email})
      .then(data=>{
          if(data) {
            res.send('Такой пользователь уже существует!');
           } else {
           User.save()
                .then((data2)=>{
                  res.send(`Пользователь ${data2.username} зарегестрирован!`);
                  console.log(`Object ${data2} saved!`)
                })
                .catch((err)=>console.log(err));
    }
  });
});


router.post('/login', function(req, res, next) {
  const{username, pwd}=req.body;
  formModel.findOne({username:username,pwd:pwd})
      .then(data=> {
        if(data) {
          res.send(`Пользователь ${data.username} успешно зашел!`);
        }
        else {
          res.send(`Пользователя не существует`);
        }
      })
      .catch(err=> console.log(err))
});


router.post('/update', function(req, res, next) {
  const{username, pwd}=req.body;
  formModel.findOneAndUpdate({username:username},{pwd:pwd})
      .then(data=> {
        if(data){
          res.send(`Пароль ${data.username} обновлен!`)
        }
        else {
          res.send(`Пользователя не существует!`)
        }
      })
      .catch(err=> console.log(err))
});


router.post('/delete', function(req, res, next) {
  const{username, email, pwd}=req.body;
  formModel.findOne({username:username,email:email,pwd:pwd})
      .then(data=> {
        if(data){
          data.remove({})
              .then(data2=>{
                res.send(`Пользователь ${data2.username} удален`)
              })
              .catch(err=> console.log(err))
        }
      })
      .catch(err=> console.log(err))
});

module.exports = router;
