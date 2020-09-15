var express = require('express');
var router = express.Router();

var Trip = require('../models/trip');
var Place = require('../models/place');

//Creates a new trip object.
router.post('/', function(req, res, next) {
    var trip = new Trip(req.body);
    trip.save(function(err, trip) {
        if (err) { return next(err); }
        res.status(201).json(trip);
    });
});

//Get a list of all trips.
router.get('/', function(req, res, next) {
    Trip.find(function(err, trips) {
        if (err) { return next(err); }
        res.json({'trips': trips });
    });
});

//Get a specific trip by id.
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) { return next(err); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found!'});
        }
        res.json(trip);
    });
});

//Replaces a trip by id.
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) { return next(err); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        trip.name = req.body.name || trip.name;
        trip.places = req.body.places || trip.places;
        trip.save();
        res.json(trip);
    });
});

//Updates a trip by id.
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) { return next(err); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        trip.name = req.body.name || trip.name;
        trip.places = req.body.places || trip.places;
        trip.save();
        res.json(trip);
    });
});

//Deletes a trip by id.
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Trip.findOneAndDelete({_id: id}, function(err, trip) {
        if (err) { return next(err); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        res.json(trip);
    });
});

//Add a place to trip.
router.post('/:id/places', function(req, res, next){
    var id = req.params.id;
    var placeId = rep.body.places;
    Trip.findById(id, function(err, trip) {
        if (err) { return next(err); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        trip.places.push(placeId);
    });
});

//Get list of all places from a trip.
router.get('/:id/places', function(req, res, next){
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) { return next(err); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        res.json({'tripName': trip.name, 'places' : trip.places });
    });
});

//Get one place from a trip.
router.get('/:id/places/:placeId', function(req, res, next){
    var id = req.params.id;
    var placeId = req.params.placeId;
    Trip.findById(id, function(err, trip) {
        if (err) { return next(err); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        Place.findById(placeId, function(err, place) {
            if (err) { return next(err); }
            if (place === null) {
                return res.status(404).json({'message': 'This trip does not have a place with that ID'});
            }
            res.json({'tripName': trip.name, 'place' : place});
        });
    });
});

//Delete one place from a trip.
router.delete('/:id/places/:placeId', function(req, res, next) {
    var id = req.params.id;
    var placeId = req.params.placeId;
    Trip.findById(id, function(err, trip) {
        if (err) { return next(err); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        let index = trip.places.indexOf(placeId);
        trip.places.splice(index, 1);
        res.json(trip.places);
    });
});

//Delete all places from a trip.
router.delete('/:id/places', function(req, res, next) {
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) { return next(err); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        trip.places = [];
    });
});

module.exports = router;