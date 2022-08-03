const Blog = require('../models/blog');

const initialBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: '62d9bd997f9af00a1b0257ad',
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        user: '62d9bd997f9af00a1b0257ad',
        __v: 0
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        user: '62d9bd997f9af00a1b0257ad',
        __v: 0
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        user: '62da8a2dccc5f15d31041553',
        __v: 0
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        user: '62da8a2dccc5f15d31041553',
        __v: 0
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        user: '62dbd8aa7b06f401f0ef792e',
        __v: 0
    }
];

const initialUsers = [
    {
        _id: '62d9bd997f9af00a1b0257ad',
        username: 'uratenite50',
        name: 'Pop DOrian',
        password: 'neverenterrealpassword',
        blogs: ['5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8', '5a422b3a1b54a676234d17f9'],
        __v: 0
    },
    {
        _id: '62da8a2dccc5f15d31041553',
        username: 'soundboard01',
        name: 'Russel Duncan',
        blogs: ['5a422b891b54a676234d17fa','5a422ba71b54a676234d17fb'],
        password: 'twistzzforMVP',
        __v: 0
    },
    {
        _id: '62dbd8aa7b06f401f0ef792e',
        username: 'snaaaakySSS',
        name: 'Orochimaru',
        password: 'snakes_On_a_pLane',
        blogs: ['5a422bc61b54a676234d17fc'],
        __v: 0
    }
];

const blogsInDB = async()=>{
    const response = await Blog.find({});
    return response.map(blog=> blog.toJSON());
};

module.exports = {initialBlogs, blogsInDB, initialUsers};