const express = require('express');
const bcitRouter = require('./bcitRouter');

const apiRouter = express.Router();

apiRouter.use('/bcit-example', bcitRouter);

module.exports = apiRouter;