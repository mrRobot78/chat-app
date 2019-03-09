'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chat = require('./chat.events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// var ChatSchema = new Schema({
const ChatSchema = _mongoose2.default.Schema({

  MsgSessionId: { type: String },
  MsgText: { type: String },
  MsgTimestamp: { type: Date, default: Date.now },
  Delivered: { type: Boolean },
  Read: { type: Boolean },
  Sender: {
    Name: String,
    MobileNumber: String
  },
  User: {
    Name: String,
    MobileNumber: String
  }
  // sender_mobile:      { type: String },
  // User:        { type: String }

  // sender : {
  //     type : mongoose.Schema.Types.ObjectId,
  //     ref : 'User'
  // },
  //   : { type: Date },
  // messages : [
  //     {
  //         message : String,
  //         meta : [
  //             {
  //                 user : {
  //                     type : mongoose.Schema.Types.ObjectId,
  //                     ref : 'User'
  //                 },
  //                 delivered : Boolean,
  //                 read : Boolean
  //             }
  //         ]
  //     }
  // ],
  // is_group_message : { type : Boolean, default : false },
  // participants : [
  //     {
  //         user :  {
  //             type : mongoose.Schema.Types.ObjectId,
  //             ref : 'User'
  //         },
  //         delivered : Boolean,
  //         read : Boolean,
  //         last_seen : Date
  //     }
  // ]
});

(0, _chat.registerEvents)(ChatSchema);
module.exports = _mongoose2.default.model('chat', ChatSchema);
//# sourceMappingURL=chat.model.js.map
