'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var Boom = require('boom'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  Section = mongoose.model('Section');

module.exports = {
  get: function(req, rep){
    if( req.params.link ) {
      Article
        .findOne({link: req.params.link})
        .populate('sections')
        .exec( function(err, article){
          if( err ) { return rep( Boom.badRequest(err) ); }

          return rep({article: article});
        });
    } else {
      Article
        .find( req.auth.isAuthenticated ? {creator: req.auth.credentials.id} : {} )
        .sort( {created: -1})
        .populate('sections')
        .exec( function(err, articles){
          if( err ) { return rep( Boom.badRequest(err) ); }

          return rep({articles: articles});
        });
    }
  },
  create: function(req, rep){
    if(req.payload.article){
      req.payload.article.creator = req.auth.credentials.id;
    }
    Article.create( req.payload.article, function(err, article){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({article: article});

    });
  },
  update: function(req, rep){
    if( !req.payload.article) {
      return rep(Boom.badRequest());
    }

    Article.update({_id: req.params.id}, req.payload.article, {multi: false}, function(err,article){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({article: article});
    })


  },
  remove: function(req, rep){

  }
};