var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var keyValueSchema = new Schema({
	'key': String,
	'value': String
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

module.exports = mongoose.model('keyvalue', keyValueSchema);
