const express = require('express');
const routes = express.Router();
const ViewItems = require('../controllers/viewItems');
const restrictToLoggedInUser = require('../middlewares/auth');

routes.get('/',restrictToLoggedInUser,ViewItems);

module.exports = routes