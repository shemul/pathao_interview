var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var trupleSchema = new Schema({
	'key' : String,
	'value' : String
});

module.exports = mongoose.model('truple', trupleSchema);
