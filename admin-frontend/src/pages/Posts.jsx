import PostsTable from "../components/PostsTable";
import PostsForm from '../components/PostsForm';
import { useState } from 'react';
import { useContext } from 'react';
import { PostsContext } from '../providers/PostsProvider';

export default function Posts() {

    const { posts, loading } = useContext(PostsContext);

    const [isUpdate, setIsUpdate] = useState(false);
    const [formOpen, setFormOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(undefined);

    const openForm = (id) => {
        setIsUpdate(true);
        setFormOpen(true);
        setCurrentItem(id);
    }

    return <div className='flex flex-row'>

        <section>
            <PostsTable openForm={ openForm } data={{ posts, loading }} />
        </section>

        {formOpen ? <PostsForm isUpdate={ isUpdate } /> : null}

    </div>;
}