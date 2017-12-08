var async = require('async');
var GitHubApi = require('github');
var github = new GitHubApi();
var ArticleCtrl = require('./articles-functions');
var Boom = require('boom');

module.exports = function( req, rep) {

  req.payload.content = '#!/usr/bin/env node\n\n';

  github.authenticate({
    type: "oauth",
    token: req.auth.credentials.github.token
  });

  github.repos.createFile({
    owner: "MAHRIO",
    repo: req.params.id,
    path: 'Code.js',
    message: "Initial Commit",
    committer: {
      name: req.auth.credentials.github.username,
      email: req.auth.credentials.email
    },
    content: Buffer.from( req.payload.content ).toString('base64'),
  }).then(function (res) {

    // add to database and return true
    ArticleCtrl.updateCodeRepo(req, rep);
  }, function(){
    ArticleCtrl.updateCodeRepo(req, rep);
  }).catch(function (err) {
    // pass message along
    ArticleCtrl.updateCodeRepo(req, rep);
    //rep( new Boom.badRequest(err) );
  });
}