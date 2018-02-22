'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var schema = mongoose.Schema({
  heading: {type: String, required: true, unique: true},
  deck: {type: String},
  options: [{type: String, required: true, unique: true}],
  answer: {type: String, required: true}
});

module.exports = mongoose.model('Question', schema);