const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
///const logger = require('../utils/logger');
const config = require('../utils/config');
const {getTokenFrom, userExtractor} = require('../utils/middleware');
/*const getTokenFrom = request =>{
    const authorization = request.get('authorization');
    if(authorization && authorization.toLowerCase().startsWith('bearer '))
        return authorization.substring(7);
    return null;
};
*/
blogsRouter.get('/', async(request, response)=>{
    
    const blogs = await Blog.find({}).populate('user');
    response.json(blogs);
});



blogsRouter.post('/',getTokenFrom, userExtractor, async(request, response)=>{
    const blog = new Blog(request.body);
    const token = request.token;
    const decodedToken = jwt.verify(token, config.SECRET);
    if(!decodedToken.id)
        return response.status(401).json({ error: 'token missing or invalid' });
    const user = await User.findById(decodedToken.id);
    
    blog.user = user.id;
    if(!blog.likes)
        blog.likes = 0;
    if(!blog.title || !blog.url)
        response.status(400).end();
    else
    {
        const savedBlog = await blog.save();
        await User.findByIdAndUpdate(user.id, {blogs: user.blogs.concat([savedBlog._id])});
        response.status(201).json(savedBlog);
    }
   

});

blogsRouter.delete('/:id',getTokenFrom, userExtractor, async(request, response)=>{
    const decodedToken = jwt.verify(request.token, config.SECRET);
    const blog = await Blog.findById(request.params.id);
    if(decodedToken.id.toString() === blog.user.toString())
    {
        await Blog.findByIdAndDelete(request.params.id);
        return response.status(204).end();
    }
    else
        return response.status(403).json({error: 'token is invalid'});
   
});

blogsRouter.put('/:id', async(request, response)=>{
    const {likes} = request.body;
    await Blog.findByIdAndUpdate(request.params.id, {likes}, {runValidators: true, new: true, context: 'query'});
    const updatedBlog = await Blog.findById(request.params.id);
    response.json(updatedBlog);
});

module.exports = blogsRouter;