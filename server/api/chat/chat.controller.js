'use strict';

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _firebase = require('../../config/firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _redisoperation = require('../../config/redis/redisoperation');

var _chat = require('./chat.model');

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export,no-mixed-operators,no-unused-vars,max-len */
const ref = _firebase2.default.ref('server');

/* --------------------------------- Creates a new PaymentDetail in the DB.---------------------------------*/

exports.getDatabyMsgSessionId = function (req, res, next) {
  console.log(`${req.params.user_mobile}_${req.params.sender_mobile}`);
  console.log(`${req.params.sender_mobile}_${req.params.user_mobile}`);
  _chat2.default.find({ MsgSessionId: { $in: [`${req.params.user_mobile}_${req.params.sender_mobile}`, `${req.params.sender_mobile}_${req.params.user_mobile}`] } }).sort({ msg_timestamp: 1 }).select('-_id').exec((err, chat) => {
    if (err) return res.status(201).json({ success: false, message: 'Something went worng!' });
    if (!chat) return res.status(201).json({ success: false, message: 'Not Found!' });
    return res.status(200).json({ success: true, chat });
  });
};

exports.create = function (req, res, next) {
  // const chatRef = ref.child('chat');
  // const chatData = {
  //        msg_session_id: req.body.msg_session_id,
  //        msg_text: req.body.msg_text,
  //        user_mobile: req.body.msg_text,
  //        sender_mobile: req.body.msg_text,
  //      };

  //      chatRef.child(chatData.msg_session_id)
  //        .set(chatData);

  _chat2.default.create(req.body, (err, chat) => {
    if (err) return res.status(201).json({ success: false, message: 'Something went worng!' });
    return res.status(201).json({ success: true, message: 'Chat successfully Created!' });
  });
};
//# sourceMappingURL=chat.controller.js.map
