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
    type: {type: String, default: 'Article'},
    sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'Section'}],
    created: { type: Date, default: Date.now },
    published: {type: Boolean, default: false},
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  }),
  Article = mongoose.model('Article', schema);

module.exports = Article;