const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const logger = require('../utils/logger');
const config = require('../utils/config');
dotenv.config({path: path.resolve(__dirname, '.env')});

const url = config.MONGODB_URI;

logger.info('connecting to ', url);

mongoose.connect(url)
    .then(()=>{logger.info('Connection successful!');
    })
    .catch((error)=> logger.error(error));

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema);