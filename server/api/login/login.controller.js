'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.index = index;
exports.get = get;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _firebase = require('../../config/firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _user = require('../user/user.controller');

var _redisoperation = require('../../config/redis/redisoperation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export,consistent-return */
const ref = _firebase2.default.ref('server');
function index(req, res) {
  console.log('eee');
  const usersRef = ref.child(`users/${req.body.mobile}`);
  usersRef.once('value').then(snap => {
    if (snap.exists()) {
      const user = snap.val();
      if (user.Password === (0, _user.decodePassword)(req.body.password)) {
        delete user.UserId;
        delete user.Password;
        _jsonwebtoken2.default.sign({ user }, process.env.JWT_SECKERT_KEY, (err, token) => {
          if (err) {
            return res.send({ status: false, msg: 'Something went wrong', data: user });
          }
          (0, _redisoperation.add)(`${user.MobileNumber}login`, token);
          return res.send({ status: true, msg: 'Login succesfully', data: user, token });
        });
      } else {
        return res.send({ status: false, msg: 'Login Not succesfully', data: null });
      }
    } else {
      return res.send({ status: false, msg: 'Account not Found', data: null });
    }
  });
}

function get(req, res) {
  res.send({ data: 'work' });
}
//# sourceMappingURL=login.controller.js.map
