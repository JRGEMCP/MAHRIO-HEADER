module.exports = function( server ) {
  require('../models/user');
  require('../models/article');
  require('../models/media');
  require('./session/sessionApi')(server);
  require('./articles/articles-api')(server);
  require('./github/github-api')(server);
  require('./media/media-api')(server);
};

