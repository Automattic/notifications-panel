module.exports.trivial = {
    text: 'Hello World!',
};

module.exports.one_link_in_middle = {
    text: 'This is a link.',
    ranges: [
        {
            indices: [10, 14],
            url: 'https://example.com/',
        },
    ],
};

module.exports.one_linkless_user_at_beginning = {
    text: 'Mike Adams (mdawaffe) is a user.',
    ranges: [
        {
            type: 'user',
            indices: [0, 21],
            id: 91,
        },
    ],
};

module.exports.several_users_and_a_post = {
    text: 'foo, bar, and 21 others liked your post "You will like this"',
    ranges: [
        {
            type: 'user',
            indices: [0, 3],
            url: 'https://foo.example.com/',
            site_id: 123,
            id: 456,
        },
        {
            type: 'user',
            indices: [5, 8],
            url: 'https://bar.example.com/',
            site_id: 789,
            id: 101112,
        },
        {
            type: 'post',
            indices: [40, 60],
            url: 'https://me.example.com/2014/06/17/you-will-like-this/',
            site_id: 90,
            id: 91,
        },
    ],
};

module.exports.one_blockquote = {
    text: 'foo said yo bar',
    ranges: [
        {
            type: 'blockquote',
            indices: [9, 11],
        },
    ],
};

module.exports.media_with_alt_text = {
    text: 'this is the alt text',
    media: [
        {
            type: 'image',
            url: 'https://i0.wp.com/s.w.org/about/images/wpmini-blue.png',
            width: 16,
            height: 16,
            indices: [0, 20],
        },
    ],
};

module.exports.initial_media_with_no_alt_text = {
    text: 'this is not alt text',
    media: [
        {
            type: 'image',
            url: 'https://i0.wp.com/s.w.org/about/images/wpmini-blue.png',
            width: 16,
            height: 16,
            indices: [0, 0],
        },
    ],
};

module.exports.initial_media_followed_by_user = {
    text: 'somebody',
    ranges: [
        {
            type: 'user',
            url: 'https://somebody.example.com/',
            indices: [0, 8],
        },
    ],
    media: [
        {
            type: 'image',
            url: 'https://i0.wp.com/s.w.org/about/images/wpmini-blue.png',
            indices: [0, 0],
        },
    ],
};

module.exports.badge_with_alt_text = {
    text: 'First Post',
    ranges: [],
    media: [
        {
            type: 'badge',
            indices: [0, 10],
            url: 'https://i0.wp.com/s.w.org/about/images/wpmini-blue.png',
            height: 128,
            width: 128,
        },
    ],
};

module.exports.badge_with_no_height_width = {
    text: '',
    ranges: [],
    media: [
        {
            type: 'badge',
            indices: [0, 0],
            url: 'https://i0.wp.com/s.w.org/about/images/wpmini-blue.png',
        },
    ],
};

module.exports.special_case_nesting = {
    text: 'this is some simple test data',
    ranges: [
        { type: 'user', indices: [0, 0] },
        { type: 'b', indices: [0, 7] },
        { type: 'b', indices: [9, 10] },
        { type: 'i', indices: [9, 9] },
    ],
};

module.exports.simple_nesting = {
    text: 'this is some simple test data',
    ranges: [{ type: 'i', indices: [5, 12] }, { type: 'b', indices: [5, 7] }],
};

module.exports.complex_nesting = {
    text: 'this is some simple test data',
    ranges: [
        { type: 'i', indices: [5, 19] },
        { type: 'b', indices: [5, 19] },
        { type: 'blockquote', indices: [5, 19] },
        { type: 'code', indices: [6, 7] },
        { type: 'code', indices: [10, 11] },
    ],
};

module.exports.a_simple_beginning = {
    text: 'one to ten',
    ranges: [
        {
            indices: [0, 3],
            type: 'foobar',
            url: 'http://google.com',
            alt: 'alttext',
        },
    ],
};

module.exports.a_simple_middle = {
    text: 'one to ten',
    ranges: [{ type: 'link', indices: [4, 6], url: 'http://google.com' }],
};

module.exports.a_simple_end = {
    text: 'one to ten',
    ranges: [{ type: 'link', indices: [7, 10], url: 'http://google.com' }],
};

module.exports.a_stats = {
    text: 'one to ten',
    ranges: [{ type: 'stat', indices: [4, 6], url: 'http://google.com' }],
};

module.exports.a_nesting = {
    text: 'one to ten',
    ranges: [
        { indices: [4, 6], type: 'em' },
        {
            indices: [0, 6],
            type: 'foobar',
            url: 'http://google.com',
            alt: 'alttext',
        },
    ],
};

module.exports.a_nested = {
    text: 'one to ten',
    ranges: [
        { indices: [0, 6], type: 'em' },
        {
            indices: [4, 6],
            type: 'foobar',
            url: 'http://google.com',
            alt: 'alttext',
        },
    ],
};

module.exports.a_image = {
    text: 'one to ten',
    ranges: [
        {
            indices: [4, 6],
            type: 'foobar',
            url: 'http://google.com',
            alt: 'alttext',
        },
    ],
    media: [
        {
            indices: [4, 4],
            url: 'http://example.com/example.png',
            type: 'image',
        },
    ],
};

module.exports.a_image_only = {
    text: 'one to ten',
    ranges: [
        {
            indices: [4, 4],
            type: 'foobar',
            url: 'http://google.com',
            alt: 'alttext',
        },
    ],
    media: [
        {
            indices: [4, 4],
            url: 'http://example.com/example.png',
            type: 'image',
        },
    ],
};

module.exports.user_then_post = {
    text: 'aaaaaaaaaaaaaaaaaaaaa',
    ranges: [
        {
            type: 'user',
            indices: [0, 9],
            url: 'http:\/\/aaaaaaa.com',
            site_id: 11111111,
            email: 'aaa@aaaaaaaaaa.com',
            id: 11111111,
        },
        {
            type: 'post',
            indices: [13, 21],
            url: 'https:\/\/bbbbbbbbb.com\/bbbb\/bb\/bb\/bbbbbbbb\/',
            site_id: 22222222,
            id: 2222,
        },
    ],
    media: [
        {
            type: 'image',
            indices: [0, 0],
            height: '256',
            width: '256',
            url: 'https:\/\/1.gravatar.com\/avatar\/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?s=256&r=G',
        },
    ],
};

module.exports.post_then_user = {
    text: 'aaaaaaaaaaaaaaaaaaaaa',
    ranges: [
        {
            type: 'post',
            indices: [13, 21],
            url: 'https:\/\/bbbbbbbbb.com\/bbbb\/bb\/bb\/bbbbbbbb\/',
            site_id: 22222222,
            id: 2222,
        },
        {
            type: 'user',
            indices: [0, 9],
            url: 'http:\/\/aaaaaaa.com',
            site_id: 11111111,
            email: 'aaa@aaaaaaaaaa.com',
            id: 11111111,
        },
    ],
    media: [
        {
            type: 'image',
            indices: [0, 0],
            height: '256',
            width: '256',
            url: 'https:\/\/1.gravatar.com\/avatar\/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa?s=256&r=G',
        },
    ],
};
