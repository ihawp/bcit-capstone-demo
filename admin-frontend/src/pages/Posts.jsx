import PostsTable from "../components/PostsTable";
import PostsForm from '../components/PostsForm';
import { useState } from 'react';
import { useContext } from 'react';
import { PostsContext } from '../providers/PostsProvider';

const defaultForm = {
    id: undefined,
    title: '',
    summary: '',
    content: '',
    time_created: '',
}

export default function Posts() {

    const { posts, loading } = useContext(PostsContext);

    const [isUpdate, setIsUpdate] = useState(false);
    const [formOpen, setFormOpen] = useState(true);
    const [currentItem, setCurrentItem] = useState(undefined);
    const [defaultPostsForm, setDefaultPostsForm] = useState(defaultForm);
    const [formOrig, setFormOrig] = useState(defaultForm);

    // Open any form, UPDATE or INSERT

    const openForm = (item) => {

        setFormOpen(true);

        setCurrentItem(item.id);

        // find the post in posts via the id
        let the_post = posts.filter(post => post.id == item.id);

        if (the_post.length > 0) {
            setIsUpdate(true);
            setDefaultPostsForm(the_post[0]);
            return;
        }

        setIsUpdate(false);
        setDefaultPostsForm(item);

    }

    const closeForm = () => {
        setFormOpen(false);
    }

    return <div className='flex flex-row'>

        <section>
            <button onClick={ () => openForm(defaultForm) }>+ New Post</button>
            {formOpen ? <button onClick={ () => closeForm() }>Close Form</button> : null}
        </section>

        <section>
            <PostsTable openForm={ openForm } />
        </section>

        {formOpen ? <PostsForm isUpdate={ isUpdate } setCurrentItem={ setCurrentItem } setIsUpdate={ setIsUpdate } currentItem={ currentItem } defaultForm={ defaultPostsForm } formOrig={ formOrig } setFormOrig={ setFormOrig } setDefaultForm={ setDefaultPostsForm } /> : null}

    </div>;
}