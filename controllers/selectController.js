const { selectAllPosts } = require('../utils/postQueries');

const selectController = async (req, res) => {

    try {
        const response = await selectAllPosts();

        if (response.length == 0) {
            throw new Error();
        }

        req.retrievedPosts = response;

    } catch (error) {
        return res.status(500).json({ success: false, error: 'Database error', code: 'DATABASE_ERROR' });
    }

    return res.status()

}

module.exports = selectController;