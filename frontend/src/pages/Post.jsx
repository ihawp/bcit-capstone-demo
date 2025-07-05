import { Link, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import { PostsContext } from "../providers/PostsProvider";
import Marked from 'marked-react';
import changeTitle from "../utils/changeTitle";

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
        changeTitle('Error');
        return <>Error!</>
    }

    if (thePost) {

        changeTitle(`${thePost.title}`);

        return <main className="marked">
            
            <Link to='/posts'>Back To Posts</Link>

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