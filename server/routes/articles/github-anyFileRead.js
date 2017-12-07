var GitHubApi = require('github');
var github = new GitHubApi();
var Boom = require('boom');

function auth( token ){
  github.authenticate({
    type: "oauth",
    token: token
  });
}

module.exports = function(req, rep){

  auth( req.auth.credentials.github.token);

  github.repos.getContent({
    owner: "MAHRIO",
    repo: req.params.id,
    path: 'Code.js',
    ref: 'master'
  }, function(err, result){
    if( err ) { return rep(Boom.badRequest(err)) ; }

    var buff = new Buffer( result.data.content, 'base64');
    rep({sha: result.data.sha, content: buff.toString()});
  });
}