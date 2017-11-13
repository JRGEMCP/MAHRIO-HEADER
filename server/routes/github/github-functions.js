'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var Boom = require('boom'),
  User = mongoose.model('User'),
  GithubAPI = require('github'),
  github = new GithubAPI();;

function auth( token ){
  github.authenticate({
    type: "oauth",
    token: token
  });
}
const ADMIN = process.env.GIT_ADMIN;
const ORG = process.env.GIT_ORG;

module.exports = {
  getMahrioOrg: function(req, rep){
    auth(req.auth.credentials.github.token);

    github.orgs.checkMembership({
      org: ORG,
      username: req.auth.credentials.github.username
    }).then( function(response) {
      if( !req.auth.credentials.github.joined ) {
        req.auth.credentials.github.joined = true;
        User.update({_id: req.auth.credentials.id}, {github: req.auth.credentials.github}, function(){});
      }

      rep({orgs: response});
    }, function(err){
      rep( Boom.badRequest(err));
    })
  },
  addOrgMember: function(req, rep, user){
    if( typeof ADMIN == 'undefined' || typeof ORG == 'undefined'){ return rep( Boom.badRequest() ); }

    if( ADMIN === req.auth.credentials.email) {
      user.github.added = true;
      user.github.joined = true;
      user.save().then( () => {});
      return rep({admin: true});
    }

    User.findOne({email: ADMIN}).exec( function(err, admin){
      if( err || !user ) { return rep(Boom.badRequest()); }

      auth(admin.github.token);

      github.orgs.addOrgMembership({
        org: ORG,
        username: req.payload.git.username,
        role: 'member'
      }).then( function(response) {
        user.github.invited = true;
        user.save().then( () => {});
        rep({orgs: response});
      }, function(err){
        rep( Boom.badRequest(err));
      })
    })
  }
}