var async = require('async');
var GitHubApi = require('github');
var github = new GitHubApi();
var ArticleCtrl = require('./articles-functions');
var Boom = require('boom');

function auth( token ){
  github.authenticate({
    type: "oauth",
    token: token
  });
}

module.exports = function(req, rep){
  ArticleCtrl.getOne( req, rep, function(article){
    if( !article ){ return rep( Boom.badRequest('not-found')); }

    auth( req.auth.credentials.github.token);

    github.repos.createForOrg({
      "org": "MAHRIO",
      "name": article.id,
      "description": article.deck,
      "has_projects": false,
      "has_wiki": false
    }, function(err, git){ console.log(err);
      if( err ) { return rep(Boom.badRequest('repo-exists')) ; }

      article.repo = git.data.html_url;
      article.state = 'DEFINING';
      return ArticleCtrl.updateArticleRepo(req, rep, article);
    });
  })
}