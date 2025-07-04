const { pool, adminPool } = require('../utils/pool');

// **********************************************************************
// SELECT

const selectAllPosts = async () => {
    const [response] = await pool.execute(
        'SELECT * FROM `portfolio-posts` ORDER BY id DESC LIMIT 25',
        []
    );
    return response;
}

// **********************************************************************
// UPDATE

const updatePost = async (data) => {
    const [response] = await adminPool.execute(
        'UPDATE `portfolio-posts` SET title = ?, summary = ?, content = ?, time_created = CURRENT_TIMESTAMP(6) WHERE id = ?',
        [data.title, data.summary, data.content, data.id]
    );
    return response;
}

// **********************************************************************
// INSERT

const insertPost = async (data) => {
    const [response] = await adminPool.execute(
        'INSERT INTO `portfolio-posts` (title, summary, content, time_created) VALUES (?, ?, ?, CURRENT_TIMESTAMP(6))',
        [data.title, data.summary, data.content]
    );
    return response;
}

// **********************************************************************
// DELETE

const deletePost = async (id) => {
    const [response] = await adminPool.execute(
        'DELETE FROM `portfolio-posts` WHERE id = ?',
        [id]
    );
    return response;
}

module.exports = {
    selectAllPosts,

    updatePost,

    insertPost,

    deletePost,
}