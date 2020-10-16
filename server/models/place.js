var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
    city: {type: String},
    road: {type: String},
    state: {type: String},
    county: {type: String},
    country: {type: String},
    postcode: {type: String},
    country_code: {type: String},
});

var wikipediaSchema = new Schema({
    title: {type: String},
    text: {type: String}
});

var pointSchema = new Schema({
    lon: {type: Number},
    lat: {type: Number}
});

var placeSchema = new Schema({
    name: { type: String },
    address: { type: addressSchema},
    wikipedia: { type: String },
    image: { type: String },
    wikipedia_extracts: { type: wikipediaSchema },
    point: { type: pointSchema }
});


module.exports = mongoose.model('places', placeSchema);
 