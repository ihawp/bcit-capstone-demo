import Markdown from 'marked-react';
import { useNavigate } from 'react-router-dom';

function Post({ item }) {

    const navigate = useNavigate();

    const openSingle = () => {
        navigate(`/post/${encodeURIComponent(item.id)}`);
    }

    return <div className="marked" onClick={ openSingle }>
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
        <Markdown>{item.content}</Markdown>
        <p>{item.time_created}</p>
    </div>
}

export default Post;