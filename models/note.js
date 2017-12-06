
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


var noteSchema = mongoose.Schema({
	username : {
		type : String,
		required : true,
		index : true
	},
	name : {
		type : String,
		required : true
	},
	title : {
		type : String,
		required : true
	},
	description : {
		type : String,
		required : true
	}
});

var note = module.exports = mongoose.model('note',noteSchema);

module.exports.getNote = function (xyz,callback) {
		
}