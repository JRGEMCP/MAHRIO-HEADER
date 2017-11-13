'use strict';

require('./section');

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var schema = mongoose.Schema({
    title: {type: String, required: true},
    link: {type: String, unique: true},
    deck: {type: String},
    repo: {type: String},
    state: {type: String, default: 'DISCOVERING'},
    type: {type: String, default: 'Article'},
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
    created: { type: Date, default: Date.now },
    published: {type: Boolean, default: false},
    log: [{type: Object}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  });

module.exports = mongoose.model('Article', schema);