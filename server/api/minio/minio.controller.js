'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.setData = setData;
exports.getUrl = getUrl;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/prefer-default-export,
no-unused-vars,no-useless-escape,no-underscore-dangle */
const Minio = require('minio');
const Users = require('../user/user.model');

const minioClient = new Minio.Client({
  endPoint: '192.168.100.209',
  useSSL: true,
  accessKey: process.env.MINIO_ACCESSKEY,
  secretKey: process.env.MINIO_SECRETKEY
});

// const getMinioClient = new Minio.Client({
//   endPoint: 'env-8478623.mj.milesweb.cloud/minio',
//   useSSL: true,
//   accessKey: process.env.MINIO_ACCESSKEY,
//   secretKey: process.env.MINIO_SECRETKEY,
// });
function putObject(newPath, fileStream, res, data, req) {
  console.log('hehe');
  const bodyImage = data;
  return minioClient.putObject(process.env.MINIO_BUCKET_NAME, newPath, fileStream, (err3, etag) => {
    if (err3) {
      return res.json({ status: 500, msg: 'Image failed to push in Minio' });
    } else if (bodyImage.fromWhere === 'user') {
      bodyImage.Name = newPath;
      bodyImage.IsActive = true;
      bodyImage.URL = null;
      delete bodyImage.WhichImage;
      delete bodyImage.imageData;
      delete bodyImage.fromWhere;
      delete bodyImage.isActive;
      const condition = { _id: req.authData._id };
      Users.findOneAndUpdate(condition, { $push: { Images: bodyImage } }, { new: true }).then(result => {
        const userResult = result;
        userResult.Password = null;
        userResult._id = null;
        userResult.IsActive = null;
        return res.send({ status: true, msg: 'Image Updated Successfully', data: userResult });
      }).catch(err => {
        console.log(err);
        return res.send({ status: false, msg: 'Image not Updated Successfully' });
      });
    }
    return true;
  });
}

function setData(req, res) {
  // res.status(200).json(req.body);
  const bodyImage = req.body;
  let newPath;

  const matches = bodyImage.imageData;
  const index = matches.indexOf('base64');
  const s1 = matches.substring(0, index + 6);
  const i = s1.indexOf(':');
  let type = s1.substring(i + 1, index - 1);
  const base64Data = matches.substring(index + 7);
  type = type.split('/');
  //  console.log('base64Data', base64Data);
  console.log('type', type);
  if (bodyImage.fromWhere === 'user') {
    newPath = `chat${Date.now()}_${Math.ceil(Math.random(100000) * 1000000)}.${type[1]}`;
  }
  const fileStream = Buffer.from(base64Data, 'base64');

  return minioClient.bucketExists(process.env.MINIO_BUCKET_NAME, (err2, exists) => {
    if (err2) {
      console.log({ status: 500, msg: 'Bucket is not exists', err2 });
      // resolve(err2);
      return res.json(err2);
    }
    console.log('exists --- ', exists);
    if (exists) {
      return putObject(newPath, fileStream, res, bodyImage, req);
    }
    return minioClient.makeBucket(process.env.MINIO_BUCKET_NAME, 'us-east-1', err1 => {
      if (err1) {
        console.log(err1);
        return res.json({ status: 500, msg: 'Image Bucket is not created' });
      }
      return putObject(newPath, fileStream, res, bodyImage, req);
    });
  });
}
function getUrlNew(fileName) {
  return new _promise2.default((resolve, reject) => {
    minioClient.presignedUrl('GET', process.env.MINIO_BUCKET_NAME, fileName).then(url => {
      if (url) {
        resolve(url);
      }
      return resolve(null);
    }).catch(err => {
      console.log(err);
      reject(null);
    });
  });
}
async function getUrl(fileName) {
  const url = await getUrlNew(fileName);
  return url;
}
//# sourceMappingURL=minio.controller.js.map
