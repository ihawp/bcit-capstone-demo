const { selectAllPosts } = require('../utils/postQueries');

const selectController = async (req, res) => {

    try {
        const response = await selectAllPosts();

        req.retrievedPosts = response;

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, error: 'Database error', code: 'DATABASE_ERROR' });
    }

    return res.status(200).json({ success: true, data: [req.retrievedPosts], message: 'Succesfully retrieved posts.' });

}

module.exports = selectController;