const express = require('express');
const selectController = require('../controllers/selectController');
const updateController = require('../controllers/updateController');
const insertController = require('../controllers/insertController');
const deleteController = require('../controllers/deleteController');

const postsRouter = express.Router();

postsRouter.get('/', selectController);

postsRouter.post('/', insertController);

postsRouter.put('/:id', updateController);

postsRouter.delete('/:id', deleteController);

module.exports = postsRouter;