'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatSocket = ChatSocket;

var _chat = require('./chat.events');

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Model events to emit
const events = ['save', 'remove']; /* eslint-disable import/prefer-default-export */

function createListener(event, socket) {
  return function (doc) {
    console.log('even', event);
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function () {
    _chat2.default.removeListener(event, listener);
  };
}
function ChatSocket(socket) {
  console.log('hehe');
  // Bind model events to socket events
  for (let i = 0, eventsLength = events.length; i < eventsLength; i++) {
    const event = events[i];
    const listener = createListener(`Chat:${event}`, socket);

    _chat2.default.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}
//# sourceMappingURL=chat.socket.js.map
