'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profile = profile;

var _firebase = require('../../config/firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ref = _firebase2.default.ref('server'); /* eslint-disable import/prefer-default-export */

function rad(x) {
  return x * Math.PI / 180;
}

function getDistance(p1, p2) {
  const R = 6378137; // Earth’s mean radius in meter
  const dLat = rad(p2.lat - p1.lat);
  const dLong = rad(p2.long - p1.long);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d; // returns the distance in meter
}

function profile(req, res) {
  const usersRef = ref.child('users');
  usersRef.once('value', snapshot => {
    const allUser = [];
    const lat = req.authData.Lat;
    const long = req.authData.Long;
    const p1 = {
      lat,
      long
    };
    console.log(p1);
    snapshot.forEach(item => {
      if (req.authData.MobileNumber !== item.val().MobileNumber) {
        allUser.push(item.val());
      }
    });
    const userArr = [];
    allUser.forEach(item => {
      const p2 = {
        lat: item.Lat,
        long: item.Long

      };
      if (p1.lat && p1.long && p2.lat && p2.long) {
        const dist = getDistance(p1, p2);
        console.log('dd', dist);
        if (dist < 5000) {
          delete item.Password;
          item.Distance = dist;
          userArr.push(item);
        }
      }
    });
    res.send(userArr);
  });
}
//# sourceMappingURL=dashboard.controller.js.map
