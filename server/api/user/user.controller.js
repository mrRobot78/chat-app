'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.decodePassword = decodePassword;
exports.create = create;
exports.update = update;
exports.get = get;
exports.userOTP = userOTP;
exports.updatePassword = updatePassword;
exports.updateImage = updateImage;

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _firebase = require('../../config/firebase');

var _firebase2 = _interopRequireDefault(_firebase);

var _redisoperation = require('../../config/redis/redisoperation');

var _minio = require('../minio/minio.controller');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Users = require('./user.model');

// const RedisClient = require('../../config/redis').redisClient;

/* eslint-disable import/prefer-default-export,no-mixed-operators,no-unused-vars,max-len,no-underscore-dangle,no-param-reassign,consistent-return */
const ref = _firebase2.default.ref('server');
// getcurrentDate
function getDateWithoutTime(date) {
  const currentDateTime = new Date(date).toLocaleString().split(',');
  let currentDate = currentDateTime[0];
  currentDate = currentDate.split('/');
  console.log(currentDate);
  const day = parseInt(currentDate[0], 10) + 1;
  const month = parseInt(currentDate[1], 10);
  const year = parseInt(currentDate[2], 10);

  // Putting it all together
  return `${year}-${month}-${day}`;
}
function getLastUser() {
  return new _promise2.default((resolve, reject) => {
    console.log('here');
    const usersRef = ref.child('users');
    usersRef.once('value', snapshot => {
      if (snapshot.exists()) {
        usersRef.limitToLast(1).on('child_added', (childSnapshot, err) => {
          const snap = childSnapshot.val();
          resolve(snap);
        });
      } else {
        const lastUser = {};
        lastUser.UserId = 0;
        resolve(lastUser);
      }
    });
  });
}
function checkUserExist(user) {
  return new _promise2.default((resolve, reject) => {
    const usersRef = ref.child(`users/${user.mobile}`);
    usersRef.once('value').then(snap => {
      resolve(snap.exists());
    });
  });
}
function decodePassword(password) {
  const key = _crypto2.default.createCipher(process.env.CRYPTO_ALGO, 'abc'); // abc replace by some data
  let newPassword = key.update(password, 'utf8', 'hex');
  newPassword += key.final('hex');
  return newPassword;
}
async function userOperation(user) {
  const userExist = await checkUserExist(user);
  if (!userExist) {
    const lastUser = await getLastUser();
    return { lastUser, exist: false };
  }
  return { lastUser: null, exist: true };
}
function create(req, res) {
  console.log('add user', req.body);
  const password1 = decodePassword(req.body.password);
  const user1 = {
    Name: null,
    MobileNumber: req.body.mobile,
    Email: req.body.email,
    Password: password1,
    Gender: null,
    DOB: null,
    CountryCode: req.body.countryCode,
    InterestedIn: null,
    School: null,
    Company: null,
    Job: null,
    Lat: req.body.lat,
    Long: req.body.long,
    Image: [{
      Name: null,
      IsActive: false
    }]
  };
  Users.create(user1).then(result => {
    const user = result;
    user.Password = null;
    user.IsActive = null;
    _jsonwebtoken2.default.sign({ user }, process.env.JWT_SECKERT_KEY, (err, token) => {
      if (err) {
        return res.send({ status: false, msg: 'Something went wrong', data: user });
      }
      (0, _redisoperation.add)(`${user.MobileNumber}login`, token);
      return res.send({ status: true, msg: 'Profile is created successfully', data: user, token });
    });
  }).catch(err => {
    if (err.errmsg.includes('MobileNumber')) {
      return res.send({ status: false, msg: 'Mobile Number Already Register' });
    } else if (err.errmsg.includes('Email')) {
      return res.send({ status: false, msg: 'Email Already Register' });
    }
    return res.send({ status: false, msg: 'Something Went Wrong' });
  });

  // userOperation(req.body).then((obj) => {
  //   console.log('obj', obj);
  //   if (!obj.exist) {
  //     console.log('eeee');
  //     const usersRef = ref.child('users');
  //     const userID = obj.lastUser.UserId + 1;
  //     const password = decodePassword(req.body.password);
  //     const user = {
  //       UserId: userID,
  //       Name: null,
  //       MobileNumber: req.body.mobile,
  //       Email: req.body.email,
  //       Password: password,
  //       Gender: null,
  //       DOB: null,
  //       CountryCode: req.body.countryCode,
  //       InterestedIn: null,
  //       School: null,
  //       Company: null,
  //       Job: null,
  //       Lat: req.body.lat,
  //       Long: req.body.long,
  //     };
  //     usersRef.child(user.MobileNumber)
  //       .set(user);
  //     delete user.Password;
  //     delete user.UserId;
  //     jwt.sign({ user }, process.env.JWT_SECKERT_KEY, (err, token) => {
  //       if (err) {
  //         return res.send({ status: false, msg: 'Something went wrong', data: user });
  //       }
  //       add(`${user.MobileNumber}login`, token);
  //       return res.send({ status: true, msg: 'Profile is created succesfully', data: user, token });
  //     });
  //     // have to delete password
  //   } else {
  //     return res.send({ status: false, msg: 'Mobile Already Register', data: null });
  //   }
  // }).catch((err) => {
  //   console.log('ee', err);
  //   return res.send({ status: false, msg: 'Profile is not created please try again', data: null });
  // });
}
function update(req, res) {
  console.log('update', req.body);
  console.log('update', req.authData);
  const user = {
    Name: req.body.name,
    Gender: req.body.gender,
    DOB: req.body.DOB,
    InterestedIn: req.body.interest,
    School: req.body.school,
    Company: req.body.company,
    Job: req.body.job
  };
  if (!user.InterestedIn) {
    delete user.InterestedIn;
  }
  if (!user.Name) {
    delete user.Name;
  }
  if (!user.Gender) {
    delete user.Gender;
  }
  if (!user.DOB) {
    delete user.DOB;
  }
  if (!user.School) {
    delete user.School;
  }
  if (!user.Company) {
    delete user.Company;
  }
  if (!user.Job) {
    delete user.Job;
  }
  const condition = { _id: req.authData._id };
  Users.findOneAndUpdate(condition, user, { new: true }).then(result => {
    const userResult = result;
    userResult.Password = null;
    userResult._id = null;
    userResult.IsActive = null;
    return res.send({ status: true, msg: 'Profile Updated Successfully', data: userResult });
  }).catch(err => {
    console.log(err);
  });
  // DB.ref(`server/users/${req.body.phone}`).update(user);
  // res.send({ status: true, msg: 'Profile Updated Suceesfully', data: null });
}
function get(req, res) {
  Users.findById(req.authData._id, { _id: 0, Password: 0, IsActive: 0 }).then(user => {
    if (user.Images.length > 0) {
      let index = 0;
      console.log(user.Images.length);
      _async2.default.eachSeries(user.Images, (q, next) => {
        index += 1;
        (0, _minio.getUrl)(q.Name).then(url => {
          q.URL = url;
          if (user.Images.length === index) {
            return res.send({ status: true, msg: 'User Information', data: user });
          }
          next();
        }).catch(url => {
          q.URL = url;
          if (user.Images.length === index) {
            return res.send({ status: true, msg: 'User Information', data: user });
          }
          next();
        });
      });
    } else return res.send({ status: true, msg: 'User Information1', data: user });
  });
  // const usersRef = ref.child(`users/${req.authData.MobileNumber}`);
  // usersRef.once('value').then((snap) => {
  //   if (snap.exists()) {
  //     const user = snap.val();
  //     console.log('user', user);
  //     return res.send({ status: true, msg: 'User Information', data: user });
  //   }
  //   return res.send({ status: false, msg: 'Account not Found', data: null });
  // });
}
function userOTP(req, res) {
  console.log(req.body);
  if (req.body.isSendOTP) {
    // const OTP = Math.floor(1000 + Math.random() * 9000);
    // RedisClient.set(`OTP${req.body.code}${req.body.phone}`, OTP, (err, reply) => {
    //   if (err) {
    //     return res.send({ status: false, msg: 'Something went wrong', data: null });
    //   }
    //   // send otp logic here
    //   console.log(OTP);
    _axios2.default.post('https://api.authy.com/protected/json/phones/verification/start', {
      via: 'sms',
      country_code: req.body.code,
      phone_number: req.body.phone,
      code_length: 4
    }, { headers: { 'X-Authy-API-Key': process.env.OTP_SECURITY_API_KEY } }).then(response => res.send({ status: true, msg: 'OTP is send on Phone number', data: req.body })).catch(err => {
      console.log(err);
      return res.send({ status: false, msg: 'Something went wrong', data: err });
    });

    // });
  } else {
    _axios2.default.get(`https://api.authy.com/protected/json/phones/verification/check?X-Authy-API-Key=
  ${process.env.OTP_SECURITY_API_KEY}&phone_number=
  ${req.body.phone}&country_code=${req.body.code}&verification_code=${req.body.otp}`, { headers: { 'X-Authy-API-Key': process.env.OTP_SECURITY_API_KEY } }).then(response => res.send({ status: true, msg: 'OTP is correct', data: req.body })).catch(err => res.send({ status: false, msg: 'OTP is wrong', data: null }));

    // RedisClient.get(`OTP${req.body.code}${req.body.phone}`, (err, otp) => {
    //   if (err) {
    //     return res.send({ status: false, msg: 'Something went wrong', data: null });
    //   } else if (otp === req.body.otp) {
    //     RedisClient.del(`OTP${req.body.code}${req.body.phone}`);
    //     return res.send({ status: true, msg: 'OTP is correct', data: req.body });
    //   }
    //   return res.send({ status: false, msg: 'OTP is wrong', data: null });
    // });
  }
}
function updatePassword(req, res) {
  const user = {
    Password: decodePassword(req.body.password)
  };
  // DB.ref(`server/users/${req.body.phone}`).update(user);
  const condition = { MobileNumber: req.body.phone };
  Users.findOneAndUpdate(condition, user).then(result => {
    console.log(result);
    return res.send({ status: true, msg: 'Password Updated Successfully' });
  }).catch(err => {
    console.log(err);
  });
}
function updateImage(req, res) {
  console.log('here', req.body);
  req.body.fromWhere = 'user';
  (0, _minio.setData)(req, res);
}
//# sourceMappingURL=user.controller.js.map
