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
  Course = mongoose.model('Course');

module.exports = {
  getCourse: function(id, callback){
    Course.find({_id: id}).exec( function(err, course){
      if( err || !course ) {
        callback();
      }
      callback( course );
    })
  },
  addModule: function(id, module, rep){ // INTERNAL
    Course.update({_id: id}, {$push: {modules: module._id}}, {multi: false}, function(err, update){
      if( err ){ return rep(Boom.badRequest(err)); }

      return rep({module: module});
    })
  },
  removeModule: function( courseId, moduleId, rep){
    Course.update({_id: courseId}, {$pop: {modules: moduleId}}, {multi: false}, function(err, update){
      if( err ){ return rep(Boom.badRequest(err)); }

      return rep({deleted: true});
    })
  },
  get: function(req, rep){
    let query = {published: true},
      pop = 'modules';

    if( req.params.id && ['all','url'].indexOf(req.params.id) == -1 ){
      query['_id'] = req.params.id;
    }
    if( req.params.id && req.params.id === 'url' ){
      query['link'] = req.params.url;
    }
    if( typeof req.query.edit !== 'undefined') {
      delete query.published;
    }
    Course.find(query).populate(pop).exec( function(err, courses) {
      if( err ) { return rep( Boom.badRequest(err) ); }

      async.each( courses, function(course, cb){
        async.each( course.modules, function(module, cb2){
          async.each( ['articles','features'], function(child, cb3){
            module.populate(child, function(err){
              cb3();
            })
          }, function(){
            cb2();
          });
        }, function(){
          cb();
        })
      }, function(){
        rep({courses: courses});
      });
    });
  },
  create: function(req, rep){
    if(req.payload.course && req.payload.course.title && req.payload.course.link ){
      req.payload.course.creator = req.auth.credentials.id;
    } else {
      return rep( Boom.badRequest() );
    }

    Course.create( req.payload.course, function ( err, course ) {
      if( err ) {
        if( 11000 === err.code || 11001 === err.code ) {
          return rep( Boom.badRequest("Duplicate key error index") );
        } else {
          return rep( Boom.badRequest(err) );
        }
      }
      rep({course: course});
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
      case 'tags':
        updateObj = {
          tags: req.payload.tags || []
        }
        break;
      case 'info':
        if( !req.payload.course ){ return rep(Boom.badRequest()) }
        updateObj = {
          title: req.payload.course.title,
          link: req.payload.course.link,
          deck: req.payload.course.deck
        }
        break;
      default:
        return rep( Boom.badRequest() );
    }

    Course.update({_id: req.params.id}, updateObj, {multi: false}, function(err, update){
      if( err ){ return rep(Boom.badRequest(err)); }

      return rep({updated: update});
    })
  },
  remove: function(req, rep){
    // access control?

    Course.remove({_id: req.params.id}).exec( function(err, topic) {
      if( err ) { return rep( Boom.badRequest(err) ); }

      if( course && course.result && course.result.ok ) {
        rep({deleted: true});
      } else {
        rep({deleted: false});
      }
    });
  }
}