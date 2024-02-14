const express = require('express');
const routes = express.Router();
const Items = require('../controllers/Items');
const ItemPost = require('../controllers/ItemPost');
const restrictToLoggedInUser = require('../middlewares/auth');

routes.get('/',Items);
routes.post('/',restrictToLoggedInUser,ItemPost);

module.exports = routes