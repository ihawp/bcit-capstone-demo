import makeFetch from "../utils/makeFetch";
import { useContext, useState } from 'react';
import { PostsContext } from "../providers/PostsProvider";
import Markdown from 'marked-react';

function PostsForm({ isUpdate, setIsUpdate, currentItem, setCurrentItem, defaultForm, setDefaultForm, formOrig, setFormOrig, formOpen }) {

    const { posts, setPosts } = useContext(PostsContext);
    const [preview, setPreview] = useState(false);

    const handleChange = (event) => {
        setDefaultForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const resetForm = () => {
        setDefaultForm(formOrig);
    }

    const submitForm = async (event) => {

        event.preventDefault();

        let url = `http://localhost:3000/api/v1/posts/`;

        const addition = isUpdate ? encodeURIComponent(currentItem) : '';

        const response = await makeFetch(`${url}${addition}`, {
            method: isUpdate ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(defaultForm),
            credentials: 'same-origin',
        });

        if (!response) return;

        useReturnedData(response);

    }

    const useReturnedData = (data) => {

        setPosts(prev => {

            const index = prev.findIndex(item => item.id == data.id);

            if (index !== -1) {
                const updated = [...prev];
                updated[index] = data;
                return updated;
            } else {
                return [data, ...prev];
            }
        });

        setIsUpdate(true);
        setCurrentItem(data.id);
        setFormOrig(data);

    }

    const openPreview = () => {
        setPreview(prev => !prev);
    }

    const inputClasses = "border border-white p-2 rounded";

    return <form onSubmit={ submitForm } className={`flex flex-col
            ${formOpen ? 'w-[60%] sm:w-[50%] opacity visible ' : 'w-0 opacity-0 invisible' }
            transition-all bg-[#333] h-screen fixed top-0 right-0 z-100 overflow-auto p-8
        `}>
        <button onClick={ openPreview }>Preview</button>
        <header>
            <h2>{defaultForm.title}</h2>
        </header>
        <input type="text" name="title" id="title" onChange={ handleChange } value={ defaultForm.title } className={ inputClasses } />
        <textarea name="summary" onChange={ handleChange } value={ defaultForm.summary } className={ inputClasses + ' h-50' } />
        <textarea name="content" onChange={ handleChange } value={ defaultForm.content } className={ inputClasses + ' min-h-50 h-max'} />

        { preview ? <section className="marked fixed top-0 left-0 bg-[#222] h-[100vh] w-[100vw]">
            <div className="flex flex-col">

                <div className="flex flex-row items-center gap-2">
                    <h2>Preview</h2>
                    <button onClick={ openPreview }>Close Preview</button>
                </div>

                <div>
                    <h1>{defaultForm.title}</h1>
                    <p>{defaultForm.summary}</p>
                    <Markdown>
                        {defaultForm.content}
                    </Markdown>
                </div>

            </div>
        </section> : null }

        <div className="flex flex-row justify-between items-center">
            <button type="button" onClick={ resetForm }>Reset</button>
            <div className="flex flex-row items-center">
                <button onClick={ openPreview }>Preview</button>
                <input type="submit" />
            </div>
        </div>
    </form>
}

export default PostsForm;