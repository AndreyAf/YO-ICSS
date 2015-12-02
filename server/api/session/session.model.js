'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

// session schema
var SessionSchema = new Schema({
  title: String,
  created: {
    type: Date,
    default: Date.now
  }
});

// create a model from the session schema
module.exports = mongoose.model('Session', SessionSchema);
