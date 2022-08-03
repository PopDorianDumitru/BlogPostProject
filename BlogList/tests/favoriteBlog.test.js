const favoriteBlog = require('../utils/for_tests').favoriteBlog;

describe('favorite blog by most number of likes' ,()=>{
    test('when no blogs', ()=>{
        const blogs = [];
        expect(favoriteBlog(blogs)).toEqual({error: 'No blogs introduced'});
    });

    test('when only one blog return that', ()=>{
        const blogs = [{
            _id: '5a422aa71b54a676234d17f8',
            title: 'Books are making a return',
            author: 'Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 10,
            __v:0
        }];
        expect(favoriteBlog(blogs)).toEqual(
            {
                title: 'Books are making a return',
                author: 'Dijkstra',
                likes: 10
            });
    });

    test('when there are a lot of blogs return the correct one', ()=>{
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
        expect(favoriteBlog(blogs)).toEqual({
            title: 'Stop giving tik-tok to children',
            author: 'Pop Dorina',
            likes: 25
        });
    });

});