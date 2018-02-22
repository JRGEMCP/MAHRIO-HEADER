'use strict';

require('./section');

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}
var Schema = mongoose.Schema;

var Article = new Schema({
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
    lastUpdated: { type: Date, default: null},
    log: [{type: Object}],
    creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    published: { type: Boolean, default: false},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]
  });

Article.pre('save', function (next) {
    this.lastUpdated = Date.now();
    next();
});

module.exports = mongoose.model('Article', Article);