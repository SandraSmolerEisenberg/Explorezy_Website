var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: {type: String},
    text: {type: String},
    author: {type: Schema.Types.ObjectId, ref: 'user'}, 
    date: {type: Date, default: Date.now}    
});

module.exports = mongoose.model('posts', postSchema);