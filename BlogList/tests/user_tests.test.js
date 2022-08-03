const mongoose = require('mongoose');
const config = require('../utils/config');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');
const helper = require('./forTesting');
mongoose.connect(config.MONGODB_URI);

beforeEach(
    async()=>{
        await User.deleteMany({});
        const users = helper.initialUsers
            .map(user=> new User(user));
        const promiseArray = users.map(user=> user.save());
        await Promise.all(promiseArray);
    }
);

test('returns correct initial users', async()=>{
    await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
});

test('adds the user correctly', async()=>{
    const newUser = {
        username: 'Soooo',
        name: 'SUNG_JIN_WOO',
        password: 'Stuff'
    };
    await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/);
    const users = await User.find({});
    expect(users).toHaveLength(helper.initialUsers.length + 1);
});

test('doesn\'t add for invalid requests', async()=>{
    const invalidUser1 = {
            username: 'ap',
            password: 'wowowowo',
            name: 'nobody'
        },
        invalidUser2 = {
            username: 'apapapa',
            password: 'wo',
            name: 'nobo'
        };
    await api.post('/api/users').send(invalidUser1).expect(400).expect({error: 'username and password must be over 3 characters long'});
    await api.post('/api/users').send(invalidUser2).expect(400).expect({error: 'username and password must be over 3 characters long'});
    const users = await User.find({});
    expect(users).toHaveLength(helper.initialUsers.length);
});