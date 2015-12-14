'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  _session:   String,
  _sender:    { type: Schema.Types.ObjectId, ref: 'User' },
  content:    { type: String, default: "" },
  isReceived:	{ type: Boolean, default: false },
  isRead:	    { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
