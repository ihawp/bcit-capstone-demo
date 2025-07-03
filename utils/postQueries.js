const { pool, adminPool } = require('../pool');

// **********************************************************************
// SELECT

const selectAllPosts = () => {
    const [response] = pool.execute(`
        SELECT * 
        FROM portfolio-posts
        ORDER BY ASC
        LIMIT 25
        `,
        []
    );
    return response;
}

// **********************************************************************
// UPDATE

const updatePost = (data) => {
    const [response] = adminPool.execute(`
        UPDATE portfolio-posts
        SET title = ?, summary = ?, content = ?, time_created = CURRENT_TIMESTAMP(6)
        WHERE id = ?
        `,
        [data.title, data.summary, data.content, data.id]
    );
    return response;
}

// **********************************************************************
// INSERT

const insertPost = (data) => {
    const [response] = adminPool.execute(`
        INSERT INTO portfolio-posts
        (title, summary, content, time_created)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP(6))
        `,
        [data.title, data.summary, data.content]
    );
    return response;
}

// **********************************************************************
// DELETE

const deletePost = (id) => {
    const [response] = adminPool.execute(`
        DELETE FROM portfolio-posts
        WHERE id = ?
        `,
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