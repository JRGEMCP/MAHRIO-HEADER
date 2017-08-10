'use strict';

var User = require('mongoose').model('User'),
  Boom = require('boom'),
  SessionCtrl = require('./sessionCtrl');

module.exports = function ( server ) {

  server.auth.strategy('simple', 'bearer-access-token', {
    allowQueryToken: true,              // optional, true by default
    allowMultipleHeaders: false,        // optional, false by default
    accessTokenName: 'access_token',    // optional, 'access_token' by default
    validateFunc: function( token, callback ) {
      User.findOne({ authorizationToken: token}, function (err, user) {
        if (err || !user || typeof user === 'undefined') {
          return callback(null, false, { token: token });
        }
        callback(null, true, { token: token, access: user.access, id: user.id, networks: user.networks });
      });
    }
  });

  server.route({
    method: 'POST',
    path: '/api/session/{action?}',
    config: {
      handler: function( request, reply ){
        switch( request.params.action ){
          case 'register':
            return SessionCtrl.register(request, reply);
          case 'resend-confirm-email':
            return SessionCtrl.resendConfirmEmail( request, reply);
          case 'confirm-email':
            return SessionCtrl.confirmEmail( request, reply);
          case 'login':
            return SessionCtrl.login( request, reply );
          case 'recover-password':
            return SessionCtrl.recoverPassword( request, reply );
          case 'is-valid-token':
            return SessionCtrl.isValidToken( request, reply );
          case 'change-password':
            return SessionCtrl.changePassword( request, reply );
          case 'logout':
            return SessionCtrl.logout( request, reply );
          case 'log-off-all-devices':
            return SessionCtrl.logout( request, reply, true );
          default:
            return reply( Boom.badRequest() );
        }
      },
      auth: {
        mode: 'try',
        strategy: 'simple'
      }
    }
  });
};
