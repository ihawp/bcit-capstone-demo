function PostsForm() {

    const submitForm = (event) => {
        console.log(event.currentTarget);

        

    }

    return <form onSubmit={ submitForm }>
    </form>
}

export default PostsForm;