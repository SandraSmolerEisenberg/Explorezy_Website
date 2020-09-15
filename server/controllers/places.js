var express = require('express');
var router = express.Router();

var Place = require('../models/place');

router.post('/', function(req, res, next) {
    var place = new Place(req.body);
    place.save(function(err, place) {
        if (err) { return next(err); }
        res.status(201).json(place);
    });
});

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

router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    Place.findById(id, function(err, place) {
        if (err) { return next(err); }
        if (place === null) {
            return res.status(404).json({'message': 'Place not found!'});
        }
        res.json(place);
    });
});


router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    Place.findById(id, function(err, place) {
        if (err) { return next(err); }
        if (place == null) {
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

router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    Place.findById(id, function(err, place) {
        if (err) { return next(err); }
        if (place == null) {
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

router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    Place.findOneAndDelete({_id: id}, function(err, place) {
        if (err) { return next(err); }
        if (place == null) {
            return res.status(404).json({'message': 'Place not found'});
        }
        res.json(place);
    });
});


module.exports = router;
