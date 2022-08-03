const totalLikes = require('../utils/for_tests').totalLikes;

describe('total likes', ()=>{
    test('of empty list is zero', ()=>{
        const blogs = [];
        expect(totalLikes(blogs)).toBe(0);
    });

    test('when list has only one blog equals the likes of that', ()=>{
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Books are making a return',
            author: 'Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v:0
        }];
        expect(totalLikes(blogs)).toBe(10);
    });

    test('of a bigger list is calculated right', ()=>{
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Books are making a return',
            author: 'Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v:0
        },
        {
            _id: '5a422bb71b54a676234d17f8',
            title: 'Never cook LASAGNA',
            author: 'Ryan Gary',
            url: 'http://www.sites.ro',
            likes: 3,
            __v:0
        },
        {
            _id: '5c422bb71b54a676234d17f8',
            title: 'Stop giving tik-tok to children',
            author: 'Pop Dorina',
            url: 'http://www.sites-nices.ro',
            likes: 25,
            __v:0
        },
        {
            _id: '5a422cc71b54a676234d17f8',
            title: 'Keep grinding',
            author: 'Muscly Muscle',
            url: 'http://www.sitesworkout.ro',
            likes: 9,
            __v:0
        }];
        expect(totalLikes(blogs)).toBe(47);
    });

});