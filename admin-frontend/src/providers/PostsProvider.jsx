import { createContext, useState, useEffect } from 'react';
import makeFetch from '../utils/makeFetch';

export const PostsContext = createContext(null);

function PostsProvider({ children }) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const doFetch = async () => {
            const response = await makeFetch('http://localhost:3000/api/v1/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            });
            setLoading(false);
            setPosts(response);
        }

        doFetch();

    }, []);

    return <PostsContext.Provider value={{ posts, loading }}>
        { children }
    </PostsContext.Provider>

}

export default PostsProvider;