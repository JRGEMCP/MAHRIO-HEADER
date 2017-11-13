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
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  Section = mongoose.model('Section');

module.exports = {
  create: function(req, rep){
    Section.create( req.payload.section, function(err, section){
      if( err ) { return rep( Boom.badRequest(err) ); }

      Article.update({_id: req.params.id}, {sections: {$push: section._id}}, {multi: false}, function(err, article){
        return rep({section: section});
      });
    });
  },
  createMany: function(req, rep){
    if( !req.payload.sections) { return rep(Boom.badRequest()); }

    Section.create( req.payload.sections, function(err, sections){
      if( err ) { return rep( Boom.badRequest(err) ); }

      async.each( sections, function(sec, cb){
        Article.update({_id: req.params.id}, {$push: {sections: sec.id}}, {multi: false}, function (err, article) {
          cb();
        });
      }, function(){
        return rep({test: true});
      });
    });
  },
  updateMany: function(req, rep){
    if( !req.payload.sections) { return rep(Boom.badRequest()); }

    async.each( req.payload.sections, function(sec, cb){
      Section.update({_id: sec._id}, {heading: sec.heading, body: sec.body}, {multi: false}, function (err, article) {
        cb();
      });
    }, function(){
      return rep({updated: true});
    });
  },
  update: function(req, rep){
    if( !req.payload.section) {
      return rep(Boom.badRequest());
    }

    Section.update({_id: req.params.sid}, req.payload.section, {multi: false}, function(err, section){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({section: section});
    });
  },
  updateUrl: function(id, cb){ // INTERNAL
    Section.update({_id: id}, {url: id}, {multi: false}, function(err){
      cb(err);
    });
  },
  remove: function(req, rep){
    Article.update({_id: req.params.id}, {$pull: {sections: req.params.secId}}, {multi: false}, function(err, article){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({article: article});
    });
  }
};