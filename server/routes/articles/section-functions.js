'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var Boom = require('boom'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  Section = mongoose.model('Section');

module.exports = {
  create: function(req, rep){
    Section.create( req.payload.section, function(err, section){
      if( err ) { return rep( Boom.badRequest(err) ); }

      Article.update({_id: req.params.id}, {sections: {$push: section._id}}, {multi: false}, function(err, article){
        return rep({section: section});
      });
    });
  },
  update: function(req, rep){
    if( !req.payload.section) {
      return rep(Boom.badRequest());
    }

    Section.update({_id: req.params.sid}, req.payload.section, {multi: false}, function(err, section){
      if( err ) { return rep( Boom.badRequest(err) ); }

      return rep({section: section});
    });


  },
};