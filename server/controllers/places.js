var express = require('express');
var router = express.Router();

var Place = require('../models/place');

//Creates a new place object.
router.post('/', function(req, res) {
    var placetoAdd = new Place(req.body);
    Place.find({name: req.body.name}, function(err, place){
        if(err){
            return res.status(409).json({
                message: 'Place not saved', 'error': err
            });
        }
        if(place.length >= 1){
            return res.status(409).json({
                message: 'There is already a place with this name'
            });
        }
        placetoAdd.save(function(err, newPlace) {
            if (err) {             
                return res.status(409).json({
                    message: 'Place not saved', 'error': err
                }); }
            res.status(201).json(newPlace);
        });
    });
});

//Get a list of all places with pagination.
router.get('/', function(req, res, next) {     
    Place.find(function(err, places) {         
        if (err) { return next(err); }         
        const pageNumber = req.query.pageNumber;         
        const limit = req.query.limit;         
        if(pageNumber && limit){             
            let startIndex  = (pageNumber - 1) * limit;             
            let endIndex = pageNumber * limit;             
            res.json(places.slice(startIndex, endIndex));         
        }else {             
            res.json({'places': places });         
        }     
    }); 
});

//Get a specific place by id.
router.get('/:id', function(req, res) {
    var id = req.params.id;
    Place.findById(id, function(err, place) {
        if (err) { res.status(404).json({'message': 'Place not found!', 'error': err});}
        if (place === null) {
            return res.status(404).json({'message': 'Place not found!'});
        }
        res.json(place);
    });
});

//Replaces a place by id.
router.put('/:id', function(req, res) {
    var id = req.params.id;
    Place.findById(id, function(err, place) {
        if (err) { res.status(409).json({'message': 'Place not updated!', 'error': err}); }
        if (place === null) {
            return res.status(404).json({'message': 'Place not found'});
        }
        place.name = req.body.name;
        place.address = req.body.address;
        place.wikipedia = req.body.wikipedia;
        place.image = req.body.image;
        place.wikipedia_extracts = req.body.wikipedia_extracts;
        place.points = req.body.points;
        place.save();
        res.json(place);
    });
});

//Updates a place by id.
router.patch('/:id', function(req, res) {
    var id = req.params.id;
    Place.findById(id, function(err, place) {
        if (err) { res.status(409).json({'message': 'Place not updated', 'error': err}); }
        if (place === null) {
            return res.status(404).json({'message': 'Place not found'});
        }
        place.name = req.body.name || place.name;
        place.address = req.body.address || place.address;
        place.wikipedia = req.body.wikipedia || place.wikipedia;
        place.image = req.body.image || place.image;
        place.wikipedia_extracts = req.body.wikipedia_extracts || place.wikipedia_extracts;
        place.points = req.body.points || place.points;
        place.save();
        res.json(place);
    });
});

//Deletes a place by id.
router.delete('/:id', function(req, res) {
    var id = req.params.id;
    Place.findOneAndDelete({_id: id}, function(err, place) {
        if (err) { res.status(409).json({'message': 'Place not deleted', 'error': err}); }
        if (place === null) {
            return res.status(404).json({'message': 'Place not found'});
        }
        res.json(place);
    });
});


module.exports = router;
