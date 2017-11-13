'use strict';


var mediaCtrl = require('./media-functions');

module.exports = function( server ){
  var aws = require('../../config/aws')(server.mahr);
  mediaCtrl.setAWS( aws );
  [{
    method: 'GET',
    path: '/images/{id?}',
    config: {
      handler: mediaCtrl.get
    }
  }, {
    method: ['GET','POST','PUT','DELETE'],
    path: '/api/images/{id?}',
    config: {
      handler: mediaCtrl.allInOne
    }
  }].forEach(function (route) { server.route(route); });
}