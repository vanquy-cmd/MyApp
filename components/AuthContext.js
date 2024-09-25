import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../src/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        setError('Failed to fetch user.');
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
          setError('Failed to save user.');
        }
      } else {
        try {
          await AsyncStorage.removeItem('user');
        } catch (error) {
          setError('Failed to remove user.');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {loading ? <LoadingSpinner /> : children}
    </AuthContext.Provider>
  );
};

const LoadingSpinner = () => (
  <div>Loading...</div>
);

export const useAuth = () => useContext(AuthContext);