
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatSocket = ChatSocket;

var _chat = require('./chat.events');

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Model events to emit
var events = ['save', 'remove'];

function ChatSocket(socket) {
  // Bind model events to socket events
  for (var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener(`Chat:${event}`, socket);

    _chat2.default.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }
}

function createListener(event, socket) {
  return function (doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function () {
    _chat2.default.removeListener(event, listener);
  };
}
//# sourceMappingURL=chat.socket.js.map
