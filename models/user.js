var mongoose = require('mongoose');
var connection = mongoose.createConnection('mongodb://localhost/dtu');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
      name: { type: String},
      reg_time: {type: Date, default: Date.now},
      username: { type: String},
      password: { type: String},
      email: { type: String},
      userType : {type : String}
  });

var User = module.exports = connection.model('user',UserSchema);

module.exports.createUser = function(newUser,cb){
  newUser.save(cb);
}

module.exports.findUser = function(username,cb){
  var query = {username: username};
	User.findOne(query, cb);
}

module.exports.comparePassword = function(pass1,pass2,cb){
    if(pass1!=pass2) cb(null,false);
    cb(null,true);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.CONNECTION = connection;
