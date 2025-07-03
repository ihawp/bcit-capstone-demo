const express = require('express');
const postsRouter = require('./postsRouter');

// Create a router.
const apiRouter = express.Router();

/**
 * @route /api/v1/posts
 */
apiRouter.use('/posts', postsRouter);

module.exports = apiRouter;