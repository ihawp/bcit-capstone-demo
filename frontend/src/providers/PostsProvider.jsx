import { createContext, useEffect, useState } from 'react';

export const PostsContext = createContext(null);

function PostsProvider({ children }) {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'same-origin',
            });

            if (!response.ok) {
                setLoading(false);
                return false;
            }

            setLoading(false);

            const data = await response.json();

            return data;

        } catch (error) {
            return false;
        }

    }

    const doFetch = async () => {
        const response = await fetchPosts();
        setPosts(response.data || []);
    }

    useEffect(() => {

        doFetch();

    }, []);

    return <PostsContext.Provider value={{ posts, loading }}>
        { children }
    </PostsContext.Provider>
}

export default PostsProvider;