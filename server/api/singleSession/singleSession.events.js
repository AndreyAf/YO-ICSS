/**
 * SingleSession model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var SingleSession = require('./singleSession.model');
var SingleSessionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SingleSessionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SingleSession.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SingleSessionEvents.emit(event + ':' + doc._id, doc);
    SingleSessionEvents.emit(event, doc);
  }
}

module.exports = SingleSessionEvents;
