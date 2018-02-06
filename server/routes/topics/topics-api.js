'use strict';

var TopicCtrl = require('./topics-functions');

module.exports = function( server ) {
  server.route({
    method: 'GET',
    path: '/api/topics/{id}/{url?}',
    config: {
      handler: TopicCtrl.get
    }
  });

  server.route({
    method: 'POST',
    path: '/api/topics',
    config: {
      handler: TopicCtrl.create,
      auth: 'simple'
    }
  });

  server.route({
    method: 'PUT',
    path: '/api/topics/{id}/{type}',
    config: {
      handler: TopicCtrl.update,
      auth: 'simple'
    }
  });

  server.route({
    method: 'DELETE',
    path: '/api/topics/{id}',
    config: {
      handler: TopicCtrl.remove,
      auth: 'simple'
    }
  });
}