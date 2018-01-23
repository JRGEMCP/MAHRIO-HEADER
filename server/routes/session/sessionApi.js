'use strict';

try {
  var Mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , Mongoose = prequire('mongoose');
}

var User = Mongoose.model('User'),
  Boom = require('boom'),
  SessionCtrl = require('./sessionCtrl');

module.exports = function ( server ) {

  setTimeout( () => {
    require('./oauth')( server );
  }, 100);

  server.auth.strategy('simple', 'bearer-access-token', {
    allowQueryToken: true,              // optional, true by default
    allowMultipleHeaders: false,        // optional, false by default
    accessTokenName: 'access_token',    // optional, 'access_token' by default
    validateFunc: function( token, callback ) {
      User.findOne({ authorizationToken: token}, function (err, user) {
        if (err || !user || typeof user === 'undefined') {
          return callback(null, false, { token: token });
        }
        callback(null, true, {
          token: token,
          email: user.email,
          access: user.access,
          id: user.id,
          networks: user.networks,
          confirmed: user.confirmed,
          github: user.github});
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/api/session/user',
    config: {
      handler: function(request, reply){
        request.auth.credentials.hasGit = request.auth.credentials.github && request.auth.credentials.github.token;

        reply(request.auth.credentials);
      },
      auth: 'simple'
    }
  });

  server.route({
    method: 'POST',
    path: '/api/session/{action?}',
    config: {
      handler: function( request, reply ){
        switch( request.params.action ){
          case 'register':
            return SessionCtrl.register(request, reply, server);
          case 'resend-confirm-email':
            return SessionCtrl.resendConfirmEmail( request, reply, server);
          case 'confirm-account':
            return SessionCtrl.confirmAccount( request, reply);
          case 'login':
            return SessionCtrl.login( request, reply );
          case 'recover-password':
            return SessionCtrl.recoverPassword( request, reply, server );
          case 'is-valid-token':
            return SessionCtrl.isValidToken( request, reply );
          case 'change-password':
            return SessionCtrl.changePassword( request, reply );
          case 'update-password':
            return SessionCtrl.updatePassword( request, reply);
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
