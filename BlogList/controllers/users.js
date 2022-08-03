const usersRouter = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');


usersRouter.get('/', async(request, response)=>{
    const users = await User.find({}).populate('blogs');
    response.json(users);
});

usersRouter.post('/', async(request, response)=>{
    const {username, name, password} = request.body;

    if(username.length < 3|| password.length < 3)
        return response.status(400).json({error: 'username and password must be over 3 characters long'}).end();

    const user = await User.findOne({username: username});

    if(user)
        return response.status(400).json({error: 'username must be unique'}).end();

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({username, name, passwordHash});
    newUser.blogs = [];
    const savedUser = await newUser.save();
    response.status(201).json(savedUser);
});

module.exports = usersRouter;