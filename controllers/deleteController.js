const validator = require('validator');
const { deletePost } = require('../utils/postQueries');

const deleteController = async (req, res) => {

    let { id } = req.body;

    id = validator.trim(id);
    id = validator.escape(id);

    if (!id || !validator.isNumeric(id)) {
        return res.status(400).json({ success: false, error: 'Missing inputs.', code: 'USER_ERROR' });
    }

    try {
        await deletePost(id);
    } catch (error) {
        return res.status(500).json({ success: false, error: 'Missing inputs.' });
    }

    return res.status(200).json({ success: true, data: {}, message: 'Post deleted successfully!' });

}

module.exports = deleteController;