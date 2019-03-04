/**
 * Chat model events
 */

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var EventEmitter = require('events');

// import {} from '';
var ChatEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChatEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Chat) {

  for (var e in events) {
    let event = events[e];
    Chat.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function (doc) {
    ChatEvents.emit(`${event}:${doc._id}`, doc);
    ChatEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = ChatEvents;
//# sourceMappingURL=chat.events.js.map
