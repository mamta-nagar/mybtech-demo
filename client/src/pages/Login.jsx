import { useState } from 'react';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isSignup, setSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login } = useAuth(); const nav = useNavigate();
  const submit = async () => {
    const url = isSignup ? '/auth/signup' : '/auth/login';
    const { data } = await api.post(url, form); login(data); nav('/');
  };
  return <div className='card'><h3>{isSignup ? 'Signup' : 'Login'}</h3>
    {isSignup && <input placeholder='name' onChange={e => setForm({ ...form, name: e.target.value })} />}
    <input placeholder='email' onChange={e => setForm({ ...form, email: e.target.value })} />
    <input placeholder='password' type='password' onChange={e => setForm({ ...form, password: e.target.value })} />
    <button onClick={submit}>Submit</button><button onClick={() => setSignup(!isSignup)}>Switch</button></div>;
}
