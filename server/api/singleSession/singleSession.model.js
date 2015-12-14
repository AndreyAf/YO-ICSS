'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

/***
 * Position schema for participant
 */
var PositionSchema = new Schema({
  latitude:   { type: Number, max: 90, min: -90, default: 0 },
  longitude:  { type: Number, max: 180, min: -180, default: 0 },
  created_at: { type: Date, default: Date.now }
});

/***
 * Participant schema for session
 */
var ParticipantSchema = new Schema({
  _participant: { type: Schema.Types.ObjectId, ref: 'User' },
  positions:    [ PositionSchema ],
  bgImg:        { type: String, default: 'assets/images/bgs/default.png' }
});

/***
 * Single session schema
 */
var SingleSessionSchema = new Schema({
  participantOne:  ParticipantSchema,
  participantTwo:  ParticipantSchema,
  created_at:       {type: Date, default: Date.now}
});

module.exports = mongoose.model('SingleSession', SingleSessionSchema);
