'use strict';

var aws = require('aws-sdk');

module.exports = function( config ) {
  return new aws.S3({
    signatureVersion: 'v4',
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretKey,
    region: 'us-west-1'
  });
};