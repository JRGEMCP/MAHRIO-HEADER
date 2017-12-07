'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}
var schema = mongoose.Schema({
    url: { type: String, required: true },
    size: { type: String, requred: true },
    type: { type: String, required: true },
    filename: {type: String, required: true, unique: true},
    thumb: { type: String},
    created: {type: Date}
  });

module.exports = mongoose.model('Media', schema);