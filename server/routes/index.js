module.exports = function( server ) {
  require('../models/user');
  require('../models/article');
  require('../models/media');
  require('../models/topic');
  require('../models/category');
  require('../models/question');
  require('../models/module');
  require('../models/course');


  require('./session/sessionApi')(server);
  require('./articles/articles-api')(server);
  require('./github/github-api')(server);
  require('./media/media-api')(server);
  require('./topics/topics-api')(server);
  require('./categories/categories-api')(server);
  require('./courses/courses-api')(server);
  require('./modules/modules-api')(server);
};