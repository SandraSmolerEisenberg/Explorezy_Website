var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first_name: { type: String },
    last_name: { type: String },
    email:  {type: String, lowercase: true, unique: true, required: [true, 'can\'t be blank'],match:  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ , index: true},
    password: { type: String, required: true},
    favorite_places: [{type: Schema.Types.ObjectId, ref: 'places'}]
});


module.exports = mongoose.model('users', userSchema);