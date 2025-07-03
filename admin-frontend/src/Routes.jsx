import { Routes, Route } from 'react-router-dom';

import { Posts } from './pages/Posts';

function Routes() {

    return <Routes>
        <Route path="/" element={ <Posts /> } />
    </Routes>

}

export default Routes;