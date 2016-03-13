'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true, default: ""},
  logo_url: {type: String},
  _session: {type: Schema.Types.ObjectId, ref: 'Session'},
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Group', GroupSchema);
