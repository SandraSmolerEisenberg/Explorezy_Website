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
router.get('/', function(req, res) {
    if (req.query.public){
        Trip.find({public: req.query.public}, function(err, trips) {
            if (err) {return res.status(404).json({'message': 'Trip not found!' , 'error': err});}
            res.json({'trips': trips });
        });
    }
    else {
        Trip.find(function(err, trips) {
            if (err) { return res.status(404).json({'message': 'Trip not found!' , 'error': err});}
            res.json({'trips': trips });
        });
    }

});

//Get a specific trip by id.
router.get('/:id', function(req, res) {
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) { 
            return res.status(404).json({'message': 'Trip not found!' , 'error': err});
        }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found!'});
        }
        res.json(trip);
    });
});

//Replaces a trip by id.
router.put('/:id', function(req, res) {
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) { return res.status(409).json({'message': 'There is no trip with that name!' , 'error': err});
        }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        if (req.body.name && req.body.places){
            trip.name = req.body.name;
            trip.places = req.body.places;
            trip.public = req.body.public;
            trip.save();
            res.json(trip);
        } else{
            res.status(404).json({'message': 'Input missing'});
        }
    });
});

//Updates a trip by id.
router.patch('/:id', function(req, res) {
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) { return res.status(409).json({'message': 'There is no trip with that name!', 'error': err});
        }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found!'});
        }
        trip.name = req.body.name || trip.name;
        trip.places = req.body.places || trip.places;
        trip.public = req.body.public || trip.public;
        trip.save();
        res.json(trip);
    });
});

//Deletes a trip by id.
router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Trip.findOneAndDelete({_id: id}, function(err, trip) {
        if (err) {
            return res.status(409).json({'message': 'There is no trip with that name!', 'error': err});
        }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        res.json(trip);
    });
});

//Add a place to trip.
router.post('/:id/places', function(req, res){
    var id = req.params.id;
    var placeId = req.body.places;
    Trip.findById(id, function(err, trip) {
        if (err) { 
            return res.status(409).json({'message': 'There is no trip with that name!', 'error': err});
        }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        if (placeId === null) {
            return res.status(404).json({'message': 'Place not found'});
        }
        if(trip.places.includes(placeId)){
            return res.status(409).json({'message': 'Place already exists in trip'});
        }  
        try{
            trip.places.push(placeId);

        }
        catch(err) {
            return res.status(409).json({'message': err});
        }
        trip.save();
        res.json(trip);
    });
});

//Get list of all places from a trip.
router.get('/:id/places', function(req, res){
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) {return res.status(404).json({'message': 'Trip not found', 'error': err});
        }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        var placesInTrip = [];        
        for (let index = 0; index < trip.places.length; index++) {            
            placesInTrip[index] = trip.places[index];                    
        } 
        res.json({'tripName': trip.name, 'places' : placesInTrip });
    });
});

//Get one place from a trip.
router.get('/:id/places/:placeId', function(req, res){
    var id = req.params.id;
    var placeId = req.params.placeId;
    Trip.findById(id, function(err, trip) {
        if (err) {  return res.status(404).json({'message': 'Trip not found', 'error': err}); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        Place.findById(placeId, function(err, place) {
            if (err) { return res.status(404).json({'message': 'Place not found', 'error': err}); }
            if (place === null) {
                return res.status(404).json({'message': 'This trip does not have a place with that ID'});
            }
            res.json({'tripName': trip.name, 'place' : place});
        });
    });
});

//Delete one place from a trip.
router.delete('/:id/places/:placeId', function(req, res) {
    var id = req.params.id;
    var placeId = req.params.placeId;
    Trip.findById(id, function(err, trip) {
        if (err) {  return res.status(404).json({'message': 'Trip not found'}); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        try{        let index = trip.places.indexOf(placeId);
            trip.places.splice(index, 1);
            trip.save();
            res.json(trip.places);}
        catch(err){
            return res.status(404).json({'message': 'Place ID is not found'});
        }

    });
});

//Delete all places from a trip.
router.delete('/:id/places', function(req, res) {
    var id = req.params.id;
    Trip.findById(id, function(err, trip) {
        if (err) {  return res.status(404).json({'message': 'Trip not found'}); }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        trip.places = [];
        trip.save();
        res.json(trip);
    });
});

module.exports = router;