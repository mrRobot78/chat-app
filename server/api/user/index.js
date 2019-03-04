'use strict';

const express = require('express');
const controller = require('./user.controller');
const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.post('/', controller.create); // no authrization
router.patch('/', isAuthenticated.isAuthenticated, controller.update);
router.post('/otp', controller.userOTP); // no authrization
router.patch('/updatepassword', controller.updatePassword); // no authrization
router.get('/', isAuthenticated.isAuthenticated, controller.get);
module.exports = router;
//# sourceMappingURL=index.js.map
