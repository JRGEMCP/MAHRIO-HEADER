var async = require('async');
var GitHubApi = require('github');
var github = new GitHubApi();
var SectionCtrl = require('./section-functions');
var Boom = require('boom');

module.exports = function( req, rep) {
  github.authenticate({
    type: "oauth",
    token: req.auth.credentials.github.token
  });

  async.mapSeries( req.payload.sections, function(item, cb){
    //item.content = '';
    github.repos.getContent({
      owner: "MAHRIO",
      repo: req.params.id,
      path: item.id + '.md',
    }).then(function (result) {
      github.repos.updateFile({
        owner: "MAHRIO",
        repo: req.params.id,
        path: item.id + '.md',
        message: "my commit message",
        committer: {
          name: "mahrio-a",
          email: "jesus.rocha@whichdegree.co"
        },
        content: Buffer.from('# '+item.heading).toString('base64'), //"bXkgbmV3IGZpbGUgY29udGVudHM=",
        sha: result.data.sha
      }).then(function (res) {
        SectionCtrl.updateUrl(item.id, function (err) {
          if (err) { return cb(Boom.badRequest()); }

          cb();
        });
      });
    }).catch(function (err) {
      github.repos.createFile({
        owner: "MAHRIO",
        repo: req.params.id,
        path: item.id + '.md',
        message: "my commit message",
        committer: {
          name: "mahrio-a",
          email: "jesus.rocha@whichdegree.co"
        },
        content: Buffer.from('# '+item.heading).toString('base64'), //"bXkgbmV3IGZpbGUgY29udGVudHM="
      }).then(function (res) {
        SectionCtrl.updateUrl(item.id, function (err) {
          if (err) { return cb(Boom.badRequest()); }

          cb();
        });
      }).catch(function (err) {
        cb(err)
      });
    });
  }, function(err){
    if( err ){ return rep(Boom.badRequest(err));  }

    rep();
  })
}