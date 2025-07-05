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

    const thdc = 'border p-1';

    return <table className="border-collapse border w-[100vw]">
        <thead>
            <tr>
                <th className={thdc}>ID</th>
                <th className={thdc}>Update</th>
                <th className={thdc}>Delete</th>
                <th className={thdc}>View</th>
                <th className={thdc}>Title</th>
                <th className={thdc}>Summary</th>
                <th className={thdc}>Content</th>
                <th className={thdc}>Time Created</th>
            </tr>
        </thead>
        <tbody>
            { posts ? posts.map((item, key) => {
                return <tr key={key}>
                    <td className={thdc}>{item.id}</td>
                    <td className={thdc}>
                        <button onClick={ () => openForm(item) } className="cursor-pointer hover:bg-green-500 hover:text-white rounded">Update</button>
                    </td>
                    <td className={thdc}>
                        <button onClick={ () => deletePost(item.id) } className="cursor-pointer hover:bg-red-500 hover:text-white rounded">Delete</button>
                    </td>
                    <td className={thdc}>
                        <a href={`http://localhost:3000/post/${encodeURIComponent(item.id)}`}>View</a>
                    </td>
                    <td className={thdc}>{item.title}</td>
                    <td className={thdc}>{item.summary}</td>
                    <td className={thdc}>{item.content}</td>
                    <td className={thdc}>{item.time_created}</td>
                </tr>
            }) : loading ? 'loading' : 'error'}
        </tbody>
    </table>
}

export default PostsTable;