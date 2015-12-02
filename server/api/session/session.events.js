/**
 * Session model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Session = require('./session.model');
var SessionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SessionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Session.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SessionEvents.emit(event + ':' + doc._id, doc);
    SessionEvents.emit(event, doc);
  }
}

module.exports = SessionEvents;
