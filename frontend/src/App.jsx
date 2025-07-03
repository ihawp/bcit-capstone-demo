import { BrowserRouter, NavLink } from 'react-router-dom';
import Routing from './Routing';
import PostsProvider from './providers/PostsProvider';

function App() {
  return <BrowserRouter>

  <PostsProvider>

    <header>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/posts'>Posts</NavLink>
    </header>

    <Routing />

    <footer>
      <p>&copy; Team 4 (Atomic Diner) 2025.</p>
    </footer>
  
  </PostsProvider>
  
  </BrowserRouter>
}

export default App;