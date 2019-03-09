'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable guard-for-in,no-underscore-dangle,no-use-before-define,no-restricted-syntax */
/**
 * Chat model events
 */

const EventEmitter = require('events');

// import {} from '';
const ChatEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ChatEvents.setMaxListeners(0);

// Model events
const events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Chat) {
  for (const e in events) {
    const event = events[e];
    Chat.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  console.log('emitEvent', event);
  return function (doc) {
    ChatEvents.emit(`${event}:${doc._id}`, doc);
    ChatEvents.emit(event, doc);
  };
}

exports.registerEvents = registerEvents;
exports.default = ChatEvents;
//# sourceMappingURL=chat.events.js.map
