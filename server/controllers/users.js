var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require('../models/user');

// Create new user
router.post('/', function(req, res, next) {
    if(req.body.email && req.body.password){
        User.find({email: req.body.email}, function(err, user){
            if(err){
                return next(err);
            }
            if(user.length >= 1){
                return res.status(409).json({
                    message: 'There is a user with this email address'
                });
            }
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err){return res.status(500).json({error: err});}
                else{
                    var user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        first_name: req.body.first_name || '',
                        last_name: req.body.last_name || '',
                        email: req.body.email,
                        password: hash,
                        favourite_places: [], 
                        trips: []
                    });   
                    user.save(function(err, user) {
                        if (err) { return next(err); }
                        res.status(201).json(user);
                    });
                }
            });
        });
    }
    else {
        return res.status(409).json({
            message: 'Please provide email and password'
        });
    }
});

// Get all users
router.get('/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.json({'users': users });
    });
});

// Find user by ID
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    });
});

// Replace user
router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    if(req.body.first_name && req.body.favourite_places && req.body.trips && req.body.password && req.body.email && req.body.last_name){
        User.findById(id, function(err, user) {
            if (err) { return next(err); }
            if (user == null) {
                return res.status(404).json({'message': 'User not found'});
            }
            user.first_name = req.body.first_name;
            user.last_name = req.body.last_name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.favourite_places = req.body.favourite_places;
            user.trips = req.body.trips;
            user.save();
            res.json(user);
        });
    } else {
        return res.status(409).json({
            message: 'Please provide complete dataset for the update'
        });
    }
});

// Update user
router.patch('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        user.first_name = req.body.first_name || user.first_name;
        user.last_name = req.body.last_name || user.last_name ;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.favourite_places = req.body.favourite_places || user.favourite_places;
        user.trips = req.body.trips || user.trips;
        user.save();
        res.json(user);
    });
});


// Delete user
router.delete('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});

// Add favourite place
router.post('/:id/favourite', function(req, res, next){
    
    var id = req.params.id;
    var favourite_places = req.body.favourite_places;
    User.findById(id, function(err, user){
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        if (favourite_places === null) {
            return res.status(404).json({'message': 'Favourite place not found'});
        }     
        user.favourite_places.push(favourite_places);
        res.json(user);

    });
});

// Remove favourite place
router.delete('/:id/favourite/:placeId', function(req, res, next) {
    var id = req.params.id;
    var placeId = req.params.placeId;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        let index = user.favourite_places.indexOf(placeId);
        user.favourite_places.splice(index, 1);
        res.json(user);
    });
});

// Add trips
router.post('/:id/trips', function(req, res, next){
    var id = req.params.id;
    var trip = req.body.trip;
    User.findById(id, function(err, user){
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        if (trip === null) {
            return res.status(404).json({'message': 'Trip not found'});
        }
        user.trips.push(trip);
    });
});

// Remove trip
router.delete('/:id/trips/:tripId', function(req, res, next) {
    var id = req.params.id;
    var tripId = req.params.tripId;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        let index = user.trips.indexOf(tripId);
        user.trips.splice(index, 1);
        res.json(user.trips);
    });
});

router.post('/login', function(req, res, next) {
    if(req.body.email && req.body.password){
        User.find({email: req.body.email}, function(err, user){
            if(err){
                return next(err);
            }
            if(user.length < 1){
                return res.status(401).json({
                    message: 'Login failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, function(err, result){
                if(err){
                    return res.status(401).json({
                        message: 'Login failed'
                    });
                }
                if(result){
                    return res.status(200).json(user);
                }
                return res.status(401).json({
                    message: 'Login failed'
                });
            });
        });} else{
        return res.status(401).json({
            message: 'Please provide email and/or password'
        });
    }
});

module.exports = router;
