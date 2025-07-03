import makeFetch from '../utils/makeFetch';
import { useContext } from 'react';
import { PostsContext } from '../providers/PostsProvider';

function PostsTable({ openForm }) {

    const { posts, setPosts, loading } = useContext(PostsContext);

    const deletePost = async (id) => {

        if (!confirm(`Are you sure you want to delete post #${id}?`)) {
            return false;
        }

        const response = await makeFetch(`http://localhost:3000/api/v1/posts/${encodeURIComponent(id)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        });

        if (!response) {
            return false;
        }

        setPosts(prev => prev.filter(item => item.id != id));
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