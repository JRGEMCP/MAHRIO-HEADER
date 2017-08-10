'use strict';

try {
  var mongoose = require('mongoose');
} catch (_) {
  // workaround when `npm link`'ed for development
  var prequire = require('parent-require')
    , mongoose = prequire('mongoose');
}

var crypto = require('crypto')
  , _ = require('lodash')
  , schema = mongoose.Schema({
  email: { type: String, trim: true, lowercase: true, required: true, index: true, unique: true},
  confirmed:            {type: Boolean, default: false},
  confirmedToken:       {type: String},
  salt:                 {type: String },
  password:             {type: String, minlength: 8 },
  resetPasswordToken:   {type: String},
  resetPasswordExpires: {type: Date, default: Date.now },
  authorizationToken:   [{type: String}],

  created:        { type: Date, default: Date.now },
  access:         [{type: String}],
  status:         {type: String},
  notifications:  [{type: mongoose.Schema.Types.ObjectId, ref: 'Notification'}],
  profile:        {type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  disabled:       {type: Boolean},
  stripeId:       {type: String, default: null},
  deviceToken:    {type: String, default: null}
});

function createSalt () { return crypto.randomBytes(128).toString('base64'); }
function hashPwd (salt, pwd) {
  var hmac = crypto.createHmac('md5', salt);
  return hmac.update(pwd).digest('hex');
}
schema.methods.authenticate = function(passwordToMatch) {
  if( hashPwd(this.salt, passwordToMatch) === this.password ){
    var token = crypto.randomBytes(20).toString('hex');
    if( this.authorizationToken.length ) {
      this.authorizationToken.push( token );
    } else {
      this.authorizationToken = [ token ];
    }
    return token;
  }
  return false;
};
schema.statics.changePassword = function( user, password, cb ){
  if( !user ){ return cb(true); }

  var authorizationToken = crypto.randomBytes(20).toString('hex'),
    access = user.access;

  user.salt = createSalt();
  user.password = hashPwd(user.salt, password);
  user.authorizationToken = authorizationToken;
  user.resetPasswordExpires = Date.now();

  user.save( function(err){
    if( err ){
      return cb(true);
    }
    cb(null, {token: authorizationToken, access: access});
  });
};
schema.statics.confirmEmail = function(token, cb){
  if( !token ) { return cb(true); }

  this.findOne({confirmedToken: token}, function(err, user){
    if (err || !user) { return cb(true); }

    if( user.confirmed ) {
      return cb(true);
    }
    user.confirmed = true;
    user.save( function(err, user){
      if( err ) { return cb(true); }
      cb(false);
    });
  })
};
schema.statics.resetConfirmed = function( token, cb ){
  if( !token ) { return cb(true); }

  this.findOne({ authorizationToken: token}, function (err, user) {
    if (err || !user) { return cb(true); } //user does not exist

    if( user.confirmed ) {
      return cb(true);
    }
    var confirmToken = crypto.randomBytes(20).toString('hex');
    user.confirmedToken = confirmToken;

    user.save(function(err){
      if (err) { return cb(true); }
      return cb(false, confirmToken);
    })
  });
};
schema.statics.recoverPassword = function( email, cb ){
  if( !email ) { return cb(); }

  this.findOne({email: email}).exec().then(function (user) {
    if (!user) { return cb(); } //user does not exist

    var token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    var expires = new Date();
    expires.setMinutes( expires.getMinutes() + 30);
    user.resetPasswordExpires = expires;

    user.save().then(function(){
      cb(token);
    }).catch(function(){
      cb();
    });
  });
};
schema.statics.isValidToken = function(passwordToken, cb){
  if( !passwordToken ){ return cb(true); }

  var cutoff = new Date();
  cutoff.setMinutes( cutoff.getMinutes() + 3);
  this.findOne({resetPasswordToken: passwordToken, resetPasswordExpires: {$gt: cutoff}}, function(err, user){
    if( err || !user ) { return cb( true ); }
    cb(false, user);
  });
};
schema.statics.login = function(email, passwordToMatch, cb) {
  if (!email  || ! passwordToMatch) { return cb('missing email or password'); }

  this.findOne({email: email}).exec().then(function(user) {

    if (!user) { return cb(true); } //user does not exist

    var token = user.authenticate(passwordToMatch);
    if (!token ) {
      return cb(true); //wrong password
    }

    user.save().then( function(){
      cb(null, {access: user.access, token: token});
    });
    return null;
  }).catch(function(err){
    cb(true);
  });
};

schema.pre('save', function (next) {
  if (this.isNew) {
    this.salt = createSalt();
    this.password = hashPwd(this.salt, this.password || '');
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.confirmedToken = crypto.randomBytes(20).toString('hex');
    this.authorizationToken = crypto.randomBytes(20).toString('hex');
  }
  next();
});

module.exports = mongoose.model('User', schema);
