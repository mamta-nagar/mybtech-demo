import { Link, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage';
import AdminPage from './pages/AdminPage';

const Private = ({ children }) => useAuth().user ? children : <Navigate to='/login' />;

export default function App() {
  const { user, logout } = useAuth();
  return <div className='app'>
    <nav><h2>CAPF Mock</h2><div>
      <Link to='/'>Dashboard</Link> <Link to='/test'>Take Test</Link> <Link to='/admin'>Admin</Link>
      {user ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}
    </div></nav>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/' element={<Private><Dashboard /></Private>} />
      <Route path='/test' element={<Private><TestPage /></Private>} />
      <Route path='/admin' element={<Private><AdminPage /></Private>} />
    </Routes>
  </div>;
}
