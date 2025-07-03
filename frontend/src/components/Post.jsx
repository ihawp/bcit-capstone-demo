import Markdown from 'marked-react';

function Post({ item }) {

    return <div className="marked">
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
        <Markdown>{item.content}</Markdown>
        <p>{item.time_created}</p>
    </div>
}

export default Post;