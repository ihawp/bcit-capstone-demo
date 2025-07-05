import { useParams } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { PostsContext } from "../providers/PostsProvider";
import Marked from 'marked-react';

function Post() {

    const [thePost, setThePost] = useState(undefined);

    const { id } = useParams();

    const { posts, loading } = useContext(PostsContext);

    useEffect(() => {
        
        if (posts) {
            setThePost(posts.filter(item => item.id == id)[0]);
        }

    }, [posts]);

    // This style is better, but I have heard about the react 19 update for removing having to do loading variable.

    if (loading) {
        return <>Loading!</>
    }

    if (!loading && !posts) {
        return <>Error!</>
    }

    if (thePost) {
        return <main className="marked">
            
            <header>
                <h1>{thePost.title}</h1>
                <p>{thePost.summary}</p>
            </header>
            <section>
                <Marked>{thePost.content}</Marked>
            </section>
        </main>
    }

}


export default Post;