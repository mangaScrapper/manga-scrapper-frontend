'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://162.55.58.227:3000';

// Axios instance oluşturma
const authApi = axios.create({
  baseURL: `${BASE_URL}/api/auth`,
});

authApi.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const router = useRouter();

  // Sayfa yüklendiğinde token kontrolü yap
  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        setHasToken(!!token);
        if (token) {
          try {
            // Token varsa kullanıcı bilgilerini al
            const response = await authApi.get('/me');
            setUser(response.data.data.user);
          } catch (error) {
            // Token geçersizse temizle
            localStorage.removeItem('token');
            setHasToken(false);
          }
        }
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await authApi.post('/login', { username, password });
      console.log('Login response:', response);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', response.data.data.token);
        setHasToken(true);
      }
      console.log('Login response user:', response.data.data.user);
      setUser(response.data.data.user);
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { 
        success: false, 
        error: error.response?.data?.message || error.message 
      };
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setUser(null);
    setHasToken(false);
    router.push('/login');
  };

  const isAuthenticated = !!user || hasToken;


  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
