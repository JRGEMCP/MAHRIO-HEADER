'use strict';

var ArticleCtrl = require('./articles-functions');
var SectionCtrl = require('./section-functions');
var FavoriteCtrl = require('./favorite-functions');

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
      method: 'GET',
      path: '/api/articles/favorites',
      config: {
        handler: FavoriteCtrl.get,
        auth: {
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
      method: 'POST',
      path: '/api/articles/{id}/sections',
      config: {
        handler: SectionCtrl.create,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: '/api/articles/{id}/favorite',
      config: {
        handler: FavoriteCtrl.update,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: '/api/articles/{id}',
      config: {
        handler: ArticleCtrl.update,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: '/api/articles/{id}/sections/{sid?}',
      config: {
        handler: SectionCtrl.update,
        auth: 'simple'
      }
    },
    {
      method: 'DELETE',
      path: '/api/articles/{id}/favorite',
      config: {
        handler: FavoriteCtrl.delete,
        auth: 'simple'
      }
    },
    {
      method: 'DELETE',
      path: '/api/articles/{id}',
      config: {
        handler: ArticleCtrl.remove,
        auth: 'simple'
      }
    }
  ].forEach(function (route) { server.route(route); });
};