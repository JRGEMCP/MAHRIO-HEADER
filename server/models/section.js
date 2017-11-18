'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}
var schema = mongoose.Schema({
    heading: {type: String, required: true},
    body: {type: String, default: null},
    url: {type: String, default: null},
    created: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Section', schema);