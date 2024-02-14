const express = require('express');
const routes = express.Router();
const loginUser = require('../controllers/userLogin');

routes.post('/',loginUser);

module.exports = routes;