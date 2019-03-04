/**
 * Socket.io configuration
 */
'use strict';

// import config from './environment';

// When the user disconnects.. perform this

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = `${socket.request.connection.remoteAddress}:${socket.request.connection.remotePort}`;

    socket.connectedAt = new Date();

    socket.log = function (...data) {
      console.log(`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data);
    };

    // Call onDisconnect.
    socket.on('disconnect', () => {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function onDisconnect() /*socket*/{}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', data => {
    socket.log((0, _stringify2.default)(data, null, 2));
  });
  console.log('`SocketIO ${socket.nsp.name} [${socket.address}]`, ...data');

  // // Insert sockets below
  require('../api/chat/chat.socket').ChatSocket(socket);
  //   require('../api/organisation/organisation.socket').organisationSocket(socket);
  //   require('../api/department/department.socket').departmentSocket(socket);
  //   require('../api/pimonkAgent/pimonkAgent.socket').piaiAgentSocket(socket);
  //   require('../api/task/task.socket').TaskSocket(socket);
  //   require('../api/invoice/invoice.socket').InvoiceSocket(socket);
}
//# sourceMappingURL=socketio.js.map
