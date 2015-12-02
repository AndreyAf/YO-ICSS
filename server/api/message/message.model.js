'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;
// todo: rewrite
var MessageSchema = new Schema({
  _session: String,
  _sender : Schema.Types.ObjectId,
  content: String,
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
