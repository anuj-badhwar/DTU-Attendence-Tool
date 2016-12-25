var mongoose = require('mongoose');
var userModel = require('./user.js')

var connection = userModel.CONNECTION;
var Schema = mongoose.Schema,
     ObjectId = Schema.ObjectId;


     var students = new Schema({
          batch : String,
          roll : String,
          name : String,
          attendence: Array
       });

var student = module.exports = connection.model('student',students);

module.exports.findStudent = function(roll,cb){
    student.findOne({roll:roll},cb);
  }

  module.exports.studentList = function(batch,cb){
      student.find({batch:batch},cb);
    }
