var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
    name: { type: String },
    places: [{type: Schema.Types.ObjectId, ref: 'places'}],
    user: {type: Schema.Types.ObjectId, ref: 'users'}
});

module.exports = mongoose.model('trips', tripSchema);