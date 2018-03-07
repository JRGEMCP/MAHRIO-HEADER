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
  link: {type: String, unique: true},
  deck: {type: String},
  body: [{type:String}],
  tags: [{type:String}],
  state: {type: String, default: 'DISCOVERING'},
  topics: [{type: mongoose.Schema.Types.ObjectId, ref: 'Topic'}],
  published: {type: Boolean, default: false},
  created: { type: Date, default: Date.now },
  creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}]
});

module.exports = mongoose.model('Category', schema);