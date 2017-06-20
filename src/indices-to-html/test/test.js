var assert = require('assert');
var data = require('./data');
var convert = require('../');
var jsdom = require('mocha-jsdom');

jsdom();

function assertFragmentsAreEqual(frag1, frag2) {
  var e1 = document.createElement('div');
  e1.appendChild(frag1);
  var e2 = document.createElement('div');
  e2.appendChild(frag2);
  assert.equal(e1.innerHTML, e2.innerHTML);
  assert.equal(e1.innerText, e2.innerText);
}

function assertNodeTypes(pattern, fragment) {
  assert.equal(pattern.length, fragment.childNodes.length);
  pattern.forEach(function(type, index) {
    switch (type) {
      case 'text':
        assert.equal(document.TEXT_NODE || 3, fragment.childNodes[index].nodeType);
        break;
      default:
        assert.equal(document.ELEMENT_NODE || 1, fragment.childNodes[index].nodeType);
        assert.equal(type.toUpperCase(), fragment.childNodes[index].tagName.toUpperCase());
        break;
    }
  });
}

function assertTextContents(pattern, fragment) {
  assert.equal(pattern.length, fragment.childNodes.length);

  pattern.forEach(function(text, index) {
    switch (fragment.childNodes[index].nodeType) {
      case document.ELEMENT_NODE || 1:
        assert.equal(text, fragment.childNodes[index].textContent);
        break;
      case document.TEXT_NODE || 3:
        assert.equal(text, fragment.childNodes[index].nodeValue);
        break;
      default:
        assert.fail(
          fragment.childNodes[index].nodeType,
          [document.ELEMENT_NODE || 1, document.TEXT_NODE || 3],
          'unknown nodeType',
          'NOT IN'
        );
    }
  });
}

function assertAttributes(pattern, fragment) {
  assert.equal(pattern.length, fragment.childNodes.length);

  pattern.forEach(function(attributes, index) {
    Object.keys(attributes).forEach(function(key) {
      var actual = fragment.childNodes[index].getAttribute(key);
      var expected = attributes[key];

      if ('class' == key) {
        if (null !== actual) {
          actual = actual.split(/\s+/);
          actual.sort();
          actual = actual.join(' ');
        }

        if (null !== expected) {
          expected = expected.split(/\s+/);
          expected.sort();
          expected = expected.join(' ');
        }
      }

      assert.strictEqual(expected, actual);
    });
  });
}

describe('Indices To HTML', function() {
  describe('module', function() {
    it('should export .html()', function(done) {
      assert('function' === typeof convert.html);
      done();
    });
  });

  describe('trivial', function() {
    it('should return a single text node', function(done) {
      var trivial = convert(data.trivial);
      assertTextContents(['Hello World!'], trivial);
      assertNodeTypes(['text'], trivial);
      done();
    });
  });

  describe('links', function() {
    it('should return a text node followed by a link followed by a text node if given a URL in the middle', function(
      done
    ) {
      var one_link_in_middle = convert(data.one_link_in_middle);
      assertTextContents(['This is a ', 'link', '.'], one_link_in_middle);
      assertNodeTypes(['text', 'a', 'text'], one_link_in_middle);
      assertAttributes(
        [
          {},
          {
            href: 'https://example.com/',
            class: null,
          },
          {},
        ],
        one_link_in_middle
      );
      done();
    });

    it('should return a span with class=user followed by a text node if given a linkless user at the beginning', function(
      done
    ) {
      var one_linkless_user_at_beginning = convert(data.one_linkless_user_at_beginning);
      assertTextContents(['Mike Adams (mdawaffe)', ' is a user.'], one_linkless_user_at_beginning);
      assertNodeTypes(['span', 'text'], one_linkless_user_at_beginning);
      assertAttributes(
        [
          {
            class: 'user',
          },
          {},
        ],
        one_linkless_user_at_beginning
      );
      done();
    });

    it('should correctly parse multiple users and a post', function(done) {
      var several_users_and_a_post = convert(data.several_users_and_a_post);
      assertTextContents(
        ['foo', ', ', 'bar', ', and 21 others liked your post ', '"You will like this"'],
        several_users_and_a_post
      );
      assertNodeTypes(['a', 'text', 'a', 'text', 'a'], several_users_and_a_post);
      assertAttributes(
        [
          {
            href: 'https://foo.example.com/',
            class: 'user',
          },
          {},
          {
            href: 'https://bar.example.com/',
            class: 'user',
          },
          {},
          {
            href: 'https://me.example.com/2014/06/17/you-will-like-this/',
            class: 'post',
          },
        ],
        several_users_and_a_post
      );
      done();
    });
  });

  describe('no links', function() {
    it('should return a text node followed by a span followed by a text node if given a URL in the middle', function(
      done
    ) {
      var one_link_in_middle = convert(data.one_link_in_middle, {
        links: false,
      });
      assertTextContents(['This is a ', 'link', '.'], one_link_in_middle);
      assertNodeTypes(['text', 'span', 'text'], one_link_in_middle);
      assertAttributes(
        [
          {},
          {
            href: null,
            class: null,
          },
          {},
        ],
        one_link_in_middle
      );
      done();
    });

    it('should correctly parse multiple users and a post', function(done) {
      var several_users_and_a_post = convert(data.several_users_and_a_post, {
        links: false,
      });
      assertTextContents(
        ['foo', ', ', 'bar', ', and 21 others liked your post ', '"You will like this"'],
        several_users_and_a_post
      );
      assertNodeTypes(['span', 'text', 'span', 'text', 'span'], several_users_and_a_post);
      assertAttributes(
        [
          {
            href: null,
            class: 'user',
          },
          {},
          {
            href: null,
            class: 'user',
          },
          {},
          {
            href: null,
            class: 'post',
          },
        ],
        several_users_and_a_post
      );
      done();
    });
  });

  describe('blockquotes', function() {
    it('should generate a blockquote tag from a blockquote range type', function(done) {
      var one_blockquote = convert(data.one_blockquote);
      assertTextContents(['foo said ', 'yo', ' bar'], one_blockquote);
      assertNodeTypes(['text', 'blockquote', 'text'], one_blockquote);
      assertAttributes(
        [
          {},
          {
            href: null,
            class: 'blockquote',
          },
          {},
        ],
        one_blockquote
      );
      done();
    });
  });

  describe('range-ordering', function() {
    it('should produce the same html regardless of indices ordering', function(done) {
      assertFragmentsAreEqual(convert(data.user_then_post), convert(data.post_then_user));
      done();
    });
  });

  describe('links', function() {
    it('links should render at the beginning of a range', function(done) {
      var result = convert(data.a_simple_beginning);
      assertNodeTypes(['a', 'text'], result);
      assertAttributes([{ href: 'http://google.com', target: '_blank' }, {}], result);
      assertTextContents(['one', ' to ten'], result);
      done();
    });
    it('links should render at the middle of a range', function(done) {
      var result = convert(data.a_simple_middle);
      assertNodeTypes(['text', 'a', 'text'], result);
      assertTextContents(['one ', 'to', ' ten'], result);
      done();
    });
    it('links should render at the end of a range', function(done) {
      var result = convert(data.a_simple_end);
      assertNodeTypes(['text', 'a'], result);
      assertTextContents(['one to ', 'ten'], result);
      done();
    });
    it('links should be able to have nested formatting', function(done) {
      var result = convert(data.a_nesting);
      assertNodeTypes(['a', 'text'], result);
      assertNodeTypes(['text', 'em'], result.childNodes[0]);
      done();
    });
    it('links should be able to be nested inside formatting', function(done) {
      var result = convert(data.a_nested);
      assertNodeTypes(['em', 'text'], result);
      assertNodeTypes(['text', 'a'], result.childNodes[0]);
      done();
    });
    it('images should render inside of links', function(done) {
      var result = convert(data.a_image);
      assertNodeTypes(['text', 'a', 'text'], result);
      assertNodeTypes(['img', 'text'], result.childNodes[1]);
      done();
    });
    it('images should render inside of links when both have a zero length range', function(done) {
      var result = convert(data.a_image_only);
      assertNodeTypes(['text', 'a', 'text'], result);
      assertNodeTypes(['img'], result.childNodes[1]);
      done();
    });
    it('stats links should target the parent window', function(done) {
      var result = convert(data.a_stats);
      assertNodeTypes(['text', 'a', 'text'], result);
      assertAttributes([{}, { target: '_parent' }, {}], result);
      done();
    });
  });

  describe('nesting', function() {
    it('should work with simple nested ranges', function(done) {
      // Nested formatting tags such as <strong> and <em> don't change the innerText
      // of the parent element. Which is why we test for "is some", [ "is", " some" ],
      // and [ "is" ]
      var result = convert(data.simple_nesting);
      assertNodeTypes(['text', 'em', 'text'], result);
      assertTextContents(['this ', 'is some', ' simple test data'], result);
      assertNodeTypes(['strong', 'text'], result.childNodes[1]);
      assertTextContents(['is', ' some'], result.childNodes[1]);
      assertTextContents(['is'], result.childNodes[1].childNodes[0]);
      done();
    });
    it('should work with complex nested ranges', function(done) {
      var result = convert(data.complex_nesting);
      assertNodeTypes(['text', 'em', 'text'], result);
      assertNodeTypes(['strong'], result.childNodes[1]);
      assertNodeTypes(['blockquote'], result.childNodes[1].children[0]);
      assertNodeTypes(
        ['text', 'code', 'text', 'code', 'text'],
        result.childNodes[1].children[0].children[0]
      );
      done();
    });
    if (
      (
        'should observe the 0,0 special case for ranges',
        function(done) {
          var result = convert(data.special_case_nesting);
          assertNodeTypes(['span', 'strong', 'text', 'strong', 'text'], result);
          assertTextContents(['', 'this is', ' s', '', 'me simple test data'], result);
          assertNodeTypes(['em', 'text'], result.childNodes[3]);
          assertTextContents(['', 'o'], result.childNodes[3]);
          done();
        }
      )
    );
  });

  describe('media', function() {
    it('should consume text as the alt attribute for non-trivial index width', function(done) {
      var media_with_alt_text = convert(data.media_with_alt_text);
      assertTextContents([''], media_with_alt_text);
      assertNodeTypes(['img'], media_with_alt_text);
      assertAttributes(
        [
          {
            src: 'https://i0.wp.com/s.w.org/about/images/wpmini-blue.png',
            alt: 'this is the alt text',
            class: 'image',
          },
        ],
        media_with_alt_text
      );
      done();
    });

    it('should consume no text as an alt attribute for trivial index width', function(done) {
      var initial_media_with_no_alt_text = convert(data.initial_media_with_no_alt_text);
      assertTextContents(['', 'this is not alt text'], initial_media_with_no_alt_text);
      assertNodeTypes(['img', 'text'], initial_media_with_no_alt_text);
      assertAttributes(
        [
          {
            src: 'https://i0.wp.com/s.w.org/about/images/wpmini-blue.png',
            alt: null,
            class: 'image',
          },
          {},
        ],
        initial_media_with_no_alt_text
      );
      done();
    });

    it('should consume no text as an alt attribut for initial image and all text for subsequent link', function(
      done
    ) {
      var initial_media_followed_by_user = convert(data.initial_media_followed_by_user);
      assertTextContents(['', 'somebody'], initial_media_followed_by_user);
      assertNodeTypes(['img', 'a'], initial_media_followed_by_user);
      assertAttributes(
        [
          {
            src: 'https://i0.wp.com/s.w.org/about/images/wpmini-blue.png',
            alt: null,
            class: 'image',
          },
          {
            href: 'https://somebody.example.com/',
            class: 'user',
          },
        ],
        initial_media_followed_by_user
      );
      done();
    });

    it('should create a badge for the badge media type', function(done) {
      var badge_with_alt_text = convert(data.badge_with_alt_text);

      assertTextContents([''], badge_with_alt_text);
      assertNodeTypes(['img'], badge_with_alt_text);
      assertAttributes(
        [
          {
            src: 'https://i0.wp.com/s.w.org/about/images/wpmini-blue.png',
            alt: 'First Post',
            class: 'badge',
            height: '128',
            width: '128',
          },
        ],
        badge_with_alt_text
      );
      done();
    });

    it('should set default height/width for badges without height/width properties', function(
      done
    ) {
      var badge_with_no_height_width = convert(data.badge_with_no_height_width);

      assertTextContents([''], badge_with_no_height_width);
      assertNodeTypes(['img'], badge_with_no_height_width);
      assertAttributes(
        [
          {
            height: '256',
            width: '256',
            class: 'badge',
          },
        ],
        badge_with_no_height_width
      );
      done();
    });
  });
});
