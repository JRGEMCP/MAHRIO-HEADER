'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var Boom = require('boom'),
  Category = mongoose.model('Category');

module.exports = {
  get: function(req, rep){
    Category.find({published: true}).populate('topics').exec( function(err, categories) {
      if( err ) { return rep( Boom.badRequest(err) ); }

      rep({categories: categories});
    });
  },
  create: function(req, rep){ console.log( req.payload.topic );
    Category.create( req.payload.category, function ( err ) {
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
      case 'topics':
        updateObj = {
          topics: req.payload.topics || []
        }
        break;
      case 'tags':
        updateObj = {
          tags: req.payload.tags || []
        }
        break;
      case 'body':
        updateObj = {
          body: req.payload.body || []
        }
        break;
      case 'info':
        if( !req.payload.category ){ return rep(Boom.badRequest()) }
        updateObj = {
          title: req.payload.category.title,
          link: req.payload.category.link,
          deck: req.payload.category.deck
        }
        break;
      default:
        return rep( Boom.badRequest() );
    }

    Category.update({_id: req.params.id}, updateObj, {multi: false}, function(err, update){
      if( err ){ return rep(Boom.badRequest(err)); }

      return rep({updated: update});
    })
  },
  remove: function(req, rep){
    Category.remove({_id: req.params.id}).exec( function(err, category) {
      if( err ) { return rep( Boom.badRequest(err) ); }

      if( category && category.result && category.result.ok ) {
        rep({deleted: true});
      } else {
        rep({deleted: false});
      }
    });
  }
}