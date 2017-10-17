'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var Boom = require('boom'),
  User = mongoose.model('User');

module.exports = {
  get: function(req, rep){
    User.findOne({_id: req.auth.credentials.id}, function(err, user){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({favorites: user.favorites});
    })
  },
  update: function(req, rep){
    User.update({_id: req.auth.credentials.id}, {$addToSet: {favorites: req.params.id}}, {multi: false}, function(err,user){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({update: true});
    });
  },
  delete: function(req, rep){
    User.update({_id: req.auth.credentials.id}, {$pull: {favorites: req.params.id}}, {multi: false}, function(err,user){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({update: true});
    });
  }
}