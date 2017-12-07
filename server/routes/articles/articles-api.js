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
      method: 'GET',
      path: '/api/articles/{id}/code',
      config: {
        handler: require('./github-anyFileRead'),
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 1 ***** DISCOVERING
      method: 'POST',
      path: '/api/articles',
      config: {
        handler: ArticleCtrl.create,
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 1 - UPDATE DISCOVERY
      method: 'PUT',
      path: '/api/articles/{id}',
      config: {
        handler: ArticleCtrl.update,
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 1 - UPDATE TAGS
      method: 'PUT',
      path: '/api/articles/{id}/tags',
      config: {
        handler: ArticleCtrl.tags,
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 4 - CREATE CODE FILE ***** DEVELOPING
      method: 'POST',
      path: '/api/articles/{id}/code',
      config: {
        handler: require('./github-createCodeFile'),
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 2 - CREATE SECTION
      method: 'POST',
      path: '/api/articles/{id}/sections',
      config: {
        handler: SectionCtrl.create,
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 5 - PUBLISH ***** DEPLOYED
      method: 'PUT',
      path: '/api/articles/{id}/publish',
      config: {
        handler: ArticleCtrl.publish,
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 4 - UPDATE CODE FILE
      method: 'PUT',
      path: '/api/articles/{id}/code',
      config: {
        handler: require('./github-updateCodeFile'),
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 3 - CREATE REPO FILES ***** DESIGNING
      method: 'PUT',
      path: '/api/articles/{id}/sections/repo',
      config: {
        handler: require('./github-createFilesSync'),
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 2 - CREATE REPO ***** DEFINING
      method: 'PUT',
      path: '/api/articles/{id}/repo',
      config: {
        handler: require('./github-createRepo'),
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: '/api/articles/{id}/collaboration',
      config: {
        handler: require('./github-addCollaborator'),
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
    { // TUTORIAL LIFECYCLE STEP 3 - UPDATE SECTIONS' DESIGN
      method: 'PUT',
      path: '/api/articles/{id}/sections',
      config: {
        handler: SectionCtrl.updateMany,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: '/api/articles/{id}/sections/{sid}',
      config: {
        handler: SectionCtrl.update,
        auth: 'simple'
      }
    },
    { // TUTORIAL LIFECYCLE STEP 2 - DELETE SECTION
      method: 'DELETE',
      path: '/api/articles/{id}/section/{secId}',
      config: {
        handler: SectionCtrl.remove,
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