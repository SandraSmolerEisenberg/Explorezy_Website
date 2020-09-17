var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
    name: { type: String },
    place: [{type: Schema.Types.ObjectId, ref: 'place'}],
    user: {type: Schema.Types.ObjectId, ref: 'user'}
});

module.exports = mongoose.model('trips', tripSchema);