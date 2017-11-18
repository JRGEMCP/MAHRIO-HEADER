var SessionCtrl = require('./sessionCtrl');

module.exports = function( server ) {
  server.route({
    method: 'GET',
    path: '/api/oauth/github',
    config: {
      auth: 'github',
      handler: function(req, rep){
        console.log( req.auth.credentials );
        rep.redirect('/dashboard/github/'+req.auth.credentials.profile.username+'/'+req.auth.credentials.token);
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/api/oauth/github',
    config: {
      auth: 'simple',
      handler: SessionCtrl.updateGithub
    }
  })
};