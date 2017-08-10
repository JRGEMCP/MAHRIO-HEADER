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
  crypto = require('crypto');

Mongoose.Promise = require('bluebird');

module.exports = {
  login: function (request, reply) {
    if (request.auth.isAuthenticated) { return reply(Boom.badRequest()); }

    User.login(request.payload.email.toLowerCase(), request.payload.password, function (err, user) {
      if (err) { return reply(Boom.unauthorized(err)); }

      reply({access: user.access})
        .header('Authorization', 'Bearer ' + user.token)
        .header('Access-Control-Expose-Headers', 'authorization');
    });
  },
  recoverPassword: function (request, reply){
    User.recoverPassword( request.payload.email.toLowerCase(), function(token){
      if( token ){
        console.log( token );
      }
      reply({reset: true});
    });
  },
  isValidToken: function (request, reply){
    User.isValidToken(request.payload.token, function(err){
      if( err ) { return reply( Boom.badRequest()); }

      reply({validToken: true});
    });
  },
  changePassword: function(request, reply){
    if( !request.payload.password ) { return reply(Boom.badRequest()); }

    User.isValidToken( request.payload.token, function(err, user){
      if( err ) { return reply( Boom.badRequest()); }

      User.changePassword( user, request.payload.password, function(err, user){
        if( err ) { return reply( Boom.badRequest()); }

        reply({access: user.access})
          .header('Authorization', 'Bearer ' + user.token)
          .header('Access-Control-Expose-Headers', 'authorization');
      })
    });
  },
  register: function (request, reply) {
    if (request.auth.isAuthenticated) { return reply(Boom.badRequest('You Logged In')); }

    if( !request.payload.user ){
      return reply( Boom.badRequest() );
    }
    request.payload.user.access = ['authorized'];
    User.create( request.payload.user).then(function(user){
        reply({access: user.access })
          .header('Authorization', 'Bearer ' + user.authorizationToken)
          .header('Access-Control-Expose-Headers', 'authorization');
      }).catch(function(err){
      reply( Boom.badRequest() ); // user already in system?
    });
  },
  resendConfirmEmail: function ( request, reply){
    if (!request.auth.isAuthenticated) { return reply(Boom.badRequest()); }

    User.resetConfirmed(request.auth.credentials.token, function(err, token){
      if( err ){ return reply(Boom.badRequest()); }

      console.log( token );
      reply({resendConfirmationToken: true});
    })
  },
  confirmEmail: function ( request, reply){
    User.confirmEmail(request.payload.token, function(err){
      if( err ) { return reply(Boom.badRequest()); }

      reply({confirmed: true});
    })
  },
  logout: function ( request, reply, allDevices){
    if (request.auth.isAuthenticated) {
      var action = {$pull: {authorizationToken: request.auth.credentials.token}};
      if( allDevices ) {
        action = {$set: {authorizationToken: []}};
      }
      User.update( {authorizationToken: request.auth.credentials.token}, action, {multi: false}, function(err){
        if( err ) { return reply( Boom.badRequest() ); }

        reply({logout:true});
      });
    }else{
      reply({logout: true});
    }
  }
};