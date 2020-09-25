var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {type: String},
    text: {type: String},
    author: {type: Schema.Types.ObjectId, ref: 'users'}, 
    date: {type: Date}    
});

module.exports = mongoose.model('posts', postSchema);