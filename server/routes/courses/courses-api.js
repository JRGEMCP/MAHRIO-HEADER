'use strict';

var CourseCtrl = require('./courses-functions');

module.exports = function( server ) {
  server.route({
    method: 'GET',
    path: '/api/courses/{id}/{url?}',
    config: {
      handler: CourseCtrl.get
    }
  });

  server.route({
    method: 'POST',
    path: '/api/courses',
    config: {
      handler: CourseCtrl.create,
      auth: 'simple'
    }
  });

  server.route({
    method: 'PUT',
    path: '/api/courses/{id}/{type}',
    config: {
      handler: CourseCtrl.update,
      auth: 'simple'
    }
  });

  server.route({
    method: 'DELETE',
    path: '/api/courses/{id}',
    config: {
      handler: CourseCtrl.remove,
      auth: 'simple'
    }
  });
}