'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.add = add;
exports.getValue = getValue;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export,max-len */

// const redisClient = require('./index').redisClient;
const redis = require('../../models/redis.model');
//
// export function set(key, value) {
//   redisClient.set(key, value);
// }

function add(key, value) {
  return redis.findOneAndUpdate({ key }, { $set: { value } }, { upsert: true }).then(result => result);
}

function getValue(key) {
  return new _promise2.default((resolve, reject) => {
    redis.findOne({ key }).then(result => resolve(result));
  });
}
//# sourceMappingURL=redisoperation.js.map
