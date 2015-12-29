'use strict';

var assert = require('assert');
var greekStemmer = require('../lib');
var YAML = require('yamljs');
var path = require('path');
var examples = YAML.load(path.join(__dirname, './fixtures/examples.yml'));

describe('greek-stemmer', function () {
  describe('stem()', function () {
    it('should stem words in examples properly ', function () {
      for (var word in examples) {
        assert(examples[word], greekStemmer.stem(word));
      }
    });
  });
});

describe('greek-stemmer', function () {
  it('should not stem words not in ', function () {
    assert('STEMMED', greekStemmer.stem('STEMMED'));
  });
});
