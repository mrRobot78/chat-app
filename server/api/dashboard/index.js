'use strict';

const express = require('express');
const controller = require('./dashboard.controller');
const isAuthenticated = require('../../auth/auth.service');

const router = express.Router();

router.get('/:lat/:long', isAuthenticated.isAuthenticated, controller.profile);

module.exports = router;
//# sourceMappingURL=index.js.map
