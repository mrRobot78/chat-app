'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.index = index;
exports.get = get;

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _firebase = require('../../config/firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _user = require('../user/user.controller');

var _redisoperation = require('../../config/redis/redisoperation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export,consistent-return,no-underscore-dangle */
const Users = require('../user/user.model');

const ref = _firebase2.default.ref('server');
function index(req, res) {
  console.log('eee');
  // const usersRef = ref.child(`users/${req.body.mobile}`);
  Users.findOne({ MobileNumber: req.body.mobile }).then(result => {
    const user = JSON.parse((0, _stringify2.default)(result));
    if (user) {
      if (user.Password === (0, _user.decodePassword)(req.body.password)) {
        delete user.Password;
        delete user.IsActive;
        _jsonwebtoken2.default.sign({ user }, process.env.JWT_SECKERT_KEY, (err, token) => {
          if (err) {
            return res.send({ status: false, msg: 'Something went wrong', data: user });
          }
          (0, _redisoperation.add)(`${user.MobileNumber}login`, token);
          delete user._id;
          return res.send({ status: true, msg: 'Login successfully', data: user, token });
        });
      } else {
        return res.send({ status: false, msg: 'Login Not successfully', data: null });
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
