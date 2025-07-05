import Markdown from 'marked-react';
import { useNavigate } from 'react-router-dom';

function Post({ item }) {

    const navigate = useNavigate();

    const openSingle = () => {
        navigate(`/post/${encodeURIComponent(item.id)}`);
    }

    return <div className="cursor-pointer border flex-grow-1 w=full md:w-[33%]" onClick={ openSingle }>
        <h2>{item.title}</h2>
        <p>{item.summary}</p>
        <p>{item.time_created}</p>
    </div>
}

export default Post;