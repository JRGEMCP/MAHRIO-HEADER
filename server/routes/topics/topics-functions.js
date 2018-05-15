'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}
var async = require('async');
var Boom = require('boom'),
  Topic = mongoose.model('Topic');

module.exports = {
  get: function(req, rep){
    let query = {published: true},
      pop = 'articles';

    if( req.params.id && ['all','url'].indexOf(req.params.id) == -1 ){
      query['_id'] = req.params.id;
    }
    if( req.params.id && req.params.id === 'url' ){
      query['link'] = req.params.url;
    }
    if( typeof req.query.edit !== 'undefined') {
      delete query.published;
      if(req.auth.isAuthenticated) {
        query['creator'] = req.auth.credentials.id;
      } else {
        return rep( Boom.unauthorized() );
      }
    }
    if(req.auth.isAuthenticated) {
      query['creator'] = req.auth.credentials.id;
    }
    Topic.find(query).populate(pop).exec( function(err, topics) {
      if( err ) { return rep( Boom.badRequest(err) ); }

      async.each( topics, function(topic, cb){
        async.each( topic.articles, function(article, cb2){
          article.populate('sections', function(err, sec){
            cb2();
          })
        }, function(){
          cb();
        })
      }, function(){
        rep({topics: topics});
      });
    });
  },
  create: function(req, rep){
    if(req.payload.topic && req.payload.topic.title && req.payload.topic.link ){
      req.payload.topic.creator = req.auth.credentials.id;
    } else {
      return rep( Boom.badRequest() );
    }

    Topic.create( req.payload.topic, function ( err, topic ) {
      if( err ) {
        if( 11000 === err.code || 11001 === err.code ) {
          return rep( Boom.badRequest("Duplicate key error index") );
        } else {
          return rep( Boom.badRequest(err) );
        }
      }
      rep({topic: topic});
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
      case 'articles':
        updateObj = {
          $set: {
            articles: req.payload.articles || []
          }
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