'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var Boom = require('boom'),
  Topic = mongoose.model('Topic');

module.exports = {
  get: function(req, rep){
    Topic.find({published: true}).populate('articles').exec( function(err, topics) {
      if( err ) { return rep( Boom.badRequest(err) ); }

      rep({topics: topics});
    });
  },
  create: function(req, rep){
    if(req.payload.topic && req.auth.credentials ){
      req.payload.topic.creator = req.auth.credentials.id;
    } else {
      return rep( Boom.badRequest() );
    }

    Topic.create( req.payload.topic, function ( err ) {
      if( err ) {
        if( 11000 === err.code || 11001 === err.code ) {
          return rep( Boom.badRequest("Duplicate key error index") );
        } else {
          return rep( Boom.badRequest(err) );
        }
      }
      rep({created: true});
    });
  },
  update: function(req, rep){
    let updateObj = {};
    if( req.auth.credentials.access.indexOf('admin') === -1 ){
      return rep( Boom.forbidden() );
    }

    switch(req.params.type){
      case 'publish':
        updateObj = typeof req.query.true !== 'undefined' ? {published: true} : {};
        if( typeof req.query.false !== 'undefined') {
          updateObj = {published: false};
        }
        break;
      case 'articles':
        updateObj = {
          topics: req.payload.articles || []
        }
        break;
      case 'body':
        updateObj = {
          body: req.payload.body || []
        }
        break;
      case 'tags':
        updateObj = {
          tags: req.payload.tags || []
        }
        break;
      case 'info':
        if( !req.payload.topic ){ return rep(Boom.badRequest()) }
        updateObj = {
          title: req.payload.topic.title,
          link: req.payload.topic.link,
          deck: req.payload.topic.deck
        }
        break;
      default:
        return rep( Boom.badRequest() );
    }

    Topic.update({_id: req.params.id}, updateObj, {multi: false}, function(err, update){
      if( err ){ return rep(Boom.badRequest(err)); }

      return rep({updated: update});
    })
  },
  remove: function(req, rep){
    Topic.remove({_id: req.params.id}).exec( function(err, topic) {
      if( err ) { return rep( Boom.badRequest(err) ); }

      if( topic && topic.result && topic.result.ok ) {
        rep({deleted: true});
      } else {
        rep({deleted: false});
      }
    });
  }
}