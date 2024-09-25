import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const navigation = useNavigation();

  React.useEffect(() => {
    if (!user) {
      navigation.navigate('Login'); // Đảm bảo 'Login' là tên màn hình bạn đã định nghĩa
    }
  }, [user, navigation]);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Đang chuyển hướng đến trang đăng nhập...</Text>
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ProtectedRoute;