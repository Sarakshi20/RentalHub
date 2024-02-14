const express = require('express');
const routes = express.Router();
const addListItem = require('../controllers/listItems');
const restrictToLoggedInUser = require('../middlewares/auth');

routes.post('/',restrictToLoggedInUser,addListItem);

module.exports = routes;