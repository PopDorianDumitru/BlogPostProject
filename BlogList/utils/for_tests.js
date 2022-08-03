const dummy = (blogs)=>{
    
    return 1 || blogs;
};

const totalLikes = (blogs)=>{
    const sum = blogs.reduce((sum, blogs)=> sum + blogs.likes, 0);
    return blogs.length === 0? 0:sum;
};

const favoriteBlog = (blogs)=>{
    let maximum = 0;
    blogs.forEach(blog=>{
        if(blog.likes > maximum)
            maximum = blog.likes;
    });
    const bestBlog = blogs.find(blog=> blog.likes === maximum);
    return blogs.length ===0 ? {error: 'No blogs introduced'} : 
        {
            title: bestBlog.title,
            author: bestBlog.author,
            likes: bestBlog.likes
        };
};

const _ = require('lodash');

const mostBlogs = (blogs) =>{
    const authors = Object.entries(_.groupBy(blogs, 'author'));
    let maximum = 0;
    authors.map(author=>{
        if(author[1].length > maximum)
            maximum = author[1].length;
    });
    const author = authors.find(author=> author[1].length === maximum);
    return blogs.length ===0 ? {error: 'No blogs introduced'} :{author: author[0], blogs: author[1].length};
    
};

const mostLikes = (blogs) =>{
    const authors = Object.entries(_.groupBy(blogs, 'author'));
    let maximum = 0;
    let favoriteAuthor = '';
    authors.map(author=>{
        let sum = 0;
        author[1].forEach(blog=>{
            sum = sum + blog.likes;
        });
        if(sum > maximum)
            maximum = sum, favoriteAuthor = author[0];
    });
    
    return blogs.length ===0 ? {error: 'No blogs introduced'} :{author: favoriteAuthor, likes: maximum};
};


module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes};