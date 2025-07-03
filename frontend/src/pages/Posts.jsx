import { useContext } from 'react';
import { PostsContext } from '../providers/PostsProvider';
import Post from '../components/Post';

function Posts() {

    const { posts, loading } = useContext(PostsContext);

    return <main>

        <header>
            <h1>Posts</h1>
        </header>
    
        <section>
            {posts ? posts.map((item, key) => <Post item={item} key={key} /> ) : loading ? 'loading' : 'error'}
        </section>
    
    </main>
}

export default Posts;