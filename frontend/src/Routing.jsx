import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Posts from './pages/Posts';

function Routing() {
    return <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/posts' element={ <Posts /> } />
    </Routes>
}

export default Routing;