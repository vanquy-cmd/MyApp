import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { AuthProvider } from './components/AuthContext';
import Home from './components/Home'; // Component chính của bạn
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const configureGoogleSignIn = async () => {
      try {
        await GoogleSignin.configure({
          webClientId: process.env.GOOGLE_WEB_CLIENT_ID, // Sử dụng biến môi trường
        });
      } catch (error) {
        console.error('Google Sign-In configuration failed', error);
      } finally {
        setLoading(false);
      }
    };

    configureGoogleSignIn();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <View style={{ flex: 1 }}>
          <Home /> 
        </View>
      </AuthProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;