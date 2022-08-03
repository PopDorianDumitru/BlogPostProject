const mongoose = require('mongoose');
const config = require('../utils/config');

mongoose.connect(config.MONGODB_URI);

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    name: String,
    passwordHash: String,
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
});

userSchema.set('toJSON',{ transform:(document, returnedObject)=>{
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
} });

module.exports = mongoose.model('User', userSchema);