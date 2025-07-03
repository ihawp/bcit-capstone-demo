import makeFetch from "../utils/makeFetch";


function PostsForm({ isUpdate }) {

    const submitForm = async (event) => {
        console.log(event.currentTarget);

        const response = await makeFetch('http://localhost/', {
            method: isUpdate ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        });

    }

    return <form onSubmit={ submitForm }>
        <input type="text" name="title" />
        <textarea name="summary" />
        <textarea name="content" />
        <input type="submit" />
    </form>
}

export default PostsForm;