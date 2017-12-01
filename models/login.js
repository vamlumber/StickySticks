var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var bcrypt = require ('bcrypt');

var loginSchema = mongoose.Schema({
	username : {
		type : String,
		required : true,
		index : true
	},
	name : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true,
		bcrypt : true
	},
	emailID : {
		type : String,
		required : true
	}
});

var login = module.exports = mongoose.model('login',loginSchema);

module.exports.getRegister = function (newR,callback) {
		bcrypt.hash(newR.password,10,function (err,hash) {
			if (err) {
			  throw	err
			}
			newR.password = hash;
			newR.save(callback);
		});
}
module.exports.getUserbyUsername = function (id,callback) {
	var query = {username : username};
	login.findById(id,callback);
}
module.exports.getUserbyId = function (username,callback) {
	var query = {username : username};
	login.findOne(query);
}

module.exports.comparePassword = function (candidatePassword,hash,callback) {
	bcrypt.compare(candidatePassword,hash,function(err,isMatch) {
		if(err) return callback(err);
		callback(null,isMatch);
	})
}