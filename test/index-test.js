var vows = require('vows');
var assert = require('assert');
var util = require('util');
var miiCard = require('passport-miiCard');


vows.describe('passport-miiCard').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(miiCard.version);
    },
  },
  
}).export(module);