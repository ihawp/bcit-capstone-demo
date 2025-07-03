import makeFetch from "../utils/makeFetch";
import { useContext } from 'react';
import { PostsContext } from "../providers/PostsProvider";
import Markdown from 'marked-react';

function PostsForm({ isUpdate, setIsUpdate, currentItem, setCurrentItem, defaultForm, setDefaultForm, formOrig, setFormOrig }) {

    const { posts, setPosts } = useContext(PostsContext);

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

        console.log(isUpdate);

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

    return <form onSubmit={ submitForm } className="bg-red-500 flex flex-col gap-2 w-300">
        <header>
            <h2>{defaultForm.title}</h2>
        </header>
        <input type="text" name="title" id="title" onChange={ handleChange } value={ defaultForm.title } />
        <textarea name="summary" onChange={ handleChange } value={ defaultForm.summary } />
        <textarea name="content" onChange={ handleChange } value={ defaultForm.content } />

        <section className="marked">
            <h2>Output</h2>
            <div>
                <h1>{defaultForm.title}</h1>
                <p>{defaultForm.summary}</p>
                <Markdown>
                    {defaultForm.content}
                </Markdown>
            </div>
        </section>
        <input type="submit" />
        <button type="button" onClick={ resetForm }>Reset</button>
    </form>
}

export default PostsForm;