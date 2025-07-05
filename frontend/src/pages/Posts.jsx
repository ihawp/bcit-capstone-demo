import { useContext } from 'react';
import { PostsContext } from '../providers/PostsProvider';
import Post from '../components/Post';
import changeTitle from '../utils/changeTitle';

function Posts() {

    changeTitle('Posts');

    const { posts, loading } = useContext(PostsContext);

    return <main className='flex flex-col items-center'>

        <div className='flex flex-col w-full md:w-190 lg:w-250 xl:w-300'>
            <header>
                <h1 className='text-3xl font-bold mb-4'>All Posts</h1>
            </header>
        
            <section className='flex flex-row flex-wrap gap-2'>
                {posts ? posts.map((item, key) => <Post item={item} key={key} /> ) : loading ? 'loading' : 'error'}
            </section>
        </div>
    
    </main>
}

export default Posts;