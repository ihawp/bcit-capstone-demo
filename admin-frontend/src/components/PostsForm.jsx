import { useState } from 'react';
import makeFetch from "../utils/makeFetch";


function PostsForm({ isUpdate, currentItem, defaultForm }) {

    const [formData, setFormData] = useState(defaultForm);

    const handleChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const resetForm = () => {
        setFormData(defaultForm);
    }

    const submitForm = async (event) => {

        event.preventDefault();

        let url = `http://localhost:3000/api/v1/posts/`;

        if (isUpdate) {
            event.isUpdateBool = currentItem;
        }

        const response = await makeFetch(`${url}${isUpdate ? encodeURIComponent(event.isUpdateBool) : ''}`, {
            method: isUpdate ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'same-origin',
        });

        console.log(response);

    }

    return <form onSubmit={ submitForm } className="bg-red-500 flex flex-col gap-2">
        <input type="text" name="title" id="title" onChange={ handleChange } value={ formData.title } />
        <textarea name="summary" onChange={ handleChange } value={ formData.summary } />
        <textarea name="content" onChange={ handleChange } value={ formData.content } />
        <input type="submit" />
        <button type="button" onClick={ resetForm }>Reset</button>
    </form>
}

export default PostsForm;