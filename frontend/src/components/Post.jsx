import Markdown from 'marked-react';

function Post({ item }) {

    const openSingle = () => {
        
    }

    return <div className="marked" onClick={ openSingle }>
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
        <Markdown>{item.content}</Markdown>
        <p>{item.time_created}</p>
    </div>
}

export default Post;