var express = require('express');
var router = express.Router();
var index = require('./index');

var auth = index.requireRole;

router.get('/', function(req, res, next) {
  res.render('layout');
});

router.get('/classes',auth('student'),function(req, res, next) {
  res.render('classes',{title:'classes'});
});



module.exports = router;
