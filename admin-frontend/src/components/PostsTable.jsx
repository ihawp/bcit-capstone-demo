import makeFetch from '../utils/makeFetch';

function PostsTable({ data, openForm }) {

    const { posts, loading } = data;

    const deletePost = async (id) => {
        console.log(id);
        if (confirm(`Are you sure you want to delete post #${id}?`)) {
            await makeFetch('https://localhost:3000/api/v1/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
                credentials: 'same-origin',
            });
        }
    }

    return <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Title</th>
                <th>Summary</th>
                <th>Content</th>
                <th>Time Created</th>
            </tr>
        </thead>
        <tbody>
            { posts ? posts.map((item, key) => {
                return <tr>
                    <td>{item.id}</td>
                    <td>
                        <button onClick={ () => openForm(item) }>Update</button>
                    </td>
                    <td>
                        <button onClick={ () => deletePost(item.id) }>Delete</button>
                    </td>
                    <td>{item.title}</td>
                    <td>{item.summary}</td>
                    <td>{item.content}</td>
                    <td>{item.time_created}</td>
                </tr>
            }) : loading ? 'loading' : 'error'}
        </tbody>
    </table>
}

export default PostsTable;