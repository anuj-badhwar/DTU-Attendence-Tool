var express = require('express')
var router = express.Router();

router.get('/classes',function(req,res){
  res.render('classes',{
    title:'classes'
  })
})

module.exports = router
