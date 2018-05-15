'use strict';

var CategoryCtrl = require('./category-functions');

module.exports = function( server ) {
  server.route({
    method: 'GET',
    path: '/api/categories/{id}/{url?}',
    config: {
      handler: CategoryCtrl.get,
      auth: {
        mode: 'try',
        strategy: 'simple'
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/api/categories',
    config: {
      handler: CategoryCtrl.create,
      auth: 'simple'
    }
  });

  server.route({
    method: 'PUT',
    path: '/api/categories/{id}/{type}',
    config: {
      handler: CategoryCtrl.update,
      auth: 'simple'
    }
  });

  server.route({
    method: 'DELETE',
    path: '/api/categories/{id}',
    config: {
      handler: CategoryCtrl.remove,
      auth: 'simple'
    }
  });
}