const dummy = require('../utils/for_tests').dummy;

test('dummy returns one', ()=>{
    const blogs = [];
    expect(dummy(blogs)).toBe(1);
});