import { useState } from 'react';
import makeFetch from "../utils/makeFetch";


function PostsForm({ isUpdate, currentItem, defaultForm, setDefaultForm }) {

    const handleChange = (event) => {
        setDefaultForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    const resetForm = () => {
        setDefaultForm(defaultForm);
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

        console.log(response);

    }

    return <form onSubmit={ submitForm } className="bg-red-500 flex flex-col gap-2">
        <input type="text" name="title" id="title" onChange={ handleChange } value={ defaultForm.title } />
        <textarea name="summary" onChange={ handleChange } value={ defaultForm.summary } />
        <textarea name="content" onChange={ handleChange } value={ defaultForm.content } />
        <input type="submit" />
        <button type="button" onClick={ resetForm }>Reset</button>
    </form>
}

export default PostsForm;