'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}
var schema = mongoose.Schema({
    heading: {type: String, default: null},
    body: {type: String},
    type: {type: String, default: 'Text'},
    order: {type: Number}
  }),
  Section = mongoose.model('Section', schema);

module.exports = Section;