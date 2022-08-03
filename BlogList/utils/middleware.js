const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');
const getTokenFrom = (request, response, next)=>{
    const authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer '))
        request.token = authorization.substring(7);
    next();
};

const userExtractor = async(request, response, next)=>{
    const token = request.token;
    const decodedToken = jwt.decode(token, config.SECRET);
    const user = await User.findById(decodedToken.id);
    request.user = user;
    next();

};

const errorHandler = (error, request, response, next)=>{
    console.log(error.name);
    if(error.name === 'JsonWebTokenError')
        return response.status(401).json({error: 'Invalid Token'});
    if(error.name === 'TypeError')
        return response.status(401).json({error: 'Malformatted or missing Token'});
    next(error);
};

module.exports = {getTokenFrom, userExtractor, errorHandler};