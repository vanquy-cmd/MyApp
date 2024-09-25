import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';
import Signup from './Signup'; // Giả sử có component Signup
import Login from './Login'; // Giả sử có component Login
import Logout from './Logout'; // Giả sử có component Logout

const Home = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.welcomeText}>Welcome {user.email}</Text>
          <Logout />
        </>
      ) : (
        <>
          <Text style={styles.promptText}>Đăng nhập hoặc Đăng ký</Text>
          <Login />
          <Signup />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  promptText: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default Home;