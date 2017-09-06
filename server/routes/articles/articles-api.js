'use strict';

var ArticleCtrl = require('./articles-functions');

module.exports = function( server ) {
  [
    {
      method: 'GET',
      path: '/api/articles/{link?}',
      config: {
        handler: ArticleCtrl.get,
        auth: {
          mode: 'try',
          strategy: 'simple'
        }
      }
    },
    {
      method: 'POST',
      path: '/api/articles',
      config: {
        handler: ArticleCtrl.create,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: '/api/articles/{id?}',
      config: {
        handler: ArticleCtrl.update,
        auth: 'simple'
      }
    },
    {
      method: 'DELETE',
      path: '/api/articles/{id?}',
      config: {
        handler: ArticleCtrl.remove,
        auth: 'simple'
      }
    }
  ].forEach(function (route) { server.route(route); });
};