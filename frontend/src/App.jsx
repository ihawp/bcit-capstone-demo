import { BrowserRouter, NavLink, Link } from 'react-router-dom';
import Routing from './Routing';
import PostsProvider from './providers/PostsProvider';

function App() {
  return <BrowserRouter>

  <PostsProvider>

    <header className='p-2 h-20'>
      <nav aria-label="Header Navigation" className='flex flex-row gap-4'>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/posts'>Posts</NavLink>
      </nav>
    </header>

    <Routing />

    <footer className='p-2 h-50 flex flex-row justify-between items-center'>
      <p>&copy; Team 4 (Atomic Diner) 2025.</p>
      <nav aria-label="Footer Navigation" className="flex flex-row gap-4">
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts</Link>
      </nav>
    </footer>
  
  </PostsProvider>
  
  </BrowserRouter>
}

export default App;