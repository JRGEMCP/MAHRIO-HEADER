var GitHubApi = require('github');
var github = new GitHubApi();
var ArticleCtrl = require('./articles-functions');
var Boom = require('boom');

module.exports = function( req, rep) {

  github.authenticate({
    type: "oauth",
    token: req.auth.credentials.github.token
  });

  github.repos.updateFile({
    owner: "MAHRIO",
    repo: req.params.id,
    path: 'Code.js',
    message: req.payload.message,
    committer: {
      name: req.auth.credentials.github.username,
      email: req.auth.credentials.email
    },
    content: Buffer.from(req.payload.content).toString('base64'), //"bXkgbmV3IGZpbGUgY29udGVudHM=",
    sha: req.payload.sha
  }).then(function (res) {

    return ArticleCtrl.updateCodeRepo(req, rep);
  }).catch( function(err){
    return rep( Boom.badRequest(err) );
  })
}