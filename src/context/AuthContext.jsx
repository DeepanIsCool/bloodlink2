import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null); // 'donor' or 'bloodbank'

  // Simulate loading user from localStorage on app initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('bloodlink_user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setCurrentUser(userData.user);
      setUserType(userData.type);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (user, type) => {
    // In a real app, this would make an API call to authenticate
    setCurrentUser(user);
    setUserType(type);
    localStorage.setItem('bloodlink_user', JSON.stringify({ user, type }));
    return true;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    localStorage.removeItem('bloodlink_user');
  };

  // Register function
  const register = (user, type) => {
    // In a real app, this would make an API call to register
    setCurrentUser(user);
    setUserType(type);
    localStorage.setItem('bloodlink_user', JSON.stringify({ user, type }));
    return true;
  };

  const value = {
    currentUser,
    userType,
    login,
    logout,
    register,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};