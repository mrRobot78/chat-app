'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (app) {
  const env = process.env.NODE_ENV;

  if (env === 'development' || env === 'test') {
    app.use(_express2.default.static(_path2.default.join(_environment2.default.root, '.tmp')));
    app.use((0, _cors2.default)());
  }

  if (env === 'production') {
    // app.use(favicon(path.join(config.root, 'client', 'favicon.ico')));
    app.use((0, _cors2.default)());
  }

  // app.set('views', `${config.root}/server/views`);
  // app.engine('html', require('ejs').renderFile);
  // app.set('view engine', 'html');
  app.use((0, _compression2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: false }));
  app.use(_bodyParser2.default.json({ limit: '20mb' }));
  app.use((0, _methodOverride2.default)());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Expose-Headers', 'Authorization');
    next();
  });
  app.use((0, _cookieParser2.default)());
  app.use(_passport2.default.initialize());
  app.use((error, req, res, next) => {
    res.status(500).send('500: Internal Server Error');
  });

  if (env === 'development' || env === 'test') {
    app.use((0, _errorhandler2.default)()); // Error handler - has to be last
  }
};

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _methodOverride = require('method-override');

var _methodOverride2 = _interopRequireDefault(_methodOverride);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _errorhandler = require('errorhandler');

var _errorhandler2 = _interopRequireDefault(_errorhandler);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=express.js.map
