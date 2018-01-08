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
    title: {type: String, required: true, unique: true},
    link: {type: String, unique: true},
    deck: {type: String},
    tags: [{type: String}],
    repo: {type: String},
    state: {type: String, default: 'DISCOVERING'},
    type: {type: String, default: 'Article'},
    code: {type: Object, default: {git: null, cache: null} },
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
    created: { type: Date, default: Date.now },
    log: [{type: Object}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    published: { type: Boolean, default: false}
  });

module.exports = mongoose.model('Article', schema);