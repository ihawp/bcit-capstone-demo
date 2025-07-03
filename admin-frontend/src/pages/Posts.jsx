import PostsTable from "../components/PostsTable";
import PostsForm from '../components/PostsForm';
import { useState } from 'react';
import { useContext } from 'react';
import { PostsContext } from '../providers/PostsProvider';

const defaultForm = {
    title: '',
    summary: '',
    content: ''
}

export default function Posts() {

    const { posts, loading } = useContext(PostsContext);

    const [isUpdate, setIsUpdate] = useState(false);
    const [formOpen, setFormOpen] = useState(true);
    const [currentItem, setCurrentItem] = useState(undefined);

    const [defaultPostsForm, setDefaultPostsForm] = useState({
        title: '',
        summary: '',
        content: ''
    });

    const openForm = (id = null) => {

        const idVal = id === null;

        setIsUpdate(true);
        setFormOpen(true);

        setCurrentItem(idVal ? id : null);

        // find the post in posts via the id
        if (idVal) {
            setDefaultPostsForm(posts.filter(item => item.id == id));
            return;
        }

        setDefaultPostsForm(defaultForm);

    }

    return <div className='flex flex-row'>

        <section>
            <PostsTable openForm={ openForm } data={{ posts, loading, currentItem }} />
        </section>

        {formOpen ? <PostsForm isUpdate={ isUpdate } currentItem={ currentItem } defaultForm={ defaultPostsForm } /> : null}

    </div>;
}