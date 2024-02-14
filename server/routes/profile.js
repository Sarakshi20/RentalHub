const express = require('express');
const router = express.Router();
const sendProfileData = require('../controllers/profile');
const restrictToLoggedInUser = require('../middlewares/auth');

router.get('/',restrictToLoggedInUser,sendProfileData);

module.exports = router;