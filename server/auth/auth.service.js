'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticated = isAuthenticated;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const redisClient = require('../config/redis').redisClient;
const redis = require('../config/redis/redisoperation');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 401
 */

/* eslint-disable max-len,import/prefer-default-export,no-shadow,consistent-return */
function isAuthenticated(req, res, next) {
  const bearerHeader = req.header('Authorization');
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    _jsonwebtoken2.default.verify(token, process.env.JWT_SECKERT_KEY, (err, authData) => {
      if (err || typeof authData === 'undefined') {
        res.status(401).json({ success: false, msg: 'Unauthorised access3' });
      } else {
        redis.getValue(`${authData.user.MobileNumber}login`).then(reply => {
          if (reply.value === token) {
            // redisClient.set(`${authData.user.PM_User_MobileNumber}`, `${req.token}`);
            // redisClient.expire(`${authData.user.PM_User_MobileNumber}`, process.env.IDEL_SESSION_TIME); // session time
            req.authData = authData.user;
            return next();
          }
          res.status(401).json({ success: false, msg: 'Unauthorised access1' });
        });
      }
    });
  } else {
    res.status(401).json({ success: false, msg: 'Unauthorised access4' });
  }
  // });
}
//# sourceMappingURL=auth.service.js.map
