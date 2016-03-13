'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
  Schema = mongoose.Schema;

var Location = new Schema({
  country: {type: String, required: true},
  city: {type: String, required: true},
  address: {type: String, required: true}
});

var Department = new Schema({
  name: {type: String, required: true},
  description: String,
  email: {
    type: String,
    required: true
  },
  employees: [{type: Schema.Types.ObjectId, ref: 'User'}],
  location: Location,
  phone: String,
  fax: String
});

var CompanySchema = new Schema({
  name: {type: String, required: true},
  slogan: {type: String, default: ""},
  description: {type: String, required: true, default: ""},
  departments: [Department],
  logo_url: {type: String},
  clients: [{type: Schema.Types.ObjectId, ref: 'User'}],
  created_at: {type: Date, default: Date.now},
  updated_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Company', CompanySchema);
