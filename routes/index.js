var express = require('express');
var router = express.Router();

var User = require('../models/user.js')

router.get('/', function(req, res, next) {
  res.redirect('/login')
});

router.get('/login',function(req,res){
  res.render('login',{
    title:'login'
  })
})

router.get('/register',function(req,res){
  res.render('register',{
    title:'register'
  })
})

router.post('/register',function(req,res){
  var name = req.body.name;
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var type = req.body.userType;

  var newUser = new User({
    name : name,
    username : username,
    email : email,
    password : password,
    userType : type
  })

  User.createUser(newUser,function(err,user){
    if(err) throw err;
    console.log(user);
  })

  res.redirect('/users/login');
})

module.exports = router;
