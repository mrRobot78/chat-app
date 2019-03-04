'use strict';

var _setImmediate2 = require('babel-runtime/core-js/set-immediate');

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _mongo = require('./config/mongo');

var _mongo2 = _interopRequireDefault(_mongo);

var _environment = require('./config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _express3 = require('./config/express');

var _express4 = _interopRequireDefault(_express3);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Main application file
 */

const log = console;
// Setup server

(0, _mongo2.default)().then(res => {
  console.log(res);
  // startServer();
}).catch(err => {
  console.log(err);
  log.error('Server failed to start due to error: %s', err);
});
const app = (0, _express2.default)();
const server = _http2.default.createServer(app);

// expressConfig(app);
// registerRoutes(app);

app.use('/node_modules', _express2.default.static(__dirname + '/node_modules'));

// var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: _environment2.default.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  server.listen(_environment2.default.PORT, _environment2.default.IP, () => {
    log.log('Express server listening on %d, in %s mode', _environment2.default.PORT, app.get('env'));
  });
}

(0, _setImmediate3.default)(startServer);

// Expose app
module.exports = app;
exports = module.exports;
//# sourceMappingURL=app.js.map
