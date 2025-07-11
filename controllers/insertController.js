const validator = require('validator');
const { insertPost } = require('../models/postQueries');

const insertController = async (req, res) => {

    // Assume that users account has been verified as 'allowed to make changes to posts' (admin).
        // This would be a middleware that verifies a cookie related to the users session.

    let { title, summary, content } = req.body;

    // Sanitize

    title = validator.trim(title);
    title = validator.escape(title);

    summary = validator.trim(summary);
    summary = validator.escape(summary);

    content = validator.trim(content);
    content = validator.escape(content);

    // Checkout express-validator for a better experience with validation in Express.js
        // For example the logic for validating the inputted 'body' for UPDATE or INSERT
        // could be reused between the two controllers.

    if (!title || !summary || !content) {
        return res.status(400).json({ success: false, error: 'Missing inputs.', code: 'USER_ERROR' });
    }

    const scO = { min: 1, max: 65535 };

    if (!validator.isLength(title, { min: 1, max: 255 }) ||
        !validator.isLength(summary, scO) ||
        !validator.isLength(content, scO)) {
        return res.status(400).json({ success: false, error: 'Incorrect inputs.', code: 'USER_ERROR' });
    }

    const data = {
        title,
        summary,
        content,
    }

    try {
        const response = await insertPost(data);

        data.id = response.insertId;
        data.time_created = new Date();

    } catch (error) {
        return res.status(500).json({ success: false, error, code: 'DATABASE_ERROR' });
    }

    return res.status(200).json({ success: true, data, message: 'Post inserted successfully!' });

}

module.exports = insertController;