var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require('../models/user');

router.post('/', function(req, res, next) {
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
                    favorite_places: []
                });   
                user.save(function(err, user) {
                    if (err) { return next(err); }
                    res.status(201).json(user);
                });
            }
        } );
    });
});

router.get('/', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.json({'users': users });
    });
});

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


router.put('/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({'message': 'User not found'});
        }
        user.first_name = req.body.first_name;
        user.last_name = req.body.last_name;
        user.email = req.body.email;
        user.password = req.body.password;
        user.favorite_places = req.body.favorite_places;
        user.save();
        res.json(user);
    });
});

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
        // This will probably not work We need a diffrent way to update the favorite places
        user.favorite_places = req.body.favorite_places || user.favorite_places;
        user.save();
        res.json(user);
    });
});

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

// TODO 
// Endpoint to add favorite places
// Endpoint to add trips 
// Endpoint to remove a favorite place
// Endpoint to remove a trip
// Endpoint for login

module.exports = router;
