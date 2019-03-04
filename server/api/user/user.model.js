'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const userSchema = _mongoose2.default.Schema({
  UserId: { type: Number, default: 0, unique: true, required: true },
  Name: { type: String, required: true },

  MobileNumber: { type: String, required: true },
  Email: { type: String, required: true },
  Gender: { type: String, required: true },
  Password: { type: String, required: true },
  DOB: { type: Date, required: true, timezone: 'Asia/Calcutta' },
  FirstLogin: { type: Boolean, required: true, default: true },
  IsActive: { type: Boolean, required: true, default: true }

});

module.exports = _mongoose2.default.model('User', userSchema);

// export default function (sequelize, DataTypes) {
//   return sequelize.define('UserDetails', {
//     UserId: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//
//     },
//     Name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     MobileNumber: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     Gender: {
//       type: DataTypes.TINYINT, // 1 male 0 female
//       allowNull: false,
//     },
//     Password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     DOB: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     FirstLogin: {
//       type: DataTypes.TINYINT, // 1->yes 0->no
//       allowNull: false,
//     },
//     IsActive: {
//       type: DataTypes.TINYINT,
//       allowNull: false,
//     },
//   }, {
//     freezeTableName: true,
//   });
// }
//# sourceMappingURL=user.model.js.map
