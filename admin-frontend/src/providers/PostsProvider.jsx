import { createContext, useState, useEffect } from 'react';

const PostsContext = createContext(null);

function PostsProvider() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/posts', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'same-origin',
                });

                if (!response.ok) return false;

                const data = await response.json();

                if (!data.success) return false;

                return data.data;

            } catch (error) {
                return false;
            }
        }

        const doFetch = async () => {
            const response = await fetchPosts();
            setPosts(response);
        }

        doFetch();

    }, []);

    return <PostsContext.Provider value={ posts }>
        {children}
    </PostsContext.Provider>

}

export default PostsProvider;