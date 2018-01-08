'use strict';

var CategoryCtrl = require('./category-functions');

module.exports = function( server ) {
  server.route({
    method: 'GET',
    path: '/api/categories',
    config: {
      handler: CategoryCtrl.get
    }
  });

  server.route({
    method: 'POST',
    path: '/api/categories',
    config: {
      handler: CategoryCtrl.create
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
      handler: CategoryCtrl.remove
    }
  });
}