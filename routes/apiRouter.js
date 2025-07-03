const express = require('express');
const postsRouter = require('./postsRouter');

const apiRouter = express.Router();

apiRouter.use('/posts', postsRouter);

module.exports = apiRouter;