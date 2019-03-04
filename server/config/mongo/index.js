'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = connectMongo;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectMongo() {
  // return new Promise((resolve, reject) => mongoose.connect(`mongodb://${process.env.DB_HOST}:27017/chat`, {
  return new _promise2.default((resolve, reject) => _mongoose2.default.connect(`mongodb://tinder_chat_app:password786@ds151805.mlab.com:51805/tinder_chat_app`, {

    useNewUrlParser: true
  }).then(yes => resolve('conneted', yes)).catch(err => reject(`not connected${err}`)));
}
//# sourceMappingURL=index.js.map
