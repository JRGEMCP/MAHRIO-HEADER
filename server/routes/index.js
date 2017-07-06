module.exports = function( server, publicPath ) {
  server.route({
    path: '/assets/header/{any*}',
    method: 'GET',
    handler: {
      directory: {
        path: publicPath
      }
    }
  });
};

