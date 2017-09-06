module.exports = function( server ) {
  require('../models/user');
  require('../models/article');
  require('./session/sessionApi')(server);
  require('./articles/articles-api')(server);
};

