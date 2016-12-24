var express = require('express');
var router = express.Router();
var index = require('./index');

var auth = index.requireRole;
var User = require('../models/user.js')

router.get('/classes',auth('teacher'),function(req,res){

    res.render('classes',{
    title:'classes'
  })

})

router.get('/dashboard',auth('teacher'),function(req,res){

    var username = req.user.username;

    User.findUser(username,function(err,data){
      if(err) throw err;
      console.log(data.teacherClasses)
      res.render('teacherDashboard',{
      title:'dashboard',
      data : data
    })
  })
})

router.post('/findBatch',function(req,res){
  var batch = req.body.batch;
  var subject = req.body.subject;
  console.log(subject + "   " + batch);
})
module.exports = router
