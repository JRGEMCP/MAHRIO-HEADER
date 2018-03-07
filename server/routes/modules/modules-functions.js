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
  CourseCtrl = require('./../courses/courses-functions'),
  Module = mongoose.model('Module');

module.exports = {
  create: function(req, rep){
    if(!req.payload.module || !req.payload.module.title || !req.payload.courseId ) {
      return rep(Boom.badRequest());
    }

    CourseCtrl.getCourse( req.payload.courseId, function(course){
      if( !course ) { return rep( Boom.badRequest('Invalid Course') ); }

      Module.create( req.payload.module, function ( err, module ) {
        if( err ) { return rep( Boom.badRequest(err) ); }

        return CourseCtrl.addModule( req.payload.courseId, module, rep);
      });
    });
  },
  update: function(req, rep){
    let updateObj = {};
    if( req.auth.credentials.access.indexOf('instructor') === -1 ){
      return rep( Boom.forbidden() );
    }

    switch(req.params.type){
      case 'articles':
        updateObj = {
          $set: {
            articles: req.payload.articles || []
          }
        }
        break;
      case 'features':
        updateObj = {
          $set: {
            features: req.payload.features || []
          }
        }
        break;
      case 'categories':
        updateObj = {
          $set: {
            categories: req.payload.product || []
          }
        }
        break;
      case 'content':
        updateObj = {
          content: req.payload.content || []
        }
        break;
      case 'info':
        if( !req.payload.module ){ return rep(Boom.badRequest()) }
        updateObj = {
          title: req.payload.module.title
        }
        break;
      default:
        return rep( Boom.badRequest() );
    }

    Module.update({_id: req.params.id}, updateObj, {multi: false}, function(err, update){
      if( err ){ return rep(Boom.badRequest(err)); }

      return rep({updated: update});
    })
  },
  remove: function(req, rep){
    if(!req.query.courseId) {
      return rep(Boom.badRequest());
    }

    CourseCtrl.getCourse( req.query.courseId, function(course) {
      if (!course) { return rep(Boom.badRequest()); }

      Module.remove({_id: req.params.id}).exec(function (err, module) {
        if (err) { return rep(Boom.badRequest(err)); }

        if (module && module.result && module.result.ok) {
          return CourseCtrl.removeModule( req.query.courseId, req.params.id, rep);
        } else {
          rep({deleted: false});
        }
      });
    });
  }
}