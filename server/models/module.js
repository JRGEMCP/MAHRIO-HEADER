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
  start: { type: Date, default: null },
  end: { type: Date, default: null },
  articles: [{type: mongoose.Schema.Types.ObjectId, ref: 'Article', unique: true}],
  features: [{type: mongoose.Schema.Types.ObjectId, ref: 'Topic', unique: true}],
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category', unique: true}],
  content: [{type: String}] // article_{{id}}_insert || feature_{{id}}_insert || category_{{id}}_insert
});

module.exports = mongoose.model('Module', schema);