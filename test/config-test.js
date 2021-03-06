'use strict';

var assert = require('chai').assert;
var Config = require('../lib/config');

var ok        = assert.ok;
var deepEqual = assert.deepEqual;

describe('Config', function() {
  it('module exists', function() {
    ok(Config);
  });

  describe('constructor', function() {
    it('returns an empty object if a path doesn\'t exist', function() {
      var config = new Config();

      deepEqual(config, {});
    });

    it('returns an empty object if a path exists but the file is empty', function() {
      var config = new Config('test/fixtures/empty.json');

      deepEqual(config, {});
    });

    it('returns an empty object if a path exists and file has settings', function() {
      var config = new Config('test/fixtures/config.json');

      deepEqual(config, {
        foo: 'bar',
        baz: 5,
        'bazinga-blah-blah': 'hello'
      });
    });

    it('strips single line comments from JSON strings', function() {
      var config = new Config('test/fixtures/single-line-comments.json');

      deepEqual(config, {
        foo: 'bar',
        baz: 5,
        'bazinga-blah-blah': 'hello',
        url: 'http://bas.com'
      });
    });

    it('strips multi-line comments from JSON strings', function() {
      var config = new Config('test/fixtures/multi-line-comments.json');

      deepEqual(config, {
        foo: 'bar',
        baz: 5,
        'bazinga-blah-blah': 'hello',
        url: 'http://bal.com'
      });
    });
  });
});
