import { createContext, useContext, useState } from 'react';
const Ctx = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const login = (payload) => { localStorage.setItem('token', payload.token); localStorage.setItem('user', JSON.stringify(payload.user)); setUser(payload.user); };
  const logout = () => { localStorage.clear(); setUser(null); };
  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>;
};
export const useAuth = () => useContext(Ctx);
