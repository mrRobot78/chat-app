'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redisSchema = _mongoose2.default.Schema({
  key: { type: String, default: 0, unique: true, required: true },
  value: { type: String, required: true }
});

module.exports = _mongoose2.default.model('redis', redisSchema);
//# sourceMappingURL=redis.model.js.map
