var GitHubApi = require('github');
var github = new GitHubApi();
var Boom = require('boom');

module.exports = function(req, rep){

  github.gitdata.getReference({
    owner: "MAHRIO",
    repo: req.params.id,
    ref: 'heads/master'
  }, function(err, git){
    if( err ) { return rep(Boom.badRequest(err)) ; }

    return rep( git );
  });
}