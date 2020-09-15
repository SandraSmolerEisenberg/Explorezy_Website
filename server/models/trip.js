var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var placeSchema = require('../models/place');

var tripSchema = new Schema({
    name: { type: String },
    places: {type: [placeSchema]},
    user: {type: Schema.Types.ObjectId, ref: 'users'}

});

module.exports = mongoose.model('trips', tripSchema);