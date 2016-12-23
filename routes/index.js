var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user.js');

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

router.post('/login',
  passport.authenticate('local',{failureRedirect:'/login', failureFlash: 'Invalid username or password'}),
  function(req, res) {
   req.flash('success', 'You are now logged in');
   res.redirect('/'+req.user.userType+'/classes');
});

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local',new LocalStrategy(function(username, password, done){
  User.findUser(username, function(err, user){
    if(err) throw err;
    if(!user){
      return done(null, false, {message: 'Unknown User'});
    }

    User.comparePassword(password, user.password, function(err, isMatch){
      if(err) return done(err);
      if(isMatch){
        return done(null, user);
      } else {
        return done(null, false, {message:'Invalid Password'});
      }
    });
  });
}));

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

  res.redirect('/login');
})

router.get('/logout',function(req,res){
  req.logout();
  req.flash('success','You are now logged out!');
  res.redirect('/');
});

var requireRole = function(role) {
  return function(req, res, next) {
    if(req.isAuthenticated() && req.user && req.user.userType == role)
      next();
    else
      res.send('UNAUTHORISED');
  }
};

module.exports = router;
module.exports.requireRole = requireRole;
