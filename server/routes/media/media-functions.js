'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var aws,
  Media = mongoose.model('Media'),
  Boom = require('boom');

module.exports = {
  setAWS: function( sdk ) { aws = sdk; },
  get: function(req, rep){
    if( req.params.id ) {
      Media.findOne({
        _id: req.params.id
      }).exec( function( err, image ) {
        rep({image: image});
      });
    } else {
      Media.find().exec( function(err, images) {
        if( err ) { return rep( Boom.badRequest(err) ); }

        rep({images: images});
      });
    }
  },
  allInOne: function(req, rep){
    if( req.params.id ) {
      if( req.params.id === 'key' && req.method === 'get') {
        var s3Params = {
          Bucket: 'mahrio-medium',
          Key: req.query.filename,
          Expires: 60,
          ACL: 'public-read'
        };
        aws.getSignedUrl('putObject', s3Params, function(err, data){
          if( err ){ return rep( Boom.badRequest(err) ); }

          return rep( { signedRequest: data });
        });
      } else if( req.method === 'put' ) {
        delete req.payload.image._id;
        Media.update({_id: req.params.id}, req.payload.image, { upsert: false })
          .exec( function(err, image){
            if( err ) {
              if( 11000 === err.code || 11001 === err.code ) {
                return rep( Boom.badRequest("Duplicate key error index") );
              } else {
                return rep( Boom.badRequest(err) );
              }
            }
            if( image && image.ok && image.nModified ) {
              rep({updated: true});
            } else {
              rep({updated: false});
            }
          });
      } else if (req.method === 'delete') {
        Media.remove({_id: req.params.id}).exec( function(err, image) {
          if( err ) { return rep( Boom.badRequest(err) ); }

          if( image && image.result && image.result.ok ) {
            rep({deleted: true});
          } else {
            rep({deleted: false});
          }
        });
      } else {
        rep( Boom.badRequest('method not supported') );
      }
    } else {
      if( req.method === 'post' ) {
        req.payload.image.url = 'https://mahrio-medium.s3.amazonaws.com/';
        Media.create( req.payload.image, function ( err ) {
          if( err ) {
            if( 11000 === err.code || 11001 === err.code ) {
              return rep( Boom.badRequest("Duplicate key error index") );
            } else {
              return rep( Boom.badRequest(err) );
            }
          }
          rep({created: true});
        });
      } else {
        rep( Boom.badRequest('method not supported') );
      }
    }
  }
}
