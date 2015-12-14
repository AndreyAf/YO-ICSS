/**
 * GroupSession model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var GroupSession = require('./groupSession.model');
var GroupSessionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GroupSessionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  GroupSession.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GroupSessionEvents.emit(event + ':' + doc._id, doc);
    GroupSessionEvents.emit(event, doc);
  }
}

module.exports = GroupSessionEvents;
