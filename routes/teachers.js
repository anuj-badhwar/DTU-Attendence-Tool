var express = require('express');
var router = express.Router();
var index = require('./index');

var auth = index.requireRole;

router.get('/classes',auth('teacher'),function(req,res){

    res.render('classes',{
    title:'classes'
  })

})

module.exports = router
