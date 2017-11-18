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


module.exports = function(req, rep){

  User.findOne({email: 'rocha.jesus@hotmail.com'}).exec( function(err, user){

    github.authenticate({
      type: 'oauth',
      token: user.githubToken
    })

    github.repos.addCollaborator({
      owner: user.githubUsername,
      repo: 'MAHRIO',
      username: req.auth.credentials.github.username
    }, function(err, user){
      if(err){ return rep( Boom.badRequest()); }

      rep({});
    })
  })
}