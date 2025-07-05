import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Posts from './pages/Posts';
import Post from './pages/Post';

function Routing() {
    return <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/posts' element={ <Posts /> } />
        <Route path="/post/:id" element={ <Post /> } />
    </Routes>
}

export default Routing;