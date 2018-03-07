'use strict';

var ModuleCtrl = require('./modules-functions');

module.exports = function( server ) {
  server.route({
    method: 'POST',
    path: '/api/modules',
    config: {
      handler: ModuleCtrl.create,
      auth: 'simple'
    }
  });

  server.route({
    method: 'PUT',
    path: '/api/modules/{id}/{type}',
    config: {
      handler: ModuleCtrl.update,
      auth: 'simple'
    }
  });

  server.route({
    method: 'DELETE',
    path: '/api/modules/{id}',
    config: {
      handler: ModuleCtrl.remove,
      auth: 'simple'
    }
  });
}