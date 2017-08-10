module.exports = function( server ) {
  require('../models/user');
  require('./sessionApi')(server);
};

