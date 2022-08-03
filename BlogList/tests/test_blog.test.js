const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const config = require('../utils/config');
const api = supertest(app);
const helper = require('./forTesting');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
///const jwt = require('jsonwebtoken');
console.log(config.MONGODB_URI);

beforeEach(async()=>{
    const saltRounds = 10;
    await User.deleteMany({});
    const users = helper.initialUsers.map(user=> new User(
        {
            _id: user._id,
            username: user.username, 
            name: user.name, 
            password: bcrypt.hash(user.password, saltRounds),
            blogs: user.blogs
        }));
    const promiseUserArray = users.map(user=> user.save());    
    await Promise.all(promiseUserArray);
    await Blog.deleteMany({});
    const blogs = helper.initialBlogs
        .map(blog=> new Blog({
            title: blog.title,
            url: blog.url,
            author: blog.author,
            likes: blog.likes,
            user: blog.user
        }));
    const promiseArray = blogs.map((blog)=> blog.save());
    await Promise.all(promiseArray);
});

test('return the blogs as json', async()=>{
    await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

});

test('returns correct number of blogs', async()=>{
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    expect(blogs.length).toBe(helper.initialBlogs.length);
});

test('unique identifier is id', async()=>{
    const response = await api.get('/api/blogs');
    const blogs = response.body;
    blogs.map(blog=>{
        expect(blog.id).toBeDefined();
        expect(blog._id).not.toBeDefined();
    });
});

test('inserted a blog correctly', async()=>{
    
    const userForToken = {
        username: helper.initialUsers[0].username,
        id: helper.initialUsers[0]._id
    };
    const token = jwt.sign(userForToken, config.SECRET);
    const newBlog = {
        title: 'Adding a new blog',
        author: 'Pop Dorian',
        url: 'http://sssss.sss',
        user: `${helper.initialUsers[0]._id}`,
        likes: 17
    };
    await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    const blogs = await helper.blogsInDB();
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1);
    expect(blogs.map(blog=> blog.title)).toContain(newBlog.title);
});

test('gives 0 likes when no likes specified', async()=>{
    
    const userForToken = {
        username: helper.initialUsers[0].username,
        id: helper.initialUsers[0]._id
    };
    const token = jwt.sign(userForToken, config.SECRET);
    
    const blog = {
        title: 'Adding a new blog',
        author: 'Pop Dorian',
        url:'http://www.servers.com',
        user: `${helper.initialUsers[0]._id}`
    };
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    const blogs = await helper.blogsInDB();

    expect(blogs[helper.initialBlogs.length].likes).toBe(0);
});

test('when no url or title is provided', async()=>{
    const userForToken = {
        username: helper.initialUsers[0].username,
        id: helper.initialUsers[0]._id
    };
    const token = jwt.sign(userForToken, config.SECRET);
    const blogNoTitle={
        author: 'Benjamin Franklin',
        url: 'http://localhost.com',
        likes: 4,
        user: `${helper.initialUsers[0]._id}`
    };
    const blogNoURL={
        title: 'Wow so much hair',
        author: 'Albert Einstein',
        likes: 3,
        user: `${helper.initialUsers[0]._id}`
    };
    const blogNoTitleNoURL={
        author: 'PLS NO HATE',
        user: `${helper.initialUsers[0]._id}`
    };

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogNoTitle)
        .expect(400);
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogNoURL)
        .expect(400);
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogNoTitleNoURL)
        .expect(400);
       
});

test('deleting a blog', async()=>{
    const blogsAtFirst = await helper.blogsInDB();
    const user = await User.findById(blogsAtFirst[0].user);
    const userForToken = {
        username: user.username,
        id: user._id
    };
    const token = jwt.sign(userForToken, config.SECRET);
    console.log(blogsAtFirst[0].id);
    await api
        .delete(`/api/blogs/${blogsAtFirst[0].id}`) 
        .set('Authorization', `Bearer ${token}`)
        .expect(204);
    const blogs = await helper.blogsInDB();
    expect(blogs).toHaveLength(helper.initialBlogs.length - 1);
});

test('updating likes', async()=>{
    const blogs = await helper.blogsInDB();
    const id = blogs[0].id;
    const likes = 600;
    await api
        .put(`/api/blogs/${id}`)
        .send({likes});
    const updatedBlog = await helper.blogsInDB();
    expect(updatedBlog[0].likes).toBe(likes);
});

afterAll(()=>{
    mongoose.connection.close();
});