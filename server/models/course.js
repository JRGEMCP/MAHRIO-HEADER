'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var schema = mongoose.Schema({
  title: {type: String, required: true, unique: true},
  link: {type: String, required: true, unique: true},
  deck: {type: String},
  tags: [{type: String}],
  modules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Module', unique: true}],
  created: { type: Date, default: Date.now },
  published: {type: Boolean, default: false},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Course', schema);