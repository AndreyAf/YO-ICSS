/**
 * CompanySession model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var CompanySession = require('./companySession.model');
var CompanySessionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CompanySessionEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  CompanySession.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CompanySessionEvents.emit(event + ':' + doc._id, doc);
    CompanySessionEvents.emit(event, doc);
  }
}

module.exports = CompanySessionEvents;
