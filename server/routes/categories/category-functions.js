'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}
var async = require('async'),
  Boom = require('boom'),
  Category = mongoose.model('Category');

module.exports = {
  get: function(req, rep){
    let query = {published: true},
      pop = 'topics';

    if( req.params.id && ['all','url'].indexOf(req.params.id) == -1 ){
      query['_id'] = req.params.id;
    }
    if( req.params.id && req.params.id === 'url' ){
      query['link'] = req.params.url;
    }
    if( typeof req.query.edit !== 'undefined') {
      delete query.published;
    }

    Category.find(query).populate(pop).exec( function(err, categories) {
      if( err ) { return rep( Boom.badRequest(err) ); }

      async.each( categories, function(category, cb){
        async.each( category.topics, function(feature, cb2){
          feature.populate('articles', function(err){
            cb2();
          });
        }, function(){
          cb();
        })
      }, function(){
        rep({categories: categories});
      });
    });
  },
  create: function(req, rep){
    if(req.payload.category && req.payload.category.title && req.payload.category.link ){
      req.payload.category.creator = req.auth.credentials.id;
    } else {
      return rep( Boom.badRequest() );
    }

    Category.create( req.payload.category, function ( err, category ) {
      if( err ) {
        if( 11000 === err.code || 11001 === err.code ) {
          return rep( Boom.badRequest("Duplicate key error index") );
        } else {
          return rep( Boom.badRequest(err) );
        }
      }
      rep({category: category});
    });
  },
  update: function(req, rep){
    let updateObj = {};
    if( req.auth.credentials.access.indexOf('instructor') === -1 ){
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