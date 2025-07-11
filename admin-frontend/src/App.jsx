import { BrowserRouter } from 'react-router-dom';
import PostsProvider from './providers/PostsProvider';
import Router from './Router';

function App() {
    return <BrowserRouter basename='/admin'>

    <PostsProvider>

        <main>
            <Router />
        </main>

    </PostsProvider>

    </BrowserRouter>
}

export default App;