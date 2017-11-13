'use strict';

var GithubCtrl = require('./github-functions');

module.exports = function( server ) {
  [
    {
      method: 'GET',
      path: '/api/github/orgs',
      config: {
        handler: GithubCtrl.getMahrioOrg,
        auth: 'simple'
      }
    },
    {
      method: 'PUT',
      path: '/api/github/mahrio',
      config: {
        handler: GithubCtrl.addOrgMember,
        auth: 'simple'
      }
    }
  ].forEach(function (route) { server.route(route); });
};