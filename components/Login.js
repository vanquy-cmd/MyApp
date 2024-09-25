import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../src/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import GoogleAuth from './GoogleAuth'; // Đường dẫn đến component GoogleAuth

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    if (!email || !password) {
      setError('Vui lòng nhập email và mật khẩu');
      setLoading(false);
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Đăng nhập thành công!');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        accessible
        accessibilityLabel="Email"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Mật khẩu"
        secureTextEntry
        accessible
        accessibilityLabel="Mật khẩu"
      />
      <Button title={loading ? "Đang đăng nhập..." : "Đăng nhập"} onPress={handleLogin} disabled={loading} />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.spinner} />}
      <View style={styles.googleAuthContainer}>
        <GoogleAuth /> 
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  spinner: {
    marginTop: 10,
  },
  googleAuthContainer: {
    marginTop: 20,
  },
});

export default Login;