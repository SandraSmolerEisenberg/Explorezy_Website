var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var pointShema = new Schema({
    lon: {type: Number},
    lat: {type: Number}
});


var addressSchema = new Schema({
    city: {type: String},
    road: {type: String},
    state: {type: String},
    county: {type: String},
    suburb: {type: String},
    country: {type: String},
    postcode: {type: String},
    address29: {type: String},
    country_code: {type: String},
    city_district: {type: String},
});

var wikipediaSchema = new Schema({
    title: {type: String},
    text: {type: String}
});

var placeSchema = new Schema({
    name: { type: String },
    address: { type: addressSchema},
    wikipedia: { type: String },
    image: { type: String },
    wikipedia_extracts: { type: wikipediaSchema },
    points: { type: pointShema }
});


module.exports = mongoose.model('places', placeSchema);
